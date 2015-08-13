

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[9,23,65,66,74,77,78,86,88,102,103,105,109,110,112,113,114,117,118,121,122,124,125,126,127,129,130,132,134,136,139,140,141,142,143,144,145,146,147,148],$V4=[18,20,21,39],$V5=[1,19],$V6=[20,21,39],$V7=[15,18,20,21,39],$V8=[1,25],$V9=[1,38],$Va=[1,40],$Vb=[1,70],$Vc=[1,41],$Vd=[1,42],$Ve=[1,43],$Vf=[1,44],$Vg=[1,45],$Vh=[1,46],$Vi=[1,47],$Vj=[1,48],$Vk=[1,49],$Vl=[1,68],$Vm=[1,69],$Vn=[1,59],$Vo=[1,60],$Vp=[1,61],$Vq=[1,62],$Vr=[1,63],$Vs=[1,64],$Vt=[1,65],$Vu=[21,39],$Vv=[20,21,27,28,29,30,31,32,33,34,35,39],$Vw=[2,16],$Vx=[5,15,37,41,46,59,64,65,67,72,75,79,80,83,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$Vy=[1,81],$Vz=[15,41,46,59,64,65,67,79,80,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$VA=[15,41,46,59,64,65,67,79,80,83,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$VB=[2,55],$VC=[1,84],$VD=[1,98],$VE=[1,99],$VF=[1,95],$VG=[1,101],$VH=[9,66,74,77,78,86,88,103],$VI=[9,66,74,77,78,86,88,103,112,113,114,117,118,121,122,124,125,126,127,129,130,132,134,136],$VJ=[2,121],$VK=[9,23,66,74,77,78,86,88,103,112,113,114,117,118,121,122,124,125,126,127,129,130,132,134,136,139,140,141,142,143,144,145,146,147,148],$VL=[9,66,74,77,78,86,88,103,136],$VM=[1,128],$VN=[9,15,23,65,66,74,77,78,86,88,99,100,102,103,105,109,110,111,112,113,114,115,117,118,121,122,124,125,126,127,129,130,132,134,136,139,140,141,142,143,144,145,146,147,148],$VO=[15,65,99,100,109,110,111,112,113,114,115],$VP=[9,66,74,77,78,86,88,103,134,136],$VQ=[1,129],$VR=[9,66,74,77,78,86,88,103,132,134,136],$VS=[1,132],$VT=[1,133],$VU=[9,66,74,77,78,86,88,103,129,130,132,134,136],$VV=[1,134],$VW=[1,135],$VX=[1,136],$VY=[1,137],$VZ=[9,66,74,77,78,86,88,103,124,125,126,127,129,130,132,134,136],$V_=[1,138],$V$=[1,139],$V01=[9,66,74,77,78,86,88,103,121,122,124,125,126,127,129,130,132,134,136],$V11=[1,140],$V21=[1,141],$V31=[9,66,74,77,78,86,88,103,113,114,121,122,124,125,126,127,129,130,132,134,136],$V41=[1,142],$V51=[1,143],$V61=[1,144],$V71=[1,150],$V81=[1,151],$V91=[1,152],$Va1=[1,153],$Vb1=[1,154],$Vc1=[1,155],$Vd1=[1,156],$Ve1=[1,157],$Vf1=[1,158],$Vg1=[9,15,41,46,59,64,65,67,79,80,83,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$Vh1=[15,41,59,64,65,67,79,80,83,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$Vi1=[9,15,65,99,100,109,110,111,112,113,114,115],$Vj1=[1,213],$Vk1=[9,66,77],$Vl1=[1,231],$Vm1=[1,229],$Vn1=[15,65,66,99,100,109,110,111,112,113,114,115],$Vo1=[15,41,59,64,65,67,79,80,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$Vp1=[41,72,75],$Vq1=[15,41,59,62,63,64,65,67,79,80,84,85,89,95,96,97,99,100,109,110,111,112,113,114,115],$Vr1=[74,77];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"private":38,"BEGIN":39,"group_of_sentences":40,"END":41,"sentence_list":42,"group_of_sentences_for_loops":43,"sentence_list_for_loops":44,"group_of_sentences_for_if_else":45,"ELSE":46,"sentence":47,"if_sentence":48,"switch_sentence":49,"while_sentence":50,"repeat_sentence":51,"opt_end":52,"loop_sentence":53,"from_sentence":54,"for_sentence":55,"return_sentence":56,"frame_sentence":57,"clone_sentence":58,"DEBUG":59,"assignment_expression":60,"sentence_for_loops":61,"BREAK":62,"CONTINUE":63,"IF":64,"(":65,")":66,"SWITCH":67,"group_of_cases":68,"default":69,"case_list":70,"case":71,"CASE":72,"list_of_ranges":73,":":74,"DEFAULT":75,"range":76,",":77,"..":78,"WHILE":79,"REPEAT":80,"group_of_sentences_for_repeat":81,"until_condition":82,"UNTIL":83,"LOOP":84,"FROM":85,"TO":86,"step":87,"STEP":88,"FOR":89,"for_params":90,"initialization":91,"condition":92,"increment":93,"expression_list":94,"RETURN":95,"FRAME":96,"CLONE":97,"primary_expression":98,"STRING_LITERAL":99,"NUMBER":100,"postfix_expression":101,"[":102,"]":103,"call_expression":104,".":105,"update_operator":106,"unary_expression":107,"unary_operator":108,"++":109,"--":110,"&":111,"*":112,"+":113,"-":114,"!":115,"multiplicative_expression":116,"/":117,"%":118,"additive_expression":119,"shift_expression":120,"<<":121,">>":122,"relational_expression":123,"<":124,">":125,"<=":126,">=":127,"equality_expression":128,"==":129,"!=":130,"and_expression":131,"&&":132,"exclusive_or_expression":133,"^":134,"inclusive_or_expression":135,"||":136,"conditional_expression":137,"assignment_operator":138,"*=":139,"/=":140,"%=":141,"+=":142,"-=":143,"<<=":144,">>=":145,"&=":146,"^=":147,"|=":148,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"private",39:"BEGIN",41:"END",46:"ELSE",59:"DEBUG",62:"BREAK",63:"CONTINUE",64:"IF",65:"(",66:")",67:"SWITCH",72:"CASE",74:":",75:"DEFAULT",77:",",78:"..",79:"WHILE",80:"REPEAT",83:"UNTIL",84:"LOOP",85:"FROM",86:"TO",88:"STEP",89:"FOR",95:"RETURN",96:"FRAME",97:"CLONE",99:"STRING_LITERAL",100:"NUMBER",102:"[",103:"]",105:".",109:"++",110:"--",111:"&",112:"*",113:"+",114:"-",115:"!",117:"/",118:"%",121:"<<",122:">>",124:"<",125:">",126:"<=",127:">=",129:"==",130:"!=",132:"&&",134:"^",136:"||",139:"*=",140:"/=",141:"%=",142:"+=",143:"-=",144:"<<=",145:">>=",146:"&=",147:"^=",148:"|="},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,0],[17,0],[17,2],[22,4],[19,0],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,5],[36,4],[14,2],[40,1],[40,2],[43,1],[43,2],[45,1],[45,2],[47,1],[47,1],[47,1],[47,2],[47,1],[47,1],[47,1],[47,2],[47,2],[47,1],[47,2],[47,2],[61,1],[61,2],[61,2],[52,0],[52,1],[48,5],[48,6],[49,5],[42,1],[42,2],[44,1],[44,2],[68,1],[68,2],[68,2],[68,3],[70,1],[70,2],[71,4],[69,3],[73,1],[73,3],[76,1],[76,3],[50,5],[51,2],[81,1],[81,2],[82,4],[53,2],[54,9],[87,0],[87,2],[55,3],[90,4],[91,1],[91,2],[92,1],[92,2],[93,1],[93,2],[56,1],[56,4],[57,1],[57,4],[58,2],[94,1],[94,3],[98,1],[98,1],[98,1],[98,3],[101,1],[101,4],[101,1],[101,3],[101,2],[104,3],[104,4],[107,1],[107,2],[107,2],[106,1],[106,1],[108,1],[108,1],[108,1],[108,1],[108,1],[116,1],[116,3],[116,3],[116,3],[119,1],[119,3],[119,3],[120,1],[120,3],[120,3],[123,1],[123,3],[123,3],[123,3],[123,3],[128,1],[128,3],[128,3],[131,1],[131,3],[133,1],[133,3],[135,1],[135,3],[137,1],[60,1],[60,3],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[138,1],[24,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
      this.$ = {
        type: "Unit",
        program: $$[$0-1],
        process: []
      };
      return this.$;
    
break;
case 2:

      this.$ = {
        type: "Unit",
        program: $$[$0-2],
        process: $$[$0-1]
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
case 13: case 16: case 34: case 36: case 38: case 64: case 87: case 89: case 91:
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
case 33:

      this.$ = {
        type: "SentenceBlock",
        sentences: $$[$0]
      };
    
break;
case 35: case 37: case 39: case 80: case 103:
 this.$ = $$[$0-1]; 
break;
case 57:

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
case 58:

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
case 59:

      this.$ = {
        type: "SwitchSentence",
        discriminant: $$[$0-2],
        cases: $$[$0]
      };
    
break;
case 60: case 62: case 68: case 72: case 98:
 this.$ = [$$[$0]]; 
break;
case 61: case 63:
 this.$ = $$[$0-1].push(sentence); 
break;
case 65:
 this.$ = [$$[$0-1]]; 
break;
case 67:
 $$[$0-2].push($$[$0-1]); 
break;
case 69:
 $$[$0-1].push($$[$0]); 
break;
case 70:

      this.$ = {
        type: "SwitchCase",
        tests: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 71:

      this.$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 73: case 99:
 $$[$0-2].push($$[$0]); 
break;
case 75:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 76:

      this.$ = {
        type: "WhileSentence",
        test: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 77:

      this.$ = {
        type: "RepeatSentence",
        test: $$[$0].test,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0].body
        }
      };
    
break;
case 78:

      this.$ = {
        test: $$[$0],
        body: []
      };
    
break;
case 79:

      this.$ = {
        test: $$[$0],
        body: $$[$0-1]
      };
    
break;
case 81:

      this.$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    
break;
case 82:

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
case 83:
 this.$ = null 
break;
case 84:
 this.$ = $$[$0]; 
break;
case 85:

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
case 86:

      this.$ = {
        inits: $$[$0-2],
        tests: $$[$0-1],
        updates: $$[$0]
      };
    
break;
case 93:

      this.$ = {
        type: "ReturnSentence",
        argument: {
          type: "Literal",
          value: 100,
          raw: "100"
        }
      };
    
break;
case 94:

      this.$ = {
        type: "ReturnSentence",
        argument: $$[$0-1]
      };
    
break;
case 95:

      this.$ = {
        type: "FrameSentence",
        argument: {
          type: "Literal",
          value: 100,
          raw: "100"
        }
      };
    
break;
case 96:

      this.$ = {
        type: "FrameSentence",
        argument: $$[$0-1]
      };
    
break;
case 101:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
case 102:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 108:

      this.$ = {
        type: "UpdateSentence",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: false
      };
    
break;
case 109:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-2],
        arguments: []
      };
    
break;
case 110:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-3],
        arguments: $$[$0-1]
      };
    
break;
case 112:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: true
      };
    
break;
case 147:

      this.$ = {
        type: "AssignmentExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,29]),{8:12,15:$V1},{9:[1,13]},o($V3,[2,4]),{1:[2,2]},o($V2,[2,30]),{9:[1,14]},o($V4,[2,6],{10:15,16:[1,16]}),{14:18,38:[1,17],39:$V5},o($V6,[2,8],{11:20,18:[1,21]}),o($V7,[2,13],{17:22}),{14:23,39:$V5},o($V2,[2,32]),{8:67,15:$V1,40:24,41:$V8,42:26,47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vu,[2,10],{12:76,20:[1,77]}),o($Vv,$Vw,{19:78}),o($V4,[2,5],{22:79,8:80,15:$V1}),o($V2,[2,31]),o($V2,[2,33]),o($Vx,[2,34]),{8:67,15:$V1,41:$Vy,47:82,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vz,[2,60]),o($VA,[2,40]),o($VA,[2,41]),o($VA,[2,42]),o($VA,$VB,{52:83,9:$VC}),o($VA,[2,44]),o($VA,[2,45]),o($VA,[2,46]),{9:[1,85]},{9:[1,86]},o($VA,[2,49]),{9:[1,87]},{9:[1,88]},{65:[1,89]},{65:[1,90]},{65:[1,91]},{8:67,15:$V1,44:94,47:97,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,61:96,62:$VD,63:$VE,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,81:92,82:93,83:$VF,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,41:$VG,43:100,44:102,47:97,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,61:96,62:$VD,63:$VE,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:103,15:$V1},{65:[1,105],90:104},{9:[2,93],65:[1,106]},{9:[2,95],65:[1,107]},{8:67,15:$V1,40:108,41:$V8,42:26,47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VH,[2,146]),o($VI,$VJ,{138:109,23:[1,110],139:[1,111],140:[1,112],141:[1,113],142:[1,114],143:[1,115],144:[1,116],145:[1,117],146:[1,118],147:[1,119],148:[1,120]}),o($VH,[2,145],{136:[1,121]}),o($VK,[2,111],{106:124,65:[1,125],102:[1,122],105:[1,123],109:$Vn,110:$Vo}),{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:126,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:127,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt},o($VL,[2,143],{134:$VM}),o($V3,[2,104]),o($V3,[2,106]),o($VN,[2,114]),o($VN,[2,115]),o($VO,[2,116]),o($VO,[2,117]),o($VO,[2,118]),o($VO,[2,119]),o($VO,[2,120]),o($VP,[2,141],{132:$VQ}),o($V3,[2,100]),o($V3,[2,101]),o($V3,[2,102]),{8:67,15:$V1,24:130,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VR,[2,139],{129:$VS,130:$VT}),o($VU,[2,136],{124:$VV,125:$VW,126:$VX,127:$VY}),o($VZ,[2,131],{121:$V_,122:$V$}),o($V01,[2,128],{113:$V11,114:$V21}),o($V31,[2,125],{112:$V41,117:$V51,118:$V61}),{13:145,21:[1,146],39:[2,12]},o([21,27,28,29,30,31,32,33,34,35,39],$Vw,{19:147}),o($V6,[2,7],{25:148,26:149,27:$V71,28:$V81,29:$V91,30:$Va1,31:$Vb1,32:$Vc1,33:$Vd1,34:$Ve1,35:$Vf1}),o($V7,[2,14]),{23:[1,159]},o($Vx,[2,35]),o($Vz,[2,61]),o($VA,[2,43]),o($VA,[2,56]),o($VA,[2,47]),o($VA,[2,48]),o($VA,[2,50]),o($VA,[2,51]),{8:67,15:$V1,24:160,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:161,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:162,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vg1,[2,77]),o($Vg1,[2,78]),{8:67,15:$V1,47:164,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,82:163,83:$VF,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{65:[1,165]},o($Vh1,[2,62]),o($Vh1,[2,52]),o($Vh1,$VB,{52:166,9:$VC}),o($Vh1,$VB,{52:167,9:$VC}),o($VA,[2,81]),o($VA,[2,36]),{8:67,15:$V1,41:[1,168],47:164,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{23:[1,169]},{8:67,15:$V1,41:$VG,43:170,44:102,47:97,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,61:96,62:$VD,63:$VE,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,9:[1,172],15:$V1,24:174,60:131,65:$Vb,91:171,94:173,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:175,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:176,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VA,[2,97]),{8:67,15:$V1,60:177,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VO,[2,148]),o($VO,[2,149]),o($VO,[2,150]),o($VO,[2,151]),o($VO,[2,152]),o($VO,[2,153]),o($VO,[2,154]),o($VO,[2,155]),o($VO,[2,156]),o($VO,[2,157]),o($VO,[2,158]),{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:178},{8:67,15:$V1,24:180,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:181,15:$V1},o($V3,[2,108]),{8:67,15:$V1,24:174,60:131,65:$Vb,66:[1,182],94:183,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VK,[2,112]),o($VK,[2,113]),{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:184},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:185},{66:[1,186]},o($VH,[2,159]),{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:187},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:188},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:189},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:190},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:191},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:192},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:193},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:194},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:195},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:179,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:196},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:197,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:198,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt},{8:67,15:$V1,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:199,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt},{14:200,39:$V5},o([27,28,29,30,31,32,33,34,35,39],$Vw,{19:201}),o($Vu,[2,9],{25:148,26:149,27:$V71,28:$V81,29:$V91,30:$Va1,31:$Vb1,32:$Vc1,33:$Vd1,34:$Ve1,35:$Vf1}),o($Vv,[2,17]),{8:202,15:$V1},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{8:67,15:$V1,24:203,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{66:[1,204]},{66:[1,205]},{66:[1,206]},o($Vg1,[2,79]),o($Vh1,[2,63]),{8:67,15:$V1,24:207,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vh1,[2,53]),o($Vh1,[2,54]),o($VA,[2,37]),{8:67,15:$V1,24:208,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VA,[2,85]),{8:67,9:[1,210],15:$V1,24:174,60:131,65:$Vb,92:209,94:211,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vi1,[2,87]),{9:[1,212],77:$Vj1},o($Vk1,[2,98]),{66:[1,214]},{66:[1,215]},o($VH,[2,147]),o($VL,[2,144],{134:$VM}),o($VI,$VJ),{103:[1,216]},o($V3,[2,107]),o($V3,[2,109]),{66:[1,217],77:$Vj1},o($VP,[2,142],{132:$VQ}),o($VR,[2,140],{129:$VS,130:$VT}),o($V3,[2,103]),o($VU,[2,137],{124:$VV,125:$VW,126:$VX,127:$VY}),o($VU,[2,138],{124:$VV,125:$VW,126:$VX,127:$VY}),o($VZ,[2,132],{121:$V_,122:$V$}),o($VZ,[2,133],{121:$V_,122:$V$}),o($VZ,[2,134],{121:$V_,122:$V$}),o($VZ,[2,135],{121:$V_,122:$V$}),o($V01,[2,129],{113:$V11,114:$V21}),o($V01,[2,130],{113:$V11,114:$V21}),o($V31,[2,126],{112:$V41,117:$V51,118:$V61}),o($V31,[2,127],{112:$V41,117:$V51,118:$V61}),o($VI,[2,122]),o($VI,[2,123]),o($VI,[2,124]),o($V2,[2,3]),{25:148,26:149,27:$V71,28:$V81,29:$V91,30:$Va1,31:$Vb1,32:$Vc1,33:$Vd1,34:$Ve1,35:$Vf1,39:[2,11]},{9:[1,219],23:[1,218]},{9:[1,220]},{8:67,15:$V1,40:221,41:$V8,42:223,45:222,46:[1,224],47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{41:[1,226],68:225,69:227,70:228,71:230,72:$Vl1,75:$Vm1},{8:67,15:$V1,41:$VG,43:232,44:102,47:97,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,61:96,62:$VD,63:$VE,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{66:[1,233]},{86:[1,234]},{8:67,15:$V1,24:174,60:131,65:$Vb,66:[1,236],93:235,94:237,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vn1,[2,89]),{9:[1,238],77:$Vj1},o($Vi1,[2,88]),{8:67,15:$V1,24:239,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{9:[2,94]},{9:[2,96]},o($V3,[2,105]),o($V3,[2,110]),{8:67,15:$V1,24:240,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vv,[2,19]),o($V7,[2,15]),o($VA,[2,57]),{8:67,15:$V1,40:241,41:$V8,42:26,47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,41:$Vy,46:[1,242],47:82,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vo1,[2,38]),o($VA,[2,59]),o($VA,[2,64]),{41:[1,243]},{41:[1,244],69:245,71:246,72:$Vl1,75:$Vm1},{74:[1,247]},o($Vp1,[2,68]),{8:67,15:$V1,24:250,60:131,65:$Vb,73:248,76:249,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($VA,[2,76]),o($Vg1,[2,80]),{8:67,15:$V1,24:251,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vq1,[2,86]),o($Vq1,[2,91]),{66:[1,252],77:$Vj1},o($Vn1,[2,90]),o($Vk1,[2,99]),{9:[1,253]},o($VA,[2,58]),o($Vo1,[2,39]),o($VA,[2,65]),o($VA,[2,66]),{41:[1,254]},o($Vp1,[2,69]),{8:67,15:$V1,40:255,41:$V8,42:26,47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{74:[1,256],77:[1,257]},o($Vr1,[2,72]),o($Vr1,[2,74],{78:[1,258]}),{9:[2,83],87:259,88:[1,260]},o($Vq1,[2,92]),o($Vv,[2,18]),o($VA,[2,67]),{41:[2,71]},{8:67,15:$V1,40:261,41:$V8,42:26,47:27,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:250,60:131,65:$Vb,76:262,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{8:67,15:$V1,24:263,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{9:[1,264]},{8:67,15:$V1,24:265,60:131,65:$Vb,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},o($Vp1,[2,70]),o($Vr1,[2,73]),o($Vr1,[2,75]),{8:67,15:$V1,41:$VG,43:266,44:102,47:97,48:28,49:29,50:30,51:31,53:32,54:33,55:34,56:35,57:36,58:37,59:$V9,60:39,61:96,62:$VD,63:$VE,64:$Va,65:$Vb,67:$Vc,79:$Vd,80:$Ve,84:$Vf,85:$Vg,89:$Vh,95:$Vi,96:$Vj,97:$Vk,98:57,99:$Vl,100:$Vm,101:53,104:58,106:54,107:51,108:55,109:$Vn,110:$Vo,111:$Vp,112:$Vq,113:$Vr,114:$Vs,115:$Vt,116:75,119:74,120:73,123:72,128:71,131:66,133:56,135:52,137:50},{9:[2,84]},o($VA,[2,82])],
defaultActions: {4:[2,1],10:[2,2],150:[2,20],151:[2,21],152:[2,22],153:[2,23],154:[2,24],155:[2,25],156:[2,26],157:[2,27],158:[2,28],214:[2,94],215:[2,96],255:[2,71],265:[2,84]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
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
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
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
case 1: return 64; 
break;
case 2: return 46; 
break;
case 3: return 67; 
break;
case 4: return 72; 
break;
case 5: return 75; 
break;
case 6: return 84; 
break;
case 7: return 85; 
break;
case 8: return 80; 
break;
case 9: return 83; 
break;
case 10: return 79; 
break;
case 11: return 85; 
break;
case 12: return 86; 
break;
case 13: return 88; 
break;
case 14: return 89; 
break;
case 15: return 62; 
break;
case 16: return 63; 
break;
case 17: return 95; 
break;
case 18: return 96; 
break;
case 19: return 97; 
break;
case 20: return 59; 
break;
case 21: return 96; 
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
case 29: return 39; 
break;
case 30: return 41; 
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
case 41: return 65; 
break;
case 42: return 66; 
break;
case 43: return 102; 
break;
case 44: return 103; 
break;
case 45: return 77; 
break;
case 46: return 23; 
break;
case 47: return 142; 
break;
case 48: return 143; 
break;
case 49: return 140; 
break;
case 50: return 139; 
break;
case 51: return 141; 
break;
case 52: return 146; 
break;
case 53: return 148; 
break;
case 54: return 147; 
break;
case 55: return 144; 
break;
case 56: return 145; 
break;
case 57: return 129; 
break;
case 58: return 127; 
break;
case 59: return '=>'; 
break;
case 60: return 126; 
break;
case 61: return 130; 
break;
case 62: return 130; 
break;
case 63: return 124; 
break;
case 64: return 125; 
break;
case 65: return 132; 
break;
case 66: return 132; 
break;
case 67: return 111; 
break;
case 68: return 136; 
break;
case 69: return 136; 
break;
case 70: return '^^'; 
break;
case 71: return '^^'; 
break;
case 72: return 134; 
break;
case 73: return 122; 
break;
case 74: return 121; 
break;
case 75: return 109; 
break;
case 76: return 110; 
break;
case 77: return 113; 
break;
case 78: return 114; 
break;
case 79: return 23; 
break;
case 80: return 117; 
break;
case 81: return 112; 
break;
case 82: return 118; 
break;
case 83: return 118; 
break;
case 84: return 115; 
break;
case 85: return 115; 
break;
case 86: return 111; 
break;
case 87: return 112; 
break;
case 88: return 78; 
break;
case 89: return 74; 
break;
case 90: return 105; 
break;
case 91: return 99; 
break;
case 92: return 100; 
break;
case 93: return 15; 
break;
case 94: return 5; 
break;
}
},
rules: [/^(?:\s+)/i,/^(?:IF\b)/i,/^(?:ELSE\b)/i,/^(?:SWITCH\b)/i,/^(?:CASE\b)/i,/^(?:DEFAULT\b)/i,/^(?:LOOP\b)/i,/^(?:FROM\b)/i,/^(?:REPEAT\b)/i,/^(?:UNTIL\b)/i,/^(?:WHILE\b)/i,/^(?:FROM\b)/i,/^(?:TO\b)/i,/^(?:STEP\b)/i,/^(?:FOR\b)/i,/^(?:BREAK\b)/i,/^(?:CONTINUE\b)/i,/^(?:RETURN\b)/i,/^(?:FRAME\b)/i,/^(?:CLONE\b)/i,/^(?:DEBUG\b)/i,/^(?:FRAME\b)/i,/^(?:PROGRAM\b)/i,/^(?:CONST\b)/i,/^(?:GLOBAL\b)/i,/^(?:LOCAL\b)/i,/^(?:PRIVATE\b)/i,/^(?:PROCESS\b)/i,/^(?:FUNCTION\b)/i,/^(?:BEGIN\b)/i,/^(?:END\b)/i,/^(?:INT POINTER\b)/i,/^(?:INT\b)/i,/^(?:WORD POINTER\b)/i,/^(?:WORD\b)/i,/^(?:BYTE POINTER\b)/i,/^(?:BYTE\b)/i,/^(?:STRING POINTER\b)/i,/^(?:STRING\b)/i,/^(?:STRUCT POINTER\b)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?::=)/i,/^(?:\+=)/i,/^(?:-=)/i,/^(?:\/=)/i,/^(?:\*=)/i,/^(?:%=)/i,/^(?:&=)/i,/^(?:\|=)/i,/^(?:\^=)/i,/^(?:<<=)/i,/^(?:>>=)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:=>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:AND\b)/i,/^(?:&&)/i,/^(?:&)/i,/^(?:OR\b)/i,/^(?:\|\|)/i,/^(?:XOR\b)/i,/^(?:\^\^)/i,/^(?:\^)/i,/^(?:>>)/i,/^(?:<<)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:=)/i,/^(?:\/)/i,/^(?:\*)/i,/^(?:MOD\b)/i,/^(?:%)/i,/^(?:NOT\b)/i,/^(?:!)/i,/^(?:OFFSET\b)/i,/^(?:POINTER\b)/i,/^(?:\.\.)/i,/^(?::)/i,/^(?:\.)/i,/^(?:("")|(".*?([^\\]")))/i,/^(?:[0-9]+)/i,/^(?:([a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_][0-9a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_]*))/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
return parser;
});