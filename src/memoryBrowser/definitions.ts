interface BaseSymbol {
  name: string;
  length?: number;
  hidden?: boolean;
}

interface SimpleSymbol extends BaseSymbol {
  type?: "byte" | "word" | "int";
  default?: number;
}

interface StructSymbol extends BaseSymbol {
  type?: "struct";
  fields?: ShortSymbol[];
}

type ShortSymbol = SimpleSymbol | StructSymbol | string;
type ShortDefinitions = {
  [key in keyof Definitions]: Array<ShortSymbol>;
};

/**
 * A DIV symbol is an object describing a function, a variable or a proces.
 * The following fields describe the symbol:
 *
 *  * type    - is the type of the cell: "byte" (1 byte), "word" (2 bytes),
 *              "int" (4 bytes; default if omitted) and "struct".
 *  * name    - is the name of the symbol.
 *  * length  - times to repeat this symbol (1 if omitted).
 *  * hidden  - if true, the symbol is not visible in the memory browser.
 *  * fields  - if the type is "struct", this is the list of symbols of the
 *              struct.
 *  * default - default value for the cell (0 if omitted).
 *
 * The `DivSymbol` type requires all the fields to be present, but there is
 * a relaxed version (`ShortSymbol`) of it where only the name is required.
 * Another valid alternative is to specify a string with the "name" of the
 * symbol.
 */
type DivSymbol =
  | Required<SimpleSymbol>
  | (Required<Omit<StructSymbol, "fields">> & { fields: DivSymbol[] });

interface Definitions {
  wellKnownGlobals: Array<DivSymbol>;
  wellKnownLocals: Array<DivSymbol>;
}

/**
 * Compendium of all the well known DIV symbols, common to all DIV programs.
 * It becomes the corner stone of the `SymbolTable`, from which the memory
 * map is derived.
 *
 * Based on docs, sources, and experimental tests:
 * https://github.com/DIVGAMES/DIV-Games-Studio/blob/0c006cca548f9d6dc66d174d4f05d167148c7e78/dll/div.h
 *
 * Experimental tests are based on measuring offsets between pairs of variables
 * or struct fields. It seems there are "hidden" variables.
 *
 * IMPORTANT NOTE:
 * Present values are chosen to preserve experimental offsets. When multiple
 * values preserve the offsets, I chose the one closest to what is documented.
 */
const MEMORY_DEFINITIONS: Definitions = _normalizeDefinitions({
  wellKnownGlobals: [
    {
      type: "struct",
      name: "mouse",
      fields: [
        { name: "x", default: 160 },
        { name: "y", default: 100 },
        { name: "z", default: -512 },
        "file",
        "graph",
        "angle",
        { name: "size", default: 100 },
        "flags",
        "region",
        "left",
        "middle",
        "right",
        "cursor",
        { name: "speed", default: 2 },
      ],
    },
    {
      type: "struct",
      name: "scroll",
      fields: [
        { name: "z", default: 512 },
        "camera",
        { name: "ratio", default: 200 },
        "speed",
        { name: "region1", default: -1 },
        { name: "region2", default: -1 },
        "x0",
        "y0",
        "x1",
        "y1",
      ],
      length: 10,
    },
    {
      type: "struct",
      name: "m7",
      fields: [
        { name: "z", default: 256 },
        "camera",
        { name: "height", default: 32 },
        { name: "distance", default: 64 },
        "horizon",
        { name: "focus", default: 256 },
        "color",
      ],
      length: 10,
    },
    {
      type: "struct",
      name: "joy",
      fields: [
        "button1",
        "button2",
        "button3",
        "button4",
        "left",
        "right",
        "up",
        "down",
      ],
    },
    {
      type: "struct",
      name: "setup",
      fields: [
        "card",
        "port",
        "irq",
        "dma",
        "dma2",
        "master",
        "sound_fx",
        "cd_audio",
        "mixer",
        "rate",
        "bits",
      ],
    },
    {
      type: "struct",
      name: "net",
      fields: [
        "device",
        "com",
        "speed",
        "number",
        "init",
        "mode",
        "server",
        "max_players",
        "num_players",
      ],
    },
    {
      type: "struct",
      name: "m8",
      fields: [{ name: "z", default: 256 }, "camera", "height", "angle"],
      length: 10,
    },
    {
      type: "struct",
      name: "dirinfo",
      fields: ["files", { type: "int", length: 1025, name: "name" }],
    },
    {
      type: "struct",
      name: "fileinfo",
      fields: [
        // No idea why these *_fix are here:
        // https://github.com/DIVGAMES/DIV-Games-Studio/blob/0c006cca548f9d6dc66d174d4f05d167148c7e78/dll/div.h#L187
        { type: "int", name: "fullpath_fix", hidden: true },
        { type: "byte", length: 256, name: "fullpath" },
        "drive",
        { type: "int", name: "length_fix", hidden: true },
        { type: "byte", length: 256, name: "dir" },
        { type: "int", name: "name_fix", hidden: true },
        { type: "byte", length: 12, name: "name" },
        { type: "int", name: "ext_fix", hidden: true },
        { type: "byte", length: 8, name: "ext" },
        "size",
        "day",
        "month",
        "year",
        "hour",
        "min",
        "sec",
        "attrib",
      ],
    },
    {
      type: "struct",
      name: "video_modes",
      fields: ["wide", "height", "mode"],
      length: 32,
    },
    {
      name: "timer",
      length: 10,
    },
    { name: "text_z", default: -256 },
    "fading",
    "shift_status",
    "ascii",
    "scan_code",
    { name: "joy_filter", default: 10 },
    { name: "joy_status", default: 1 },
    { name: "restore_type", default: 1 },
    { name: "dump_type", default: 1 },
    { name: "max_process_time", default: 500 },
    "fps",
    "argc",
    {
      name: "argv",
      length: 10,
    },
    {
      name: "channel",
      length: 32,
    },
    "vsync",
    { name: "draw_z", default: -255 },
    { name: "num_video_modes", default: 14 },
    { name: "unit_size", default: 4 },
  ],

  wellKnownLocals: [
    {
      type: "struct",
      name: "reserved",
      fields: [
        "process_id",
        "id_scan",
        "process_type",
        "type_scan",
        { name: "status", default: 2 },
        "parameters",
        "param_offset",
        "program_index",
        "stack_pointer",
        "is_executed",
        "is_painted",
        { name: "m8_object", default: -1 },
        "old_ctype",
        "frame_percent",
        "box_x0",
        "box_y0",
        { name: "box_x1", default: -1 },
        "box_y1",
        "f_count",
        "caller_id",
      ],
    },
    "father",
    "son",
    "smallbro",
    "bigbro",
    "priority",
    "ctype",
    "x",
    "y",
    "z",
    "graph",
    "flags",
    { name: "size", default: 100 },
    "angle",
    "region",
    "file",
    "xgraph",
    "cnumber",
    "height",
    "resolution",
    "radius",
    { name: "m8_wall", default: -1 },
    { name: "m8_sector", default: -1 },
    { name: "m8_nextsector", default: -1 },
    { name: "m8_step", default: 32 },
  ],
});

function _normalizeDefinitions(definitions: ShortDefinitions): Definitions {
  return {
    wellKnownGlobals: definitions.wellKnownGlobals.map(normalize),
    wellKnownLocals: definitions.wellKnownLocals.map(normalize),
  };
}

function normalize(symbol: ShortSymbol): DivSymbol {
  const symbolObject = typeof symbol === "string" ? { name: symbol } : symbol;
  const normalized =
    symbolObject.type === "struct"
      ? {
          type: "struct" as const,
          name: symbolObject.name,
          length: symbolObject.length ?? 1,
          hidden: symbolObject.hidden ?? false,
          fields: symbolObject.fields.map(normalize),
        }
      : {
          type: symbolObject.type ?? ("int" as const),
          name: symbolObject.name,
          length: symbolObject.length ?? 1,
          hidden: symbolObject.hidden ?? false,
          default: symbolObject.default ?? 0,
        };
  return normalized;
}

export { MEMORY_DEFINITIONS, Definitions, ShortSymbol, DivSymbol, normalize };
