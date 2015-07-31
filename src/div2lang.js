

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[18,20,21,39],$V4=[1,19],$V5=[20,21,39],$V6=[1,27],$V7=[1,40],$V8=[1,43],$V9=[1,71],$Va=[1,44],$Vb=[1,45],$Vc=[1,46],$Vd=[1,47],$Ve=[1,48],$Vf=[1,49],$Vg=[1,50],$Vh=[1,51],$Vi=[1,52],$Vj=[1,68],$Vk=[1,66],$Vl=[1,69],$Vm=[1,67],$Vn=[1,58],$Vo=[1,59],$Vp=[1,72],$Vq=[1,73],$Vr=[21,39],$Vs=[1,79],$Vt=[1,80],$Vu=[1,81],$Vv=[1,82],$Vw=[1,83],$Vx=[1,84],$Vy=[1,85],$Vz=[1,86],$VA=[1,87],$VB=[18,20,21,27,28,29,30,31,32,33,34,35,39],$VC=[5,15,37,41,46,59,65,66,68,73,76,80,81,84,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$VD=[1,90],$VE=[15,41,46,59,65,66,68,80,81,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$VF=[15,41,46,59,65,66,68,80,81,84,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$VG=[2,60],$VH=[1,93],$VI=[2,159],$VJ=[1,108],$VK=[1,109],$VL=[1,105],$VM=[1,111],$VN=[9,15,41,46,59,65,68,80,81,84,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$VO=[9,23,67,75,78,79,87,88,102,103,104,105,106,107,108,109,110,111,121,122,123,124,125,126,129,130,133,134,137,138,139,144,145,146,147,148],$VP=[2,162],$VQ=[9,67,75,78,79,87,88,148],$VR=[9,67,75,78,79,87,88,121,122,123,124,125,126,129,130,133,134,137,138,139,148],$VS=[2,156],$VT=[1,129],$VU=[1,130],$VV=[9,67,75,78,79,87,88,121,122,123,124,125,126,148],$VW=[1,145],$VX=[1,146],$VY=[9,15,67,75,78,79,87,88,121,122,123,124,125,126,129,130,133,134,137,138,139,148],$VZ=[9,67,75,78,79,87,88,121,122,123,124,125,126,129,130,148],$V_=[1,148],$V$=[1,149],$V01=[9,67,75,78,79,87,88,121,122,123,124,125,126,129,130,133,134,148],$V11=[1,151],$V21=[1,152],$V31=[1,153],$V41=[15,66,122,134,138,142,144,145,150,151],$V51=[9,15,41,46,59,65,66,68,80,81,84,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$V61=[15,41,59,65,66,68,80,81,84,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$V71=[9,15,66,122,134,138,142,144,145,150,151],$V81=[1,209],$V91=[9,67,78],$Va1=[1,225],$Vb1=[1,223],$Vc1=[15,66,67,122,134,138,142,144,145,150,151],$Vd1=[15,41,59,65,66,68,80,81,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$Ve1=[41,73,76],$Vf1=[15,41,59,63,64,65,66,68,80,81,85,86,89,95,96,97,122,134,138,142,144,145,150,151],$Vg1=[75,78];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"private":38,"BEGIN":39,"group_of_sentences":40,"END":41,"sentence_list":42,"group_of_sentences_for_loops":43,"sentence_list_for_loops":44,"group_of_sentences_for_if_else":45,"ELSE":46,"sentence":47,"if_sentence":48,"switch_sentence":49,"while_sentence":50,"repeat_sentence":51,"opt_end":52,"loop_sentence":53,"from_sentence":54,"for_sentence":55,"return_sentence":56,"frame_sentence":57,"clone_sentence":58,"DEBUG":59,"call":60,"assignment_expression":61,"sentence_for_loops":62,"BREAK":63,"CONTINUE":64,"IF":65,"(":66,")":67,"SWITCH":68,"group_of_cases":69,"default":70,"case_list":71,"case":72,"CASE":73,"list_of_ranges":74,":":75,"DEFAULT":76,"range":77,",":78,"..":79,"WHILE":80,"REPEAT":81,"group_of_sentences_for_repeat":82,"until_condition":83,"UNTIL":84,"LOOP":85,"FROM":86,"TO":87,"STEP":88,"FOR":89,"for_params":90,"initialization":91,"condition":92,"increment":93,"expression_list":94,"RETURN":95,"FRAME":96,"CLONE":97,"boolean_expression":98,"access_expression":99,"assignment_operator":100,"increment_operator":101,"*=":102,"/=":103,"%=":104,"+=":105,"-=":106,"&=":107,"|=":108,"^=":109,"<<=":110,">>=":111,"comparison_operator":112,"==":113,"!=":114,">=":115,"<=":116,"<":117,">":118,"shift_expression":119,"boolean_operator":120,"&&":121,"&":122,"||":123,"|":124,"^^":125,"^":126,"additive_expression":127,"shift_operator":128,"<<":129,">>":130,"multiplicative_expression":131,"additive_operator":132,"+":133,"-":134,"unary_expression":135,"multiplicative_operator":136,"/":137,"*":138,"%":139,"postfix_expression":140,"unary_operator":141,"!":142,"primary_expression":143,"++":144,"--":145,".":146,"[":147,"]":148,"const":149,"NUMBER":150,"STRING_LITERAL":151,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"private",39:"BEGIN",41:"END",46:"ELSE",59:"DEBUG",63:"BREAK",64:"CONTINUE",65:"IF",66:"(",67:")",68:"SWITCH",73:"CASE",75:":",76:"DEFAULT",78:",",79:"..",80:"WHILE",81:"REPEAT",84:"UNTIL",85:"LOOP",86:"FROM",87:"TO",88:"STEP",89:"FOR",95:"RETURN",96:"FRAME",97:"CLONE",102:"*=",103:"/=",104:"%=",105:"+=",106:"-=",107:"&=",108:"|=",109:"^=",110:"<<=",111:">>=",113:"==",114:"!=",115:">=",116:"<=",117:"<",118:">",121:"&&",122:"&",123:"||",124:"|",125:"^^",126:"^",129:"<<",130:">>",133:"+",134:"-",137:"/",138:"*",139:"%",142:"!",144:"++",145:"--",146:".",147:"[",148:"]",150:"NUMBER",151:"STRING_LITERAL"},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,1],[10,0],[11,2],[11,1],[11,0],[12,2],[12,1],[12,0],[13,2],[13,1],[13,0],[17,1],[17,2],[22,4],[19,1],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,5],[36,4],[14,2],[40,1],[40,2],[43,1],[43,2],[45,1],[45,2],[47,1],[47,1],[47,1],[47,2],[47,1],[47,1],[47,1],[47,2],[47,2],[47,1],[47,2],[47,2],[47,2],[62,1],[62,2],[62,2],[52,0],[52,1],[48,5],[48,6],[49,5],[42,1],[42,2],[44,1],[44,2],[69,1],[69,2],[69,2],[69,3],[71,1],[71,2],[72,4],[70,3],[74,1],[74,3],[77,1],[77,3],[50,5],[51,2],[82,1],[82,2],[83,4],[53,2],[54,8],[54,10],[55,3],[90,4],[91,1],[91,2],[92,1],[92,2],[93,1],[93,2],[56,1],[56,4],[57,1],[57,4],[58,2],[60,3],[60,4],[94,1],[94,3],[61,1],[61,3],[61,2],[61,2],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[24,1],[112,1],[112,1],[112,1],[112,1],[112,1],[112,1],[98,1],[98,3],[120,1],[120,1],[120,1],[120,1],[120,1],[120,1],[119,1],[119,3],[128,1],[128,1],[127,1],[127,3],[132,1],[132,1],[131,1],[131,3],[136,1],[136,1],[136,1],[135,1],[135,2],[135,2],[141,1],[141,1],[141,1],[141,1],[140,1],[140,1],[140,2],[140,1],[101,1],[101,1],[99,1],[99,3],[99,4],[143,1],[143,3],[149,1],[149,1]],
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
case 6:

      this.$ = {
        type: "ConstDeclarations",
        declarations: []
      };
    
break;
case 7: case 10: case 13: case 16:
 this.$ = null; 
break;
case 8:

      this.$ = {
        type: "GlobalDeclarations",
        declarations: $$[$0]
      };
    
break;
case 9:

      this.$ = {
        type: "GlobalDeclarations",
        declarations: []
      };
    
break;
case 11:

      this.$ = {
        type: "LocalDeclarations",
        declarations: $$[$0]
      };
    
break;
case 12:

      this.$ = {
        type: "LocalDeclarations",
        declarations: []
      };
    
break;
case 14:

      this.$ = {
        type: "PrivateDeclarations",
        declarations: $$[$0]
      };
    
break;
case 15:

      this.$ = {
        type: "PrivateDeclarations",
        declarations: []
      };
    
break;
case 17: case 20: case 65: case 67: case 73: case 77: case 104:
 this.$ = [$$[$0]]; 
break;
case 18: case 74:
 $$[$0-1].push($$[$0]); 
break;
case 19:

      // TODO: I think consts are actually MACROS
      this.$ = {
        type: "ConstDeclarator",
        constType: "int",
        constName: $$[$0-3],
        constInit: $$[$0-1]
      };
    
break;
case 21:
 this.$ = $$[$0-1].push($$[$0]); 
break;
case 22:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-4],
        varName: $$[$0-3],
        varInit: $$[$0-1]
      };
    
break;
case 23:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-2],
        varName: $$[$0-1],
        varInit: null
      };
    
break;
case 24:
 this.$ = "int_pointer"; 
break;
case 25:
 this.$ = "int"; 
break;
case 26:
 this.$ = "word_pointer"; 
break;
case 27:
 this.$ = "word"; 
break;
case 28:
 this.$ = "byte_pointer"; 
break;
case 29:
 this.$ = "byte"; 
break;
case 30:
 this.$ = "string_pointer"; 
break;
case 31:
 this.$ = "string"; 
break;
case 32:
 this.$ = "struct_pointer"; 
break;
case 37:

      this.$ = {
        type: "SentenceBlock",
        sentences: $$[$0]
      };
    
break;
case 38: case 40: case 42: case 69: case 91: case 93: case 95:
 this.$ = []; 
break;
case 39: case 41: case 43: case 85:
 this.$ = $$[$0-1]; 
break;
case 62:

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
case 63:

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
case 64:

      this.$ = {
        type: "SwitchSentence",
        discriminant: $$[$0-2],
        cases: $$[$0]
      };
    
break;
case 66: case 68:
 this.$ = $$[$0-1].push(sentence); 
break;
case 70:
 this.$ = [$$[$0-1]]; 
break;
case 72:
 $$[$0-2].push($$[$0-1]); 
break;
case 75:

      this.$ = {
        type: "SwitchCase",
        tests: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 76:

      this.$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 78: case 105:
 $$[$0-2].push($$[$0]); 
break;
case 80:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 81:

      this.$ = {
        type: "WhileSentence",
        test: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 82:

      this.$ = {
        type: "RepeatSentence",
        test: $$[$0].test,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0].body
        }
      };
    
break;
case 83:

      this.$ = {
        test: $$[$0],
        body: []
      };
    
break;
case 84:

      this.$ = {
        test: $$[$0],
        body: $$[$0-1]
      };
    
break;
case 86:

      this.$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    
break;
case 87:

      this.$ = {
        type: "FromSentence",
        identifier: $$[$0-6],
        init: $$[$0-4],
        limit: $$[$0-2],
        step: null,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 88:

      this.$ = {
        type: "FromSentence",
        identifier: $$[$0-8],
        init: $$[$0-6],
        limit: $$[$0-4],
        step: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 89:

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
case 90:

      this.$ = {
        inits: $$[$0-2],
        tests: $$[$0-1],
        updates: $$[$0]
      };
    
break;
case 97:

      this.$ = {
        type: "ReturnSentence",
        argument: {
          type: "Literal",
          value: 100,
          raw: "100"
        }
      };
    
break;
case 98:

      this.$ = {
        type: "ReturnSentence",
        argument: $$[$0-1]
      };
    
break;
case 99:

      this.$ = {
        type: "FrameSentence",
        argument: {
          type: "Literal",
          value: 100,
          raw: "100"
        }
      };
    
break;
case 100:

      this.$ = {
        type: "FrameSentence",
        argument: $$[$0-1]
      };
    
break;
case 102:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-2],
        arguments: []
      };
    
break;
case 103:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-3],
        arguments: $$[$0-1]
      };
    
break;
case 107:

      this.$ = {
        type: "AssignmentExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
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
        type: "UpdateSentence",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: true
      };
    
break;
case 167:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 168:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,33]),{8:12,15:$V1},{9:[1,13]},o([9,23,66,67,75,78,79,87,88,102,103,104,105,106,107,108,109,110,111,121,122,123,124,125,126,129,130,133,134,137,138,139,144,145,146,147,148],[2,4]),{1:[2,2]},o($V2,[2,34]),{9:[1,14]},o($V3,[2,7],{10:15,16:[1,16]}),{14:18,38:[1,17],39:$V4},o($V5,[2,10],{11:20,18:[1,21]}),o($V3,[2,6],{17:22,22:23,8:24,15:$V1}),{14:25,39:$V4},o($V2,[2,36]),{8:53,15:$V1,40:26,41:$V6,42:28,47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($Vr,[2,13],{12:74,20:[1,75]}),o($V5,[2,9],{19:76,25:77,26:78,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),o($V3,[2,5],{25:77,26:78,19:88,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),o($VB,[2,17]),{23:[1,89]},o($V2,[2,35]),o($V2,[2,37]),o($VC,[2,38]),{8:53,15:$V1,41:$VD,47:91,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VE,[2,65]),o($VF,[2,44]),o($VF,[2,45]),o($VF,[2,46]),o($VF,$VG,{52:92,9:$VH}),o($VF,[2,48]),o($VF,[2,49]),o($VF,[2,50]),o($VF,$VG,{52:94,9:$VH}),o($VF,$VG,{52:95,9:$VH}),o($VF,[2,53]),o($VF,$VG,{52:96,9:$VH}),o([121,122,123,124,125,126,129,130,133,134,137,138,139],$VI,{9:[1,97]}),{9:[1,98]},{66:[1,99]},{66:[1,100]},{66:[1,101]},{8:53,15:$V1,44:104,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,82:102,83:103,84:$VL,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,41:$VM,43:110,44:112,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:113,15:$V1},{66:[1,115],90:114},o($VN,[2,97],{66:[1,116]}),o($VN,[2,99],{66:[1,117]}),{8:53,15:$V1,40:118,41:$V6,42:28,47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VO,$VP,{66:[1,119]}),o($VQ,[2,106],{120:120,121:[1,121],122:[1,122],123:[1,123],124:[1,124],125:[1,125],126:[1,126]}),o($VR,$VS,{100:127,101:128,23:[1,131],102:[1,132],103:[1,133],104:[1,134],105:[1,135],106:[1,136],107:[1,137],108:[1,138],109:[1,139],110:[1,140],111:[1,141],144:$Vn,145:$Vo,146:$VT,147:$VU}),{8:143,15:$V1,99:142},o($VV,[2,128],{128:144,129:$VW,130:$VX}),o($VY,[2,160]),o($VY,[2,161]),o($VZ,[2,136],{132:147,133:$V_,134:$V$}),o($V01,[2,140],{136:150,137:$V11,138:$V21,139:$V31}),o($VR,[2,144]),o($VR,[2,149]),{8:53,15:$V1,60:157,66:$V9,99:156,101:155,122:$Vj,134:$Vk,135:154,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VR,[2,157]),o($V41,[2,152]),o($V41,[2,153]),o($V41,[2,154]),o($V41,[2,155]),o($VR,[2,165]),{8:53,15:$V1,24:158,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VR,[2,167]),o($VR,[2,168]),{13:160,21:[1,161],39:[2,16]},o($Vr,[2,12],{25:77,26:78,19:162,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),o($V5,[2,8],{26:78,25:163,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),o($VB,[2,20]),{8:164,15:$V1},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{15:[2,29]},{15:[2,30]},{15:[2,31]},{15:[2,32]},o($V3,[2,18],{26:78,25:163,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),{8:53,15:$V1,24:165,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VC,[2,39]),o($VE,[2,66]),o($VF,[2,47]),o($VF,[2,61]),o($VF,[2,51]),o($VF,[2,52]),o($VF,[2,54]),o($VF,[2,55]),o($VF,[2,56]),{8:53,15:$V1,24:166,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:167,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:168,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V51,[2,82]),o($V51,[2,83]),{8:53,15:$V1,47:170,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,83:169,84:$VL,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{66:[1,171]},o($V61,[2,67]),o($V61,[2,57]),o($V61,$VG,{52:172,9:$VH}),o($V61,$VG,{52:173,9:$VH}),o($VF,[2,86]),o($VF,[2,40]),{8:53,15:$V1,41:[1,174],47:170,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{23:[1,175]},{8:53,15:$V1,41:$VM,43:176,44:112,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,9:[1,178],15:$V1,24:180,60:157,61:159,66:$V9,91:177,94:179,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:181,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:182,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VF,[2,101]),{8:53,15:$V1,24:180,60:157,61:159,66:$V9,67:[1,183],94:184,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,60:157,66:$V9,99:156,101:155,119:185,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V41,[2,130]),o($V41,[2,131]),o($V41,[2,132]),o($V41,[2,133]),o($V41,[2,134]),o($V41,[2,135]),{8:53,15:$V1,60:157,61:186,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VR,[2,108]),{8:187,15:$V1},{8:53,15:$V1,24:188,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V41,[2,110]),o($V41,[2,111]),o($V41,[2,112]),o($V41,[2,113]),o($V41,[2,114]),o($V41,[2,115]),o($V41,[2,116]),o($V41,[2,117]),o($V41,[2,118]),o($V41,[2,119]),o($V41,[2,120]),o($VR,[2,109],{146:$VT,147:$VU}),o([9,67,75,78,79,87,88,121,122,123,124,125,126,129,130,133,134,137,138,139,146,147,148],$VP),{8:53,15:$V1,60:157,66:$V9,99:156,101:155,122:$Vj,127:189,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V41,[2,138]),o($V41,[2,139]),{8:53,15:$V1,60:157,66:$V9,99:156,101:155,122:$Vj,131:190,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V41,[2,142]),o($V41,[2,143]),{8:53,15:$V1,60:157,66:$V9,99:156,101:155,122:$Vj,134:$Vk,135:191,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V41,[2,146]),o($V41,[2,147]),o($V41,[2,148]),o($VR,[2,150]),{8:143,15:$V1,99:192},o($VR,$VS,{101:193,144:$Vn,145:$Vo,146:$VT,147:$VU}),o($VR,$VI),{67:[1,194]},o($VQ,[2,121]),{14:195,39:$V4},{19:196,25:77,26:78,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA,39:[2,15]},o($Vr,[2,11],{26:78,25:163,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA}),o($VB,[2,21]),{9:[1,198],23:[1,197]},{9:[1,199]},{67:[1,200]},{67:[1,201]},{67:[1,202]},o($V51,[2,84]),o($V61,[2,68]),{8:53,15:$V1,24:203,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V61,[2,58]),o($V61,[2,59]),o($VF,[2,41]),{8:53,15:$V1,24:204,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VF,[2,89]),{8:53,9:[1,206],15:$V1,24:180,60:157,61:159,66:$V9,92:205,94:207,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V71,[2,91]),{9:[1,208],78:$V81},o($V91,[2,104]),{67:[1,210]},{67:[1,211]},o($VR,[2,102]),{67:[1,212],78:$V81},o($VV,[2,129],{128:144,129:$VW,130:$VX}),o($VQ,[2,107]),o($VO,[2,163]),{148:[1,213]},o($VZ,[2,137],{132:147,133:$V_,134:$V$}),o($V01,[2,141],{136:150,137:$V11,138:$V21,139:$V31}),o($VR,[2,145]),o($VR,[2,151],{146:$VT,147:$VU}),o($VR,[2,158]),o($VR,[2,166]),o($V2,[2,3]),{25:163,26:78,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$VA,39:[2,14]},{8:53,15:$V1,24:214,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VB,[2,23]),o($VB,[2,19]),{8:53,15:$V1,40:215,41:$V6,42:217,45:216,46:[1,218],47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{41:[1,220],69:219,70:221,71:222,72:224,73:$Va1,76:$Vb1},{8:53,15:$V1,41:$VM,43:226,44:112,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{67:[1,227]},{87:[1,228]},{8:53,15:$V1,24:180,60:157,61:159,66:$V9,67:[1,230],93:229,94:231,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($Vc1,[2,93]),{9:[1,232],78:$V81},o($V71,[2,92]),{8:53,15:$V1,24:233,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($V51,[2,98]),o($V51,[2,100]),o($VR,[2,103]),o($VO,[2,164]),{9:[1,234]},o($VF,[2,62]),{8:53,15:$V1,40:235,41:$V6,42:28,47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,41:$VD,46:[1,236],47:91,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($Vd1,[2,42]),o($VF,[2,64]),o($VF,[2,69]),{41:[1,237]},{41:[1,238],70:239,72:240,73:$Va1,76:$Vb1},{75:[1,241]},o($Ve1,[2,73]),{8:53,15:$V1,24:244,60:157,61:159,66:$V9,74:242,77:243,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VF,[2,81]),o($V51,[2,85]),{8:53,15:$V1,24:245,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($Vf1,[2,90]),o($Vf1,[2,95]),{67:[1,246],78:$V81},o($Vc1,[2,94]),o($V91,[2,105]),o($VB,[2,22]),o($VF,[2,63]),o($Vd1,[2,43]),o($VF,[2,70]),o($VF,[2,71]),{41:[1,247]},o($Ve1,[2,74]),{8:53,15:$V1,40:248,41:$V6,42:28,47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{75:[1,249],78:[1,250]},o($Vg1,[2,77]),o($Vg1,[2,79],{79:[1,251]}),{9:[1,252],88:[1,253]},o($Vf1,[2,96]),o($VF,[2,72]),{41:[2,76]},{8:53,15:$V1,40:254,41:$V6,42:28,47:29,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:244,60:157,61:159,66:$V9,77:255,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:256,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,41:$VM,43:257,44:112,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},{8:53,15:$V1,24:258,60:157,61:159,66:$V9,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($Ve1,[2,75]),o($Vg1,[2,78]),o($Vg1,[2,80]),o($VF,[2,87]),{9:[1,259]},{8:53,15:$V1,41:$VM,43:260,44:112,47:107,48:30,49:31,50:32,51:33,53:34,54:35,55:36,56:37,57:38,58:39,59:$V7,60:41,61:42,62:106,63:$VJ,64:$VK,65:$V8,66:$V9,68:$Va,80:$Vb,81:$Vc,85:$Vd,86:$Ve,89:$Vf,95:$Vg,96:$Vh,97:$Vi,98:54,99:55,101:56,119:57,122:$Vj,127:60,131:61,134:$Vk,135:62,138:$Vl,140:63,141:64,142:$Vm,143:65,144:$Vn,145:$Vo,149:70,150:$Vp,151:$Vq},o($VF,[2,88])],
defaultActions: {4:[2,1],10:[2,2],79:[2,24],80:[2,25],81:[2,26],82:[2,27],83:[2,28],84:[2,29],85:[2,30],86:[2,31],87:[2,32],248:[2,76]},
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
case 1: return 65; 
break;
case 2: return 46; 
break;
case 3: return 68; 
break;
case 4: return 73; 
break;
case 5: return 76; 
break;
case 6: return 85; 
break;
case 7: return 86; 
break;
case 8: return 81; 
break;
case 9: return 84; 
break;
case 10: return 80; 
break;
case 11: return 86; 
break;
case 12: return 87; 
break;
case 13: return 88; 
break;
case 14: return 89; 
break;
case 15: return 63; 
break;
case 16: return 64; 
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
case 41: return 66; 
break;
case 42: return 67; 
break;
case 43: return 147; 
break;
case 44: return 148; 
break;
case 45: return 78; 
break;
case 46: return 23; 
break;
case 47: return 105; 
break;
case 48: return 106; 
break;
case 49: return 103; 
break;
case 50: return 102; 
break;
case 51: return 104; 
break;
case 52: return 107; 
break;
case 53: return 108; 
break;
case 54: return 109; 
break;
case 55: return 110; 
break;
case 56: return 111; 
break;
case 57: return 113; 
break;
case 58: return 115; 
break;
case 59: return '=>'; 
break;
case 60: return 116; 
break;
case 61: return 114; 
break;
case 62: return 114; 
break;
case 63: return 117; 
break;
case 64: return 118; 
break;
case 65: return 121; 
break;
case 66: return 121; 
break;
case 67: return 122; 
break;
case 68: return 123; 
break;
case 69: return 123; 
break;
case 70: return 125; 
break;
case 71: return 125; 
break;
case 72: return 126; 
break;
case 73: return 130; 
break;
case 74: return 129; 
break;
case 75: return 144; 
break;
case 76: return 145; 
break;
case 77: return 133; 
break;
case 78: return 134; 
break;
case 79: return 23; 
break;
case 80: return 137; 
break;
case 81: return 138; 
break;
case 82: return 139; 
break;
case 83: return 139; 
break;
case 84: return 142; 
break;
case 85: return 142; 
break;
case 86: return 122; 
break;
case 87: return 138; 
break;
case 88: return 79; 
break;
case 89: return 75; 
break;
case 90: return 146; 
break;
case 91: return 151; 
break;
case 92: return 150; 
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