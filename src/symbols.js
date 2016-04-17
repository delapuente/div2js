
define([], function () {
  'use strict';

  return {
    isGlobal: function (name) {
      return this.wellKnownGlobals.indexOf(name.toLowerCase()) >= 0;
    },

    isLocal: function (name) {
      name = name.toLowerCase();
      // TODO: Actually, id is a special token, non an identifier. Let's fix
      // that in the parser and translation module.
      // TODO: Second clause is wrong as local definitions can be not simply
      // strings.
      return name === 'id' || this.wellKnownLocals.indexOf(name) >= 0;
    },

    wellKnownGlobals: [
      'text_z'
    ],

    wellKnownLocals: [
      {
        'type': 'struct',
        'name': 'reserved',
        'fields': [
          'process_id',
          'id_scan',
          'process_type',
          'type_scan',
          'status',
          'parameters',
          'param_offset',
          'program_index',
          'stack_pointer',
          'is_executed',
          'is_painted',
          'm8_object',
          'old_ctype',
          'frame_percent',
          'box_x0',
          'box_y0',
          'box_x1',
          'box_y1',
          'f_count',
          'caller_id'
        ]
      },
      'father',
      'son',
      'smallbro',
      'bigbro',
      'priority',
      'ctype',
      'x',
      'y',
      'z',
      'graph',
      'flags',
      'size',
      'angle',
      'region',
      'file',
      'xgraph',
      'cnumber',
      'height',
      'resolution',
      'radius',
      'm8_wall',
      'm8_sector',
      'm8_nextsector',
      'm8_step'
    ]
  };
});
