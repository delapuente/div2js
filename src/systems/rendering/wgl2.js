define([], function () {
  'use strict';

  function WebGL2RenderSystem(canvas) {
    this._canvas = canvas;
  }

  WebGL2RenderSystem.prototype = {
    constructor: WebGL2RenderSystem,

    initialize: function () {
      this._gl = this._canvas.getContext('webgl2');
      this._videoMode = {};
    },

    run: function (memory, environment) {
      var videoMode = environment.video;
      this._updateVideoMode(videoMode);
    },

    _updateVideoMode: function (videoMode) {
      var width = this._videoMode.width;
      var height = this._videoMode.height;
      if (width === videoMode.width && height === videoMode.height) {
        return;
      }
      this._videoMode.width = videoMode.width;
      this._videoMode.height = videoMode.height;
      this._setAdaptor(videoMode);
      this._setCamera(videoMode);
    },

    _setAdaptor: function (videoMode) {
      this._canvas.width = videoMode.width;
      this._canvas.height = videoMode.height;
    },

    _setCamera: function (videoMode) {
      var gl = this._gl;
      
    }
  };

  return WebGL2RenderSystem;
});