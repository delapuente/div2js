

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[9,23,38,40,41,71,74,82,84,98,99,101,105,106,108,109,110,114,115,120,121,124,125,126,129,130,131,132,133,134,137,138,139,140,141,142,143,144,145,146],$V4=[18,20,21,42],$V5=[40,41],$V6=[20,21,42],$V7=[15,18,20,21,42],$V8=[21,42],$V9=[20,21,27,28,29,30,31,32,33,34,35,42],$Va=[2,16],$Vb=[1,32],$Vc=[2,12],$Vd=[1,36],$Ve=[1,37],$Vf=[1,38],$Vg=[1,39],$Vh=[1,40],$Vi=[1,41],$Vj=[1,42],$Vk=[1,43],$Vl=[1,44],$Vm=[1,48],$Vn=[1,73],$Vo=[1,71],$Vp=[1,72],$Vq=[1,62],$Vr=[1,63],$Vs=[1,64],$Vt=[1,65],$Vu=[1,66],$Vv=[1,67],$Vw=[1,68],$Vx=[1,77],$Vy=[1,90],$Vz=[1,92],$VA=[1,93],$VB=[1,94],$VC=[1,95],$VD=[1,96],$VE=[1,97],$VF=[1,98],$VG=[1,99],$VH=[1,100],$VI=[1,101],$VJ=[1,102],$VK=[1,103],$VL=[9,40,41,71,74,82,84,99],$VM=[9,40,41,71,74,82,84,99,108,109,110,114,115,120,121,124,125,126,129,130,131,132,133,134],$VN=[2,118],$VO=[9,40,41,71,74,82,84,99,129,130,131,132,133,134],$VP=[1,127],$VQ=[1,128],$VR=[1,129],$VS=[9,23,40,41,71,74,82,84,99,108,109,110,114,115,120,121,124,125,126,129,130,131,132,133,134,137,138,139,140,141,142,143,144,145,146],$VT=[9,40,41,71,74,82,84,99,124,125,126,129,130,131,132,133,134],$VU=[1,137],$VV=[1,138],$VW=[9,15,23,38,40,41,71,74,82,84,95,96,98,99,101,105,106,107,108,109,110,111,114,115,120,121,124,125,126,129,130,131,132,133,134,137,138,139,140,141,142,143,144,145,146],$VX=[15,38,95,96,105,106,107,108,109,110,111],$VY=[9,40,41,71,74,82,84,99,120,121,124,125,126,129,130,131,132,133,134],$VZ=[1,140],$V_=[1,141],$V$=[9,40,41,71,74,82,84,99,109,110,120,121,124,125,126,129,130,131,132,133,134],$V01=[1,144],$V11=[1,145],$V21=[1,146],$V31=[5,15,37,38,44,47,60,61,62,63,64,69,72,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$V41=[1,147],$V51=[15,38,44,47,60,61,62,63,64,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$V61=[1,163],$V71=[9,15,38,44,47,60,61,62,63,64,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$V81=[1,200],$V91=[9,40,41],$Va1=[9,15,38,95,96,105,106,107,108,109,110,111],$Vb1=[1,223],$Vc1=[1,221],$Vd1=[15,38,40,95,96,105,106,107,108,109,110,111],$Ve1=[15,38,44,60,61,62,63,64,75,76,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$Vf1=[44,69,72],$Vg1=[41,71];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"(":38,"param_list":39,")":40,",":41,"BEGIN":42,"group_of_sentences":43,"END":44,"sentence_list":45,"group_of_sentences_for_if_else":46,"ELSE":47,"sentence":48,"if_sentence":49,"switch_sentence":50,"while_sentence":51,"repeat_sentence":52,"opt_end":53,"loop_sentence":54,"from_sentence":55,"for_sentence":56,"return_sentence":57,"frame_sentence":58,"clone_sentence":59,"DEBUG":60,"BREAK":61,"CONTINUE":62,"IF":63,"SWITCH":64,"group_of_cases":65,"default":66,"case_list":67,"case":68,"CASE":69,"list_of_ranges":70,":":71,"DEFAULT":72,"range":73,"..":74,"WHILE":75,"REPEAT":76,"group_of_sentences_for_repeat":77,"until_condition":78,"UNTIL":79,"LOOP":80,"FROM":81,"TO":82,"step":83,"STEP":84,"FOR":85,"for_params":86,"initialization":87,"condition":88,"increment":89,"expression_list":90,"RETURN":91,"FRAME":92,"CLONE":93,"primary_expression":94,"STRING_LITERAL":95,"NUMBER":96,"postfix_expression":97,"[":98,"]":99,"call_expression":100,".":101,"update_operator":102,"unary_expression":103,"unary_operator":104,"++":105,"--":106,"&":107,"*":108,"+":109,"-":110,"!":111,"multiplicative_expression":112,"multiplicative_operator":113,"/":114,"%":115,"additive_expression":116,"additive_operator":117,"shift_expression":118,"shift_operator":119,"<<":120,">>":121,"logical_expression":122,"logical_operator":123,"||":124,"&&":125,"^":126,"relational_expression":127,"relational_operator":128,"<":129,">":130,"<=":131,">=":132,"==":133,"!=":134,"assignment_expression":135,"assignment_operator":136,"*=":137,"/=":138,"%=":139,"+=":140,"-=":141,"<<=":142,">>=":143,"&=":144,"^=":145,"|=":146,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"(",40:")",41:",",42:"BEGIN",44:"END",47:"ELSE",60:"DEBUG",61:"BREAK",62:"CONTINUE",63:"IF",64:"SWITCH",69:"CASE",71:":",72:"DEFAULT",74:"..",75:"WHILE",76:"REPEAT",79:"UNTIL",80:"LOOP",81:"FROM",82:"TO",84:"STEP",85:"FOR",91:"RETURN",92:"FRAME",93:"CLONE",95:"STRING_LITERAL",96:"NUMBER",98:"[",99:"]",101:".",105:"++",106:"--",107:"&",108:"*",109:"+",110:"-",111:"!",114:"/",115:"%",120:"<<",121:">>",124:"||",125:"&&",126:"^",129:"<",130:">",131:"<=",132:">=",133:"==",134:"!=",137:"*=",138:"/=",139:"%=",140:"+=",141:"-=",142:"<<=",143:">>=",144:"&=",145:"^=",146:"|="},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,0],[17,0],[17,2],[22,4],[19,0],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,8],[39,0],[39,1],[39,3],[14,2],[43,1],[43,2],[46,1],[46,2],[48,1],[48,1],[48,1],[48,2],[48,1],[48,1],[48,1],[48,2],[48,2],[48,1],[48,2],[48,2],[48,2],[48,2],[53,0],[53,1],[49,5],[49,6],[50,5],[45,1],[45,2],[65,1],[65,2],[65,2],[65,3],[67,1],[67,2],[68,4],[66,3],[70,1],[70,3],[73,1],[73,3],[51,5],[52,2],[77,1],[77,2],[78,4],[54,2],[55,9],[83,0],[83,2],[56,3],[86,4],[87,1],[87,2],[88,1],[88,2],[89,1],[89,2],[57,1],[57,4],[58,1],[58,4],[59,2],[90,1],[90,3],[94,1],[94,1],[94,1],[94,3],[97,1],[97,4],[97,1],[97,3],[97,2],[100,3],[100,4],[103,1],[103,2],[103,2],[102,1],[102,1],[104,1],[104,1],[104,1],[104,1],[104,1],[112,1],[112,3],[113,1],[113,1],[113,1],[116,1],[116,3],[117,1],[117,1],[118,1],[118,3],[119,1],[119,1],[122,1],[122,3],[123,1],[123,1],[123,1],[127,1],[127,3],[128,1],[128,1],[128,1],[128,1],[128,1],[128,1],[135,1],[135,3],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[136,1],[24,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

      this.$ = {
        type: "Unit",
        program: $$[$0-1],
        processes: []
      };
      return this.$;
    
break;
case 2:

      this.$ = {
        type: "Unit",
        program: $$[$0-2],
        processes: $$[$0-1]
      };
      return this.$;
    
break;
case 3:

      this.$ = {
        type: "Program",
        name: $$[$0-6],
        consts: $$[$0-4],
        globals: $$[$0-3],
        locals: $$[$0-2],
        privates: $$[$0-1],
        body: $$[$0]
      };
    
break;
case 4:
 this.$ = { type: "Identifier", name: $$[$0] }; 
break;
case 5:

      this.$ = {
        type: "ConstDeclarations",
        declarations: $$[$0]
      };
    
break;
case 6: case 8: case 10: case 12:
 this.$ = null; 
break;
case 7:

      this.$ = {
        type: "GlobalDeclarations",
        declarations: $$[$0]
      };
    
break;
case 9:

      this.$ = {
        type: "LocalDeclarations",
        declarations: $$[$0]
      };
    
break;
case 11:

      this.$ = {
        type: "PrivateDeclarations",
        declarations: $$[$0]
      };
    
break;
case 13: case 16: case 32: case 36: case 38: case 61: case 84: case 86: case 88:
 this.$ = []; 
break;
case 14: case 17:
 this.$ = $$[$0-1].concat([$$[$0]]); 
break;
case 15:

      // TODO: I think consts are actually MACROS
      this.$ = {
        type: "ConstDeclarator",
        constType: "int",
        constName: $$[$0-3],
        constInit: $$[$0-1]
      };
    
break;
case 18:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-4],
        varName: $$[$0-3],
        varInit: $$[$0-1]
      };
    
break;
case 19:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-2],
        varName: $$[$0-1],
        varInit: null
      };
    
break;
case 20:
 this.$ = "int_pointer"; 
break;
case 21:
 this.$ = "int"; 
break;
case 22:
 this.$ = "word_pointer"; 
break;
case 23:
 this.$ = "word"; 
break;
case 24:
 this.$ = "byte_pointer"; 
break;
case 25:
 this.$ = "byte"; 
break;
case 26:
 this.$ = "string_pointer"; 
break;
case 27:
 this.$ = "string"; 
break;
case 28:
 this.$ = "struct_pointer"; 
break;
case 29: case 59: case 65: case 69: case 95:
 this.$ = [$$[$0]]; 
break;
case 30: case 60: case 66:
 $$[$0-1].push($$[$0]); 
break;
case 31:

      this.$ = {
        type: "Process",
        name: $$[$0-6],
        params: $$[$0-4],
        privates: $$[$0-1],
        body: $$[$0]
      };
    
break;
case 33:

      this.$ = [$$[$0]];
    
break;
case 34:

      $$[$0-2].push($$[$0]);
    
break;
case 35:

      this.$ = {
        type: "ProcessBody",
        sentences: $$[$0]
      };
    
break;
case 37: case 39: case 77: case 100:
 this.$ = $$[$0-1]; 
break;
case 50:
 this.$ = { type: "DebugSentence" }; 
break;
case 51:

      this.$ = {
        type: "ExpressionSentence",
        expression: $$[$0-1]
      };
    
break;
case 52:
 this.$ = { type: "BreakSentence" }; 
break;
case 53:
 this.$ = { type: "ContinueSentence" }; 
break;
case 56:

      this.$ = {
        type: "IfSentence",
        test: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        },
        alternate: null
      };
    
break;
case 57:

      this.$ = {
        type: "IfSentence",
        test: $$[$0-3],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0-1]
        },
        alternate: {
          type: "SentenceBlock",
          sentences: $$[$0]
        },
      };
    
break;
case 58:

      this.$ = {
        type: "SwitchSentence",
        discriminant: $$[$0-2],
        cases: $$[$0]
      };
    
break;
case 62:
 this.$ = [$$[$0-1]]; 
break;
case 64:
 $$[$0-2].push($$[$0-1]); 
break;
case 67:

      this.$ = {
        type: "SwitchCase",
        tests: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 68:

      this.$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 70: case 96:
 $$[$0-2].push($$[$0]); 
break;
case 72:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 73:

      this.$ = {
        type: "WhileSentence",
        test: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 74:

      this.$ = {
        type: "RepeatSentence",
        test: $$[$0].test,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0].body
        }
      };
    
break;
case 75:

      this.$ = {
        test: $$[$0],
        body: []
      };
    
break;
case 76:

      this.$ = {
        test: $$[$0],
        body: $$[$0-1]
      };
    
break;
case 78:

      this.$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    
break;
case 79:

      this.$ = {
        type: "FromSentence",
        identifier: $$[$0-7],
        init: $$[$0-5],
        limit: $$[$0-3],
        step: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 80:
 this.$ = null 
break;
case 81:
 this.$ = $$[$0]; 
break;
case 82:

      this.$ = {
        type: "ForSentence",
        inits: $$[$0-1].inits,
        tests: $$[$0-1].tests,
        updates: $$[$0-1].updates,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 83:

      this.$ = {
        inits: $$[$0-2],
        tests: $$[$0-1],
        updates: $$[$0]
      };
    
break;
case 90:

      this.$ = {
        type: "ReturnSentence",
        argument: null
      };
    
break;
case 91:

      this.$ = {
        type: "ReturnSentence",
        argument: $$[$0-1]
      };
    
break;
case 92:

      this.$ = {
        type: "FrameSentence",
        argument: null
      };
    
break;
case 93:

      this.$ = {
        type: "FrameSentence",
        argument: $$[$0-1]
      };
    
break;
case 94:

      this.$ = {
        type: "CloneSentence",
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 98:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
case 99:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 102:

      this.$ = {
        type: "MemberExpression",
        computed: true,
        structure: $$[$0-3],
        property: $$[$0-1]
      };
    
break;
case 104:

      this.$ = {
        type: "MemberExpression",
        computed: false,
        structure: $$[$0-2],
        property: $$[$0]
      };
    
break;
case 105:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: false
      };
    
break;
case 106:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-2],
        arguments: []
      };
    
break;
case 107:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-3],
        arguments: $$[$0-1]
      };
    
break;
case 109:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0-1],
        argument: $$[$0],
        prefix: true
      };
    
break;
case 110:

      this.$ = {
        type: "UnaryExpression",
        operator: $$[$0-1],
        argument: $$[$0]
      };
    
break;
case 119: case 124: case 128:

      this.$ = {
        type: "BinaryExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 132:

      this.$ = {
        type: "LogicalExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 137:

      this.$ = {
        type: "RelationalExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 145:

      this.$ = {
        type: "AssignmentExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,29]),{8:12,15:$V1},{9:[1,13]},o($V3,[2,4]),{1:[2,2]},o($V2,[2,30]),{38:[1,14]},o($V4,[2,6],{10:15,16:[1,16]}),o($V5,[2,32],{39:17,8:18,15:$V1}),o($V6,[2,8],{11:19,18:[1,20]}),o($V7,[2,13],{17:21}),{40:[1,22],41:[1,23]},o($V5,[2,33]),o($V8,[2,10],{12:24,20:[1,25]}),o($V9,$Va,{19:26}),o($V4,[2,5],{22:27,8:28,15:$V1}),{9:[1,29]},{8:30,15:$V1},{13:31,21:$Vb,42:$Vc},o([21,27,28,29,30,31,32,33,34,35,42],$Va,{19:33}),o($V6,[2,7],{25:34,26:35,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl}),o($V7,[2,14]),{23:[1,45]},{13:46,21:$Vb,42:$Vc},o($V5,[2,34]),{14:47,42:$Vm},o([27,28,29,30,31,32,33,34,35,42],$Va,{19:49}),o($V8,[2,9],{25:34,26:35,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl}),o($V9,[2,17]),{8:50,15:$V1},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{8:70,15:$V1,24:51,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{14:75,42:$Vm},o($V2,[2,3]),{8:70,15:$V1,24:91,38:$Vn,43:76,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{25:34,26:35,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl,42:[2,11]},{9:[1,105],23:[1,104]},{9:[1,106]},o($VL,[2,157]),o($VL,[2,144],{128:107,129:[1,108],130:[1,109],131:[1,110],132:[1,111],133:[1,112],134:[1,113]}),o($VM,$VN,{136:114,23:[1,115],137:[1,116],138:[1,117],139:[1,118],140:[1,119],141:[1,120],142:[1,121],143:[1,122],144:[1,123],145:[1,124],146:[1,125]}),o($VO,[2,136],{123:126,124:$VP,125:$VQ,126:$VR}),o($VS,[2,108],{102:132,38:[1,133],98:[1,130],101:[1,131],105:$Vq,106:$Vr}),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:134,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw},{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:135,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw},o($VT,[2,131],{119:136,120:$VU,121:$VV}),o($V3,[2,101]),o($V3,[2,103]),o($VW,[2,111]),o($VW,[2,112]),o($VX,[2,113]),o($VX,[2,114]),o($VX,[2,115]),o($VX,[2,116]),o($VX,[2,117]),o($VY,[2,127],{117:139,109:$VZ,110:$V_}),o($V3,[2,97]),o($V3,[2,98]),o($V3,[2,99]),{8:70,15:$V1,24:142,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V$,[2,123],{113:143,108:$V01,114:$V11,115:$V21}),o($V2,[2,31]),o($V2,[2,35]),o($V31,[2,36]),{8:70,15:$V1,24:91,38:$Vn,44:$V41,48:148,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V51,[2,59]),o($V51,[2,40]),o($V51,[2,41]),o($V51,[2,42]),o($V51,[2,54],{53:149,9:[1,150]}),o($V51,[2,44]),o($V51,[2,45]),o($V51,[2,46]),{9:[1,151]},{9:[1,152]},o($V51,[2,49]),{9:[1,153]},{9:[1,154]},{9:[1,155]},{9:[1,156]},{38:[1,157]},{38:[1,158]},{38:[1,159]},{8:70,15:$V1,24:91,38:$Vn,45:162,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,77:160,78:161,79:$V61,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:91,38:$Vn,43:164,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:165,15:$V1},{38:[1,167],86:166},{9:[2,90],38:[1,168]},{9:[2,92],38:[1,169]},{8:70,15:$V1,24:91,38:$Vn,43:170,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:171,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V9,[2,19]),o($V7,[2,15]),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:173,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:172},o($VX,[2,138]),o($VX,[2,139]),o($VX,[2,140]),o($VX,[2,141]),o($VX,[2,142]),o($VX,[2,143]),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:174},o($VX,[2,146]),o($VX,[2,147]),o($VX,[2,148]),o($VX,[2,149]),o($VX,[2,150]),o($VX,[2,151]),o($VX,[2,152]),o($VX,[2,153]),o($VX,[2,154]),o($VX,[2,155]),o($VX,[2,156]),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:173,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:175},o($VX,[2,133]),o($VX,[2,134]),o($VX,[2,135]),{8:70,15:$V1,24:176,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:177,15:$V1},o($V3,[2,105]),{8:70,15:$V1,24:180,38:$Vn,40:[1,178],90:179,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($VS,[2,109]),o($VS,[2,110]),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:173,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:181},o($VX,[2,129]),o($VX,[2,130]),{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:173,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:182},o($VX,[2,125]),o($VX,[2,126]),{40:[1,183]},{8:70,15:$V1,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:184,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw},o($VX,[2,120]),o($VX,[2,121]),o($VX,[2,122]),o($V31,[2,37]),o($V51,[2,60]),o($V51,[2,43]),o($V51,[2,55]),o($V51,[2,47]),o($V51,[2,48]),o($V51,[2,50]),o($V51,[2,51]),o($V51,[2,52]),o($V51,[2,53]),{8:70,15:$V1,24:185,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:186,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:187,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V71,[2,74]),o($V71,[2,75]),{8:70,15:$V1,24:91,38:$Vn,48:148,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,78:188,79:$V61,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{38:[1,189]},o($V51,[2,78]),{23:[1,190]},{8:70,15:$V1,24:91,38:$Vn,43:191,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,9:[1,193],15:$V1,24:180,38:$Vn,87:192,90:194,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:195,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:196,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V51,[2,94]),{9:[1,197]},o($VO,[2,137],{123:126,124:$VP,125:$VQ,126:$VR}),o($VM,$VN),o($VL,[2,145]),o($VT,[2,132],{119:136,120:$VU,121:$VV}),{99:[1,198]},o($V3,[2,104]),o($V3,[2,106]),{40:[1,199],41:$V81},o($V91,[2,95]),o($VY,[2,128],{117:139,109:$VZ,110:$V_}),o($V$,[2,124],{113:143,108:$V01,114:$V11,115:$V21}),o($V3,[2,100]),o($VM,[2,119]),{40:[1,201]},{40:[1,202]},{40:[1,203]},o($V71,[2,76]),{8:70,15:$V1,24:204,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:205,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V51,[2,82]),{8:70,9:[1,207],15:$V1,24:180,38:$Vn,88:206,90:208,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($Va1,[2,84]),{9:[1,209],41:$V81},{40:[1,210]},{40:[1,211]},o($V9,[2,18]),o($V3,[2,102]),o($V3,[2,107]),{8:70,15:$V1,24:212,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:91,38:$Vn,43:213,44:$Vx,45:215,46:214,47:[1,216],48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{44:[1,218],65:217,66:219,67:220,68:222,69:$Vb1,72:$Vc1},{8:70,15:$V1,24:91,38:$Vn,43:224,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{40:[1,225]},{82:[1,226]},{8:70,15:$V1,24:180,38:$Vn,40:[1,228],89:227,90:229,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($Vd1,[2,86]),{9:[1,230],41:$V81},o($Va1,[2,85]),{9:[2,91]},{9:[2,93]},o($V91,[2,96]),o($V51,[2,56]),{8:70,15:$V1,24:91,38:$Vn,43:231,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:91,38:$Vn,44:$V41,47:[1,232],48:148,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($Ve1,[2,38]),o($V51,[2,58]),o($V51,[2,61]),{44:[1,233]},{44:[1,234],66:235,68:236,69:$Vb1,72:$Vc1},{71:[1,237]},o($Vf1,[2,65]),{8:70,15:$V1,24:240,38:$Vn,70:238,73:239,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($V51,[2,73]),o($V71,[2,77]),{8:70,15:$V1,24:241,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($Ve1,[2,83]),o($Ve1,[2,88]),{40:[1,242],41:$V81},o($Vd1,[2,87]),o($V51,[2,57]),o($Ve1,[2,39]),o($V51,[2,62]),o($V51,[2,63]),{44:[1,243]},o($Vf1,[2,66]),{8:70,15:$V1,24:91,38:$Vn,43:244,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{41:[1,246],71:[1,245]},o($Vg1,[2,69]),o($Vg1,[2,71],{74:[1,247]}),{9:[2,80],83:248,84:[1,249]},o($Ve1,[2,89]),o($V51,[2,64]),{44:[2,68]},{8:70,15:$V1,24:91,38:$Vn,43:250,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:240,38:$Vn,73:251,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{8:70,15:$V1,24:252,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{9:[1,253]},{8:70,15:$V1,24:254,38:$Vn,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},o($Vf1,[2,67]),o($Vg1,[2,70]),o($Vg1,[2,72]),{8:70,15:$V1,24:91,38:$Vn,43:255,44:$Vx,45:78,48:79,49:80,50:81,51:82,52:83,54:84,55:85,56:86,57:87,58:88,59:89,60:$Vy,61:$Vz,62:$VA,63:$VB,64:$VC,75:$VD,76:$VE,80:$VF,81:$VG,85:$VH,91:$VI,92:$VJ,93:$VK,94:60,95:$Vo,96:$Vp,97:56,100:61,102:57,103:54,104:58,105:$Vq,106:$Vr,107:$Vs,108:$Vt,109:$Vu,110:$Vv,111:$Vw,112:74,116:69,118:59,122:55,127:53,135:52},{9:[2,81]},o($V51,[2,79])],
defaultActions: {4:[2,1],10:[2,2],36:[2,20],37:[2,21],38:[2,22],39:[2,23],40:[2,24],41:[2,25],42:[2,26],43:[2,27],44:[2,28],210:[2,91],211:[2,93],244:[2,68],254:[2,81]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* ignore */ 
break;
case 1: return 63; 
break;
case 2: return 47; 
break;
case 3: return 64; 
break;
case 4: return 69; 
break;
case 5: return 72; 
break;
case 6: return 80; 
break;
case 7: return 81; 
break;
case 8: return 76; 
break;
case 9: return 79; 
break;
case 10: return 75; 
break;
case 11: return 81; 
break;
case 12: return 82; 
break;
case 13: return 84; 
break;
case 14: return 85; 
break;
case 15: return 61; 
break;
case 16: return 62; 
break;
case 17: return 91; 
break;
case 18: return 92; 
break;
case 19: return 93; 
break;
case 20: return 60; 
break;
case 21: return 92; 
break;
case 22: return 7; 
break;
case 23: return 16; 
break;
case 24: return 18; 
break;
case 25: return 20; 
break;
case 26: return 21; 
break;
case 27: return 37; 
break;
case 28: return 'FUNCTION'; 
break;
case 29: return 42; 
break;
case 30: return 44; 
break;
case 31: return 27; 
break;
case 32: return 28; 
break;
case 33: return 29; 
break;
case 34: return 30; 
break;
case 35: return 31; 
break;
case 36: return 32; 
break;
case 37: return 33; 
break;
case 38: return 34; 
break;
case 39: return 35; 
break;
case 40: return 9; 
break;
case 41: return 38; 
break;
case 42: return 40; 
break;
case 43: return 98; 
break;
case 44: return 99; 
break;
case 45: return 41; 
break;
case 46: return 23; 
break;
case 47: return 140; 
break;
case 48: return 141; 
break;
case 49: return 138; 
break;
case 50: return 137; 
break;
case 51: return 139; 
break;
case 52: return 144; 
break;
case 53: return 146; 
break;
case 54: return 145; 
break;
case 55: return 142; 
break;
case 56: return 143; 
break;
case 57: return 121; 
break;
case 58: return 120; 
break;
case 59: return 133; 
break;
case 60: return 132; 
break;
case 61: return '=>'; 
break;
case 62: return 131; 
break;
case 63: return 134; 
break;
case 64: return 134; 
break;
case 65: return 129; 
break;
case 66: return 130; 
break;
case 67: return 125; 
break;
case 68: return 125; 
break;
case 69: return 107; 
break;
case 70: return 124; 
break;
case 71: return 124; 
break;
case 72: return 124; 
break;
case 73: return '^^'; 
break;
case 74: return '^^'; 
break;
case 75: return 126; 
break;
case 76: return 105; 
break;
case 77: return 106; 
break;
case 78: return 109; 
break;
case 79: return 110; 
break;
case 80: return 23; 
break;
case 81: return 114; 
break;
case 82: return 108; 
break;
case 83: return 115; 
break;
case 84: return 115; 
break;
case 85: return 111; 
break;
case 86: return 111; 
break;
case 87: return 107; 
break;
case 88: return 108; 
break;
case 89: return 74; 
break;
case 90: return 71; 
break;
case 91: return 101; 
break;
case 92: return 95; 
break;
case 93: return 96; 
break;
case 94: return 15; 
break;
case 95: return 5; 
break;
}
},
rules: [/^(?:\s+)/i,/^(?:IF\b)/i,/^(?:ELSE\b)/i,/^(?:SWITCH\b)/i,/^(?:CASE\b)/i,/^(?:DEFAULT\b)/i,/^(?:LOOP\b)/i,/^(?:FROM\b)/i,/^(?:REPEAT\b)/i,/^(?:UNTIL\b)/i,/^(?:WHILE\b)/i,/^(?:FROM\b)/i,/^(?:TO\b)/i,/^(?:STEP\b)/i,/^(?:FOR\b)/i,/^(?:BREAK\b)/i,/^(?:CONTINUE\b)/i,/^(?:RETURN\b)/i,/^(?:FRAME\b)/i,/^(?:CLONE\b)/i,/^(?:DEBUG\b)/i,/^(?:FRAME\b)/i,/^(?:PROGRAM\b)/i,/^(?:CONST\b)/i,/^(?:GLOBAL\b)/i,/^(?:LOCAL\b)/i,/^(?:PRIVATE\b)/i,/^(?:PROCESS\b)/i,/^(?:FUNCTION\b)/i,/^(?:BEGIN\b)/i,/^(?:END\b)/i,/^(?:INT POINTER\b)/i,/^(?:INT\b)/i,/^(?:WORD POINTER\b)/i,/^(?:WORD\b)/i,/^(?:BYTE POINTER\b)/i,/^(?:BYTE\b)/i,/^(?:STRING POINTER\b)/i,/^(?:STRING\b)/i,/^(?:STRUCT POINTER\b)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?::=)/i,/^(?:\+=)/i,/^(?:-=)/i,/^(?:\/=)/i,/^(?:\*=)/i,/^(?:%=)/i,/^(?:&=)/i,/^(?:\|=)/i,/^(?:\^=)/i,/^(?:<<=)/i,/^(?:>>=)/i,/^(?:>>)/i,/^(?:<<)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:=>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:AND\b)/i,/^(?:&&)/i,/^(?:&)/i,/^(?:OR\b)/i,/^(?:\|\|)/i,/^(?:\|)/i,/^(?:XOR\b)/i,/^(?:\^\^)/i,/^(?:\^)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:=)/i,/^(?:\/)/i,/^(?:\*)/i,/^(?:MOD\b)/i,/^(?:%)/i,/^(?:NOT\b)/i,/^(?:!)/i,/^(?:OFFSET\b)/i,/^(?:POINTER\b)/i,/^(?:\.\.)/i,/^(?::)/i,/^(?:\.)/i,/^(?:("")|(".*?([^\\]")))/i,/^(?:[0-9]+)/i,/^(?:([a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_][0-9a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_]*))/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});