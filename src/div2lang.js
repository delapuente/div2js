

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[9,23,60,61,69,72,73,81,83,97,98,100,104,105,107,108,109,113,114,119,120,123,124,125,128,129,130,131,132,133,136,137,138,139,140,141,142,143,144,145],$V4=[18,20,21,38],$V5=[1,18],$V6=[2,12],$V7=[20,21,38],$V8=[15,18,20,21,38],$V9=[1,23],$Va=[2,16],$Vb=[21,38],$Vc=[20,21,27,28,29,30,31,32,33,34,35,38],$Vd=[1,31],$Ve=[1,44],$Vf=[1,46],$Vg=[1,47],$Vh=[1,48],$Vi=[1,79],$Vj=[1,49],$Vk=[1,50],$Vl=[1,51],$Vm=[1,52],$Vn=[1,53],$Vo=[1,54],$Vp=[1,55],$Vq=[1,56],$Vr=[1,57],$Vs=[1,77],$Vt=[1,78],$Vu=[1,68],$Vv=[1,69],$Vw=[1,70],$Vx=[1,71],$Vy=[1,72],$Vz=[1,73],$VA=[1,74],$VB=[1,83],$VC=[1,84],$VD=[1,85],$VE=[1,86],$VF=[1,87],$VG=[1,88],$VH=[1,89],$VI=[1,90],$VJ=[1,91],$VK=[5,15,37,40,43,56,57,58,59,60,62,67,70,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$VL=[1,95],$VM=[15,40,43,56,57,58,59,60,62,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$VN=[1,111],$VO=[9,61,69,72,73,81,83,98],$VP=[9,61,69,72,73,81,83,98,107,108,109,113,114,119,120,123,124,125,128,129,130,131,132,133],$VQ=[2,115],$VR=[9,61,69,72,73,81,83,98,128,129,130,131,132,133],$VS=[1,139],$VT=[1,140],$VU=[1,141],$VV=[9,23,61,69,72,73,81,83,98,107,108,109,113,114,119,120,123,124,125,128,129,130,131,132,133,136,137,138,139,140,141,142,143,144,145],$VW=[9,61,69,72,73,81,83,98,123,124,125,128,129,130,131,132,133],$VX=[1,149],$VY=[1,150],$VZ=[9,15,23,60,61,69,72,73,81,83,94,95,97,98,100,104,105,106,107,108,109,110,113,114,119,120,123,124,125,128,129,130,131,132,133,136,137,138,139,140,141,142,143,144,145],$V_=[15,60,94,95,104,105,106,107,108,109,110],$V$=[9,61,69,72,73,81,83,98,119,120,123,124,125,128,129,130,131,132,133],$V01=[1,152],$V11=[1,153],$V21=[9,61,69,72,73,81,83,98,108,109,119,120,123,124,125,128,129,130,131,132,133],$V31=[1,156],$V41=[1,157],$V51=[1,158],$V61=[9,15,40,43,56,57,58,59,60,62,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$V71=[9,15,60,94,95,104,105,106,107,108,109,110],$V81=[1,199],$V91=[9,61,72],$Va1=[1,215],$Vb1=[1,213],$Vc1=[15,60,61,94,95,104,105,106,107,108,109,110],$Vd1=[15,40,56,57,58,59,60,62,74,75,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$Ve1=[40,67,70],$Vf1=[69,72];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"BEGIN":38,"group_of_sentences":39,"END":40,"sentence_list":41,"group_of_sentences_for_if_else":42,"ELSE":43,"sentence":44,"if_sentence":45,"switch_sentence":46,"while_sentence":47,"repeat_sentence":48,"opt_end":49,"loop_sentence":50,"from_sentence":51,"for_sentence":52,"return_sentence":53,"frame_sentence":54,"clone_sentence":55,"DEBUG":56,"BREAK":57,"CONTINUE":58,"IF":59,"(":60,")":61,"SWITCH":62,"group_of_cases":63,"default":64,"case_list":65,"case":66,"CASE":67,"list_of_ranges":68,":":69,"DEFAULT":70,"range":71,",":72,"..":73,"WHILE":74,"REPEAT":75,"group_of_sentences_for_repeat":76,"until_condition":77,"UNTIL":78,"LOOP":79,"FROM":80,"TO":81,"step":82,"STEP":83,"FOR":84,"for_params":85,"initialization":86,"condition":87,"increment":88,"expression_list":89,"RETURN":90,"FRAME":91,"CLONE":92,"primary_expression":93,"STRING_LITERAL":94,"NUMBER":95,"postfix_expression":96,"[":97,"]":98,"call_expression":99,".":100,"update_operator":101,"unary_expression":102,"unary_operator":103,"++":104,"--":105,"&":106,"*":107,"+":108,"-":109,"!":110,"multiplicative_expression":111,"multiplicative_operator":112,"/":113,"%":114,"additive_expression":115,"additive_operator":116,"shift_expression":117,"shift_operator":118,"<<":119,">>":120,"logical_expression":121,"logical_operator":122,"||":123,"&&":124,"^":125,"relational_expression":126,"relational_operator":127,"<":128,">":129,"<=":130,">=":131,"==":132,"!=":133,"assignment_expression":134,"assignment_operator":135,"*=":136,"/=":137,"%=":138,"+=":139,"-=":140,"<<=":141,">>=":142,"&=":143,"^=":144,"|=":145,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"BEGIN",40:"END",43:"ELSE",56:"DEBUG",57:"BREAK",58:"CONTINUE",59:"IF",60:"(",61:")",62:"SWITCH",67:"CASE",69:":",70:"DEFAULT",72:",",73:"..",74:"WHILE",75:"REPEAT",78:"UNTIL",79:"LOOP",80:"FROM",81:"TO",83:"STEP",84:"FOR",90:"RETURN",91:"FRAME",92:"CLONE",94:"STRING_LITERAL",95:"NUMBER",97:"[",98:"]",100:".",104:"++",105:"--",106:"&",107:"*",108:"+",109:"-",110:"!",113:"/",114:"%",119:"<<",120:">>",123:"||",124:"&&",125:"^",128:"<",129:">",130:"<=",131:">=",132:"==",133:"!=",136:"*=",137:"/=",138:"%=",139:"+=",140:"-=",141:"<<=",142:">>=",143:"&=",144:"^=",145:"|="},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,0],[17,0],[17,2],[22,4],[19,0],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,5],[14,2],[39,1],[39,2],[42,1],[42,2],[44,1],[44,1],[44,1],[44,2],[44,1],[44,1],[44,1],[44,2],[44,2],[44,1],[44,2],[44,2],[44,2],[44,2],[49,0],[49,1],[45,5],[45,6],[46,5],[41,1],[41,2],[63,1],[63,2],[63,2],[63,3],[65,1],[65,2],[66,4],[64,3],[68,1],[68,3],[71,1],[71,3],[47,5],[48,2],[76,1],[76,2],[77,4],[50,2],[51,9],[82,0],[82,2],[52,3],[85,4],[86,1],[86,2],[87,1],[87,2],[88,1],[88,2],[53,1],[53,4],[54,1],[54,4],[55,2],[89,1],[89,3],[93,1],[93,1],[93,1],[93,3],[96,1],[96,4],[96,1],[96,3],[96,2],[99,3],[99,4],[102,1],[102,2],[102,2],[101,1],[101,1],[103,1],[103,1],[103,1],[103,1],[103,1],[111,1],[111,3],[112,1],[112,1],[112,1],[115,1],[115,3],[116,1],[116,1],[117,1],[117,3],[118,1],[118,1],[121,1],[121,3],[122,1],[122,1],[122,1],[126,1],[126,3],[127,1],[127,1],[127,1],[127,1],[127,1],[127,1],[134,1],[134,3],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[24,1]],
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
case 13: case 16: case 33: case 35: case 58: case 81: case 83: case 85:
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
case 29: case 56: case 62: case 66: case 92:
 this.$ = [$$[$0]]; 
break;
case 30: case 57: case 63:
 $$[$0-1].push($$[$0]); 
break;
case 31:

      this.$ = {
        type: "Process",
        name: $$[$0-3],
        privates: $$[$0-1],
        body: $$[$0]
      };
    
break;
case 32:

      this.$ = {
        type: "ProcessBody",
        sentences: $$[$0]
      };
    
break;
case 34: case 36: case 74: case 97:
 this.$ = $$[$0-1]; 
break;
case 47:
 this.$ = { type: "DebugSentence" }; 
break;
case 48:

      this.$ = {
        type: "ExpressionSentence",
        expression: $$[$0-1]
      };
    
break;
case 49:
 this.$ = { type: "BreakSentence" }; 
break;
case 50:
 this.$ = { type: "ContinueSentence" }; 
break;
case 53:

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
case 54:

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
case 55:

      this.$ = {
        type: "SwitchSentence",
        discriminant: $$[$0-2],
        cases: $$[$0]
      };
    
break;
case 59:
 this.$ = [$$[$0-1]]; 
break;
case 61:
 $$[$0-2].push($$[$0-1]); 
break;
case 64:

      this.$ = {
        type: "SwitchCase",
        tests: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 65:

      this.$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 67: case 93:
 $$[$0-2].push($$[$0]); 
break;
case 69:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 70:

      this.$ = {
        type: "WhileSentence",
        test: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 71:

      this.$ = {
        type: "RepeatSentence",
        test: $$[$0].test,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0].body
        }
      };
    
break;
case 72:

      this.$ = {
        test: $$[$0],
        body: []
      };
    
break;
case 73:

      this.$ = {
        test: $$[$0],
        body: $$[$0-1]
      };
    
break;
case 75:

      this.$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    
break;
case 76:

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
case 77:
 this.$ = null 
break;
case 78:
 this.$ = $$[$0]; 
break;
case 79:

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
case 80:

      this.$ = {
        inits: $$[$0-2],
        tests: $$[$0-1],
        updates: $$[$0]
      };
    
break;
case 87:

      this.$ = {
        type: "ReturnSentence",
        argument: null
      };
    
break;
case 88:

      this.$ = {
        type: "ReturnSentence",
        argument: $$[$0-1]
      };
    
break;
case 89:

      this.$ = {
        type: "FrameSentence",
        argument: null
      };
    
break;
case 90:

      this.$ = {
        type: "FrameSentence",
        argument: $$[$0-1]
      };
    
break;
case 91:

      this.$ = {
        type: "CloneSentence",
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 95:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
case 96:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 99:

      this.$ = {
        type: "MemberExpression",
        computed: true,
        structure: $$[$0-3],
        property: $$[$0-1]
      };
    
break;
case 101:

      this.$ = {
        type: "MemberExpression",
        computed: false,
        structure: $$[$0-2],
        property: $$[$0]
      };
    
break;
case 102:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: false
      };
    
break;
case 103:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-2],
        arguments: []
      };
    
break;
case 104:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-3],
        arguments: $$[$0-1]
      };
    
break;
case 106:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0-1],
        argument: $$[$0],
        prefix: true
      };
    
break;
case 107:

      this.$ = {
        type: "UnaryExpression",
        operator: $$[$0-1],
        argument: $$[$0]
      };
    
break;
case 116: case 121: case 125:

      this.$ = {
        type: "BinaryExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 129:

      this.$ = {
        type: "LogicalExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 134:

      this.$ = {
        type: "RelationalExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 142:

      this.$ = {
        type: "AssignmentExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,29]),{8:12,15:$V1},{9:[1,13]},o($V3,[2,4]),{1:[2,2]},o($V2,[2,30]),{9:[1,14]},o($V4,[2,6],{10:15,16:[1,16]}),{13:17,21:$V5,38:$V6},o($V7,[2,8],{11:19,18:[1,20]}),o($V8,[2,13],{17:21}),{14:22,38:$V9},o([27,28,29,30,31,32,33,34,35,38],$Va,{19:24}),o($Vb,[2,10],{12:25,20:[1,26]}),o($Vc,$Va,{19:27}),o($V4,[2,5],{22:28,8:29,15:$V1}),o($V2,[2,31]),{8:76,15:$V1,24:45,39:30,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{25:81,26:82,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ,38:[2,11]},{13:92,21:$V5,38:$V6},o([21,27,28,29,30,31,32,33,34,35,38],$Va,{19:93}),o($V7,[2,7],{25:81,26:82,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ}),o($V8,[2,14]),{23:[1,94]},o($V2,[2,32]),o($VK,[2,33]),{8:76,15:$V1,24:45,40:$VL,44:96,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VM,[2,56]),o($VM,[2,37]),o($VM,[2,38]),o($VM,[2,39]),o($VM,[2,51],{49:97,9:[1,98]}),o($VM,[2,41]),o($VM,[2,42]),o($VM,[2,43]),{9:[1,99]},{9:[1,100]},o($VM,[2,46]),{9:[1,101]},{9:[1,102]},{9:[1,103]},{9:[1,104]},{60:[1,105]},{60:[1,106]},{60:[1,107]},{8:76,15:$V1,24:45,41:110,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,76:108,77:109,78:$VN,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:45,39:112,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:113,15:$V1},{60:[1,115],85:114},{9:[2,87],60:[1,116]},{9:[2,89],60:[1,117]},{8:76,15:$V1,24:45,39:118,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VO,[2,154]),o($VO,[2,141],{127:119,128:[1,120],129:[1,121],130:[1,122],131:[1,123],132:[1,124],133:[1,125]}),o($VP,$VQ,{135:126,23:[1,127],136:[1,128],137:[1,129],138:[1,130],139:[1,131],140:[1,132],141:[1,133],142:[1,134],143:[1,135],144:[1,136],145:[1,137]}),o($VR,[2,133],{122:138,123:$VS,124:$VT,125:$VU}),o($VV,[2,105],{101:144,60:[1,145],97:[1,142],100:[1,143],104:$Vu,105:$Vv}),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:146,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:147,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},o($VW,[2,128],{118:148,119:$VX,120:$VY}),o($V3,[2,98]),o($V3,[2,100]),o($VZ,[2,108]),o($VZ,[2,109]),o($V_,[2,110]),o($V_,[2,111]),o($V_,[2,112]),o($V_,[2,113]),o($V_,[2,114]),o($V$,[2,124],{116:151,108:$V01,109:$V11}),o($V3,[2,94]),o($V3,[2,95]),o($V3,[2,96]),{8:76,15:$V1,24:154,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($V21,[2,120],{112:155,107:$V31,113:$V41,114:$V51}),o($Vc,[2,17]),{8:159,15:$V1},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{14:160,38:$V9},o($Vb,[2,9],{25:81,26:82,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ}),{8:76,15:$V1,24:161,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VK,[2,34]),o($VM,[2,57]),o($VM,[2,40]),o($VM,[2,52]),o($VM,[2,44]),o($VM,[2,45]),o($VM,[2,47]),o($VM,[2,48]),o($VM,[2,49]),o($VM,[2,50]),{8:76,15:$V1,24:162,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:163,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:164,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($V61,[2,71]),o($V61,[2,72]),{8:76,15:$V1,24:45,44:96,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,77:165,78:$VN,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{60:[1,166]},o($VM,[2,75]),{23:[1,167]},{8:76,15:$V1,24:45,39:168,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,9:[1,170],15:$V1,24:172,60:$Vi,86:169,89:171,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:173,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:174,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VM,[2,91]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:175},o($V_,[2,135]),o($V_,[2,136]),o($V_,[2,137]),o($V_,[2,138]),o($V_,[2,139]),o($V_,[2,140]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:177},o($V_,[2,143]),o($V_,[2,144]),o($V_,[2,145]),o($V_,[2,146]),o($V_,[2,147]),o($V_,[2,148]),o($V_,[2,149]),o($V_,[2,150]),o($V_,[2,151]),o($V_,[2,152]),o($V_,[2,153]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:178},o($V_,[2,130]),o($V_,[2,131]),o($V_,[2,132]),{8:76,15:$V1,24:179,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:180,15:$V1},o($V3,[2,102]),{8:76,15:$V1,24:172,60:$Vi,61:[1,181],89:182,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VV,[2,106]),o($VV,[2,107]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:183},o($V_,[2,126]),o($V_,[2,127]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:184},o($V_,[2,122]),o($V_,[2,123]),{61:[1,185]},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:186,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},o($V_,[2,117]),o($V_,[2,118]),o($V_,[2,119]),{9:[1,188],23:[1,187]},o($V2,[2,3]),{9:[1,189]},{61:[1,190]},{61:[1,191]},{61:[1,192]},o($V61,[2,73]),{8:76,15:$V1,24:193,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:194,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VM,[2,79]),{8:76,9:[1,196],15:$V1,24:172,60:$Vi,87:195,89:197,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($V71,[2,81]),{9:[1,198],72:$V81},o($V91,[2,92]),{61:[1,200]},{61:[1,201]},o($VR,[2,134],{122:138,123:$VS,124:$VT,125:$VU}),o($VP,$VQ),o($VO,[2,142]),o($VW,[2,129],{118:148,119:$VX,120:$VY}),{98:[1,202]},o($V3,[2,101]),o($V3,[2,103]),{61:[1,203],72:$V81},o($V$,[2,125],{116:151,108:$V01,109:$V11}),o($V21,[2,121],{112:155,107:$V31,113:$V41,114:$V51}),o($V3,[2,97]),o($VP,[2,116]),{8:76,15:$V1,24:204,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($Vc,[2,19]),o($V8,[2,15]),{8:76,15:$V1,24:45,39:205,40:$Vd,41:207,42:206,43:[1,208],44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{40:[1,210],63:209,64:211,65:212,66:214,67:$Va1,70:$Vb1},{8:76,15:$V1,24:45,39:216,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{61:[1,217]},{81:[1,218]},{8:76,15:$V1,24:172,60:$Vi,61:[1,220],88:219,89:221,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($Vc1,[2,83]),{9:[1,222],72:$V81},o($V71,[2,82]),{8:76,15:$V1,24:223,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{9:[2,88]},{9:[2,90]},o($V3,[2,99]),o($V3,[2,104]),{9:[1,224]},o($VM,[2,53]),{8:76,15:$V1,24:45,39:225,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:45,40:$VL,43:[1,226],44:96,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($Vd1,[2,35]),o($VM,[2,55]),o($VM,[2,58]),{40:[1,227]},{40:[1,228],64:229,66:230,67:$Va1,70:$Vb1},{69:[1,231]},o($Ve1,[2,62]),{8:76,15:$V1,24:234,60:$Vi,68:232,71:233,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($VM,[2,70]),o($V61,[2,74]),{8:76,15:$V1,24:235,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($Vd1,[2,80]),o($Vd1,[2,85]),{61:[1,236],72:$V81},o($Vc1,[2,84]),o($V91,[2,93]),o($Vc,[2,18]),o($VM,[2,54]),o($Vd1,[2,36]),o($VM,[2,59]),o($VM,[2,60]),{40:[1,237]},o($Ve1,[2,63]),{8:76,15:$V1,24:45,39:238,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{69:[1,239],72:[1,240]},o($Vf1,[2,66]),o($Vf1,[2,68],{73:[1,241]}),{9:[2,77],82:242,83:[1,243]},o($Vd1,[2,86]),o($VM,[2,61]),{40:[2,65]},{8:76,15:$V1,24:45,39:244,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:234,60:$Vi,71:245,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{8:76,15:$V1,24:246,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{9:[1,247]},{8:76,15:$V1,24:248,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},o($Ve1,[2,64]),o($Vf1,[2,67]),o($Vf1,[2,69]),{8:76,15:$V1,24:45,39:249,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:80,115:75,117:65,121:61,126:59,134:58},{9:[2,78]},o($VM,[2,76])],
defaultActions: {4:[2,1],10:[2,2],83:[2,20],84:[2,21],85:[2,22],86:[2,23],87:[2,24],88:[2,25],89:[2,26],90:[2,27],91:[2,28],200:[2,88],201:[2,90],238:[2,65],248:[2,78]},
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
case 1: return 59; 
break;
case 2: return 43; 
break;
case 3: return 62; 
break;
case 4: return 67; 
break;
case 5: return 70; 
break;
case 6: return 79; 
break;
case 7: return 80; 
break;
case 8: return 75; 
break;
case 9: return 78; 
break;
case 10: return 74; 
break;
case 11: return 80; 
break;
case 12: return 81; 
break;
case 13: return 83; 
break;
case 14: return 84; 
break;
case 15: return 57; 
break;
case 16: return 58; 
break;
case 17: return 90; 
break;
case 18: return 91; 
break;
case 19: return 92; 
break;
case 20: return 56; 
break;
case 21: return 91; 
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
case 29: return 38; 
break;
case 30: return 40; 
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
case 41: return 60; 
break;
case 42: return 61; 
break;
case 43: return 97; 
break;
case 44: return 98; 
break;
case 45: return 72; 
break;
case 46: return 23; 
break;
case 47: return 139; 
break;
case 48: return 140; 
break;
case 49: return 137; 
break;
case 50: return 136; 
break;
case 51: return 138; 
break;
case 52: return 143; 
break;
case 53: return 145; 
break;
case 54: return 144; 
break;
case 55: return 141; 
break;
case 56: return 142; 
break;
case 57: return 120; 
break;
case 58: return 119; 
break;
case 59: return 132; 
break;
case 60: return 131; 
break;
case 61: return '=>'; 
break;
case 62: return 130; 
break;
case 63: return 133; 
break;
case 64: return 133; 
break;
case 65: return 128; 
break;
case 66: return 129; 
break;
case 67: return 124; 
break;
case 68: return 124; 
break;
case 69: return 106; 
break;
case 70: return 123; 
break;
case 71: return 123; 
break;
case 72: return 123; 
break;
case 73: return '^^'; 
break;
case 74: return '^^'; 
break;
case 75: return 125; 
break;
case 76: return 104; 
break;
case 77: return 105; 
break;
case 78: return 108; 
break;
case 79: return 109; 
break;
case 80: return 23; 
break;
case 81: return 113; 
break;
case 82: return 107; 
break;
case 83: return 114; 
break;
case 84: return 114; 
break;
case 85: return 110; 
break;
case 86: return 110; 
break;
case 87: return 106; 
break;
case 88: return 107; 
break;
case 89: return 73; 
break;
case 90: return 69; 
break;
case 91: return 100; 
break;
case 92: return 94; 
break;
case 93: return 95; 
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