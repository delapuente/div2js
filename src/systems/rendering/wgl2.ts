const vsSource = `#version 300 es

in vec4 a_position;

out vec2 v_texcoord;

void main() {
  gl_Position = a_position;
  // Convert from origin at bottom left (-1, -1) to origin at top left (0, 0).
  v_texcoord = a_position.xy * vec2(0.5, -0.5) + 0.5;
}`;

const psSource = `#version 300 es

precision mediump float;

in vec2 v_texcoord;

out vec4 color;

uniform sampler2D u_framebuffer;
uniform sampler2D u_palette;

// DIV palettes have colors with intensities ranging from 0 to 63.
// We need to convert them to 0 to 255.
const float COLOR_INTENSITY_FACTOR = 255.0/63.0;

void main() {
  // Obtain the palette color index from the framebuffer.
  float index = texture(u_framebuffer, v_texcoord).a * 255.0;

  // Obtain the actual color from the palette.
  color =
    texture(u_palette, vec2((index + 0.5)/256.0, 0.5)) *
    COLOR_INTENSITY_FACTOR;
}`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function setPalette(palette, index, r, g, b) {
  palette[index * 3 + 0] = r;
  palette[index * 3 + 1] = g;
  palette[index * 3 + 2] = b;
}

function getDefaultFramebuffer(width, height) {
  const framebuffer = new Uint8Array(width * height);
  let currentColor = 0;
  for (let i = 0; i < width * height; i++) {
    framebuffer[i] = currentColor + 1;
    currentColor = (currentColor + 1) % 3;
  }
  return framebuffer;
}

function getDefaultPalette() {
  const palette = new Uint8Array(256 * 3);
  setPalette(palette, 0, 255, 255, 255);
  setPalette(palette, 1, 63, 0, 0);
  setPalette(palette, 2, 0, 63, 0);
  setPalette(palette, 3, 0, 0, 63);
  return palette;
}

function WebGL2RenderSystem (
  canvas,
  { defaultResolution } = { defaultResolution: { width: 320, height: 200 }}
) {
  this._gl = canvas.getContext('webgl2');
  this._defaultResolution = Object.assign({}, defaultResolution);
  this._video = {
    width: this._defaultResolution.width,
    height: this._defaultResolution.height,
    frameBuffer: null,
    palette: null
  };
}

WebGL2RenderSystem.prototype = {
  _frameBufferCorners: new Float32Array([
    1, 1,
    -1, 1,
    -1, -1,
    1, 1,
    -1, -1,
    1, -1,
  ]),

  _frameBufferPointCount: 6,

  constructor: WebGL2RenderSystem,

  initialize: function () {
    const { width, height } = this._defaultResolution
    this._updateVideoMode(width, height);
    this._initializeRender();
  },

  run: function (memory, environment) {
    this._sendPalette();
    this._sendFrameBuffer();
    this._gl.drawArrays(this._gl.TRIANGLES, 0, this._frameBufferPointCount);
    // XXX: Not relying on RAF requires a flush call to draw immediately.
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices#use_webgl.flush_when_not_using_requestanimationframe
    this._gl.flush();
  },

  _updateVideoMode: function (width, height) {
    const { _video: video } = this;
    video.width = width;
    video.height = height;
    video.frameBuffer = getDefaultFramebuffer(width, height);
    video.palette = getDefaultPalette();
    this._setAdaptor(width, height);
  },

  _setAdaptor: function (width, height) {
    const { _gl: gl } = this;
    gl.canvas.style.imageRendering = 'pixelated';
    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(0, 0, width, height);
  },

  _initializeRender: function () {
    // Create a WebGL context and compile shaders
    const { _gl: gl } = this;
    const vs = this._vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const ps = this._ps = createShader(gl, gl.FRAGMENT_SHADER, psSource);
    const program = this._program = createProgram(gl, vs, ps);
    gl.useProgram(this._program);
    // Put data in a GPU buffer
    this._buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._frameBufferCorners, gl.STATIC_DRAW);
    // Tell the GPU how to read the data
    this._location = gl.getAttribLocation(program, 'a_position');
    this._vao = gl.createVertexArray();
    gl.bindVertexArray(this._vao);
    gl.enableVertexAttribArray(this._location);
    gl.vertexAttribPointer(this._location, 2, gl.FLOAT, false, 0, 0);
    // Setup the framebuffer
    const framebufferLocation = gl.getUniformLocation(program, 'u_framebuffer');
    gl.uniform1i(framebufferLocation, 0);
    gl.activeTexture(gl.TEXTURE0);
    const frameBufferTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, frameBufferTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // Setup the palette
    const paletteLocation = gl.getUniformLocation(program, 'u_palette');
    gl.uniform1i(paletteLocation, 1);
    gl.activeTexture(gl.TEXTURE1);
    const paletteTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  },

  _sendFrameBuffer: function () {
    const { _gl: gl } = this;
    const { width, height } = this._video;
    gl.activeTexture(gl.TEXTURE0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, width, height, 0, gl.ALPHA,
                  gl.UNSIGNED_BYTE, this._video.frameBuffer);
  },

  _sendPalette: function () {
    const { _gl: gl } = this;
    gl.activeTexture(gl.TEXTURE1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 256, 1, 0, gl.RGB,
                  gl.UNSIGNED_BYTE, this._video.palette);
  }
};

export default WebGL2RenderSystem;
