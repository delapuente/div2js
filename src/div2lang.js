

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[9,23,61,62,70,73,74,82,84,98,99,101,105,106,108,109,110,113,114,117,118,120,121,122,123,125,126,128,130,132,136,137,138,139,140,141,142,143,144,145],$V4=[18,20,21,39],$V5=[1,19],$V6=[20,21,39],$V7=[15,18,20,21,39],$V8=[1,25],$V9=[1,38],$Va=[1,40],$Vb=[1,41],$Vc=[1,42],$Vd=[1,73],$Ve=[1,43],$Vf=[1,44],$Vg=[1,45],$Vh=[1,46],$Vi=[1,47],$Vj=[1,48],$Vk=[1,49],$Vl=[1,50],$Vm=[1,51],$Vn=[1,71],$Vo=[1,72],$Vp=[1,62],$Vq=[1,63],$Vr=[1,64],$Vs=[1,65],$Vt=[1,66],$Vu=[1,67],$Vv=[1,68],$Vw=[21,39],$Vx=[20,21,27,28,29,30,31,32,33,34,35,39],$Vy=[2,16],$Vz=[5,15,37,41,44,57,58,59,60,61,63,68,71,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$VA=[1,84],$VB=[15,41,44,57,58,59,60,61,63,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$VC=[1,100],$VD=[9,62,70,73,74,82,84,99],$VE=[9,62,70,73,74,82,84,99,108,109,110,113,114,117,118,120,121,122,123,125,126,128,130,132],$VF=[2,116],$VG=[9,23,62,70,73,74,82,84,99,108,109,110,113,114,117,118,120,121,122,123,125,126,128,130,132,136,137,138,139,140,141,142,143,144,145],$VH=[9,62,70,73,74,82,84,99,132],$VI=[1,127],$VJ=[9,15,23,61,62,70,73,74,82,84,95,96,98,99,101,105,106,107,108,109,110,111,113,114,117,118,120,121,122,123,125,126,128,130,132,136,137,138,139,140,141,142,143,144,145],$VK=[15,61,95,96,105,106,107,108,109,110,111],$VL=[9,62,70,73,74,82,84,99,130,132],$VM=[1,128],$VN=[9,62,70,73,74,82,84,99,128,130,132],$VO=[1,130],$VP=[1,131],$VQ=[9,62,70,73,74,82,84,99,125,126,128,130,132],$VR=[1,132],$VS=[1,133],$VT=[1,134],$VU=[1,135],$VV=[9,62,70,73,74,82,84,99,120,121,122,123,125,126,128,130,132],$VW=[1,136],$VX=[1,137],$VY=[9,62,70,73,74,82,84,99,117,118,120,121,122,123,125,126,128,130,132],$VZ=[1,138],$V_=[1,139],$V$=[9,62,70,73,74,82,84,99,109,110,117,118,120,121,122,123,125,126,128,130,132],$V01=[1,140],$V11=[1,141],$V21=[1,142],$V31=[1,148],$V41=[1,149],$V51=[1,150],$V61=[1,151],$V71=[1,152],$V81=[1,153],$V91=[1,154],$Va1=[1,155],$Vb1=[1,156],$Vc1=[9,15,41,44,57,58,59,60,61,63,75,76,79,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$Vd1=[9,15,61,95,96,105,106,107,108,109,110,111],$Ve1=[1,207],$Vf1=[9,62,73],$Vg1=[1,225],$Vh1=[1,223],$Vi1=[15,61,62,95,96,105,106,107,108,109,110,111],$Vj1=[15,41,57,58,59,60,61,63,75,76,80,81,85,91,92,93,95,96,105,106,107,108,109,110,111],$Vk1=[41,68,71],$Vl1=[70,73];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"private":38,"BEGIN":39,"group_of_sentences":40,"END":41,"sentence_list":42,"group_of_sentences_for_if_else":43,"ELSE":44,"sentence":45,"if_sentence":46,"switch_sentence":47,"while_sentence":48,"repeat_sentence":49,"opt_end":50,"loop_sentence":51,"from_sentence":52,"for_sentence":53,"return_sentence":54,"frame_sentence":55,"clone_sentence":56,"DEBUG":57,"BREAK":58,"CONTINUE":59,"IF":60,"(":61,")":62,"SWITCH":63,"group_of_cases":64,"default":65,"case_list":66,"case":67,"CASE":68,"list_of_ranges":69,":":70,"DEFAULT":71,"range":72,",":73,"..":74,"WHILE":75,"REPEAT":76,"group_of_sentences_for_repeat":77,"until_condition":78,"UNTIL":79,"LOOP":80,"FROM":81,"TO":82,"step":83,"STEP":84,"FOR":85,"for_params":86,"initialization":87,"condition":88,"increment":89,"expression_list":90,"RETURN":91,"FRAME":92,"CLONE":93,"primary_expression":94,"STRING_LITERAL":95,"NUMBER":96,"postfix_expression":97,"[":98,"]":99,"call_expression":100,".":101,"update_operator":102,"unary_expression":103,"unary_operator":104,"++":105,"--":106,"&":107,"*":108,"+":109,"-":110,"!":111,"multiplicative_expression":112,"/":113,"%":114,"additive_expression":115,"shift_expression":116,"<<":117,">>":118,"relational_expression":119,"<":120,">":121,"<=":122,">=":123,"equality_expression":124,"==":125,"!=":126,"and_expression":127,"&&":128,"exclusive_or_expression":129,"^":130,"inclusive_or_expression":131,"||":132,"conditional_expression":133,"assignment_expression":134,"assignment_operator":135,"*=":136,"/=":137,"%=":138,"+=":139,"-=":140,"<<=":141,">>=":142,"&=":143,"^=":144,"|=":145,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"private",39:"BEGIN",41:"END",44:"ELSE",57:"DEBUG",58:"BREAK",59:"CONTINUE",60:"IF",61:"(",62:")",63:"SWITCH",68:"CASE",70:":",71:"DEFAULT",73:",",74:"..",75:"WHILE",76:"REPEAT",79:"UNTIL",80:"LOOP",81:"FROM",82:"TO",84:"STEP",85:"FOR",91:"RETURN",92:"FRAME",93:"CLONE",95:"STRING_LITERAL",96:"NUMBER",98:"[",99:"]",101:".",105:"++",106:"--",107:"&",108:"*",109:"+",110:"-",111:"!",113:"/",114:"%",117:"<<",118:">>",120:"<",121:">",122:"<=",123:">=",125:"==",126:"!=",128:"&&",130:"^",132:"||",136:"*=",137:"/=",138:"%=",139:"+=",140:"-=",141:"<<=",142:">>=",143:"&=",144:"^=",145:"|="},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,0],[17,0],[17,2],[22,4],[19,0],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,5],[36,4],[14,2],[40,1],[40,2],[43,1],[43,2],[45,1],[45,1],[45,1],[45,2],[45,1],[45,1],[45,1],[45,2],[45,2],[45,1],[45,2],[45,2],[45,2],[45,2],[50,0],[50,1],[46,5],[46,6],[47,5],[42,1],[42,2],[64,1],[64,2],[64,2],[64,3],[66,1],[66,2],[67,4],[65,3],[69,1],[69,3],[72,1],[72,3],[48,5],[49,2],[77,1],[77,2],[78,4],[51,2],[52,9],[83,0],[83,2],[53,3],[86,4],[87,1],[87,2],[88,1],[88,2],[89,1],[89,2],[54,1],[54,4],[55,1],[55,4],[56,2],[90,1],[90,3],[94,1],[94,1],[94,1],[94,3],[97,1],[97,4],[97,1],[97,3],[97,2],[100,3],[100,4],[103,1],[103,2],[103,2],[102,1],[102,1],[104,1],[104,1],[104,1],[104,1],[104,1],[112,1],[112,3],[112,3],[112,3],[115,1],[115,3],[115,3],[116,1],[116,3],[116,3],[119,1],[119,3],[119,3],[119,3],[119,3],[124,1],[124,3],[124,3],[127,1],[127,3],[129,1],[129,3],[131,1],[131,3],[133,1],[134,1],[134,3],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[135,1],[24,1]],
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
case 13: case 16: case 34: case 36: case 59: case 82: case 84: case 86:
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
        type: "ProcessBody",
        sentences: $$[$0]
      };
    
break;
case 35: case 37: case 75: case 98:
 this.$ = $$[$0-1]; 
break;
case 48:
 this.$ = { type: "DebugSentence" }; 
break;
case 49:

      this.$ = {
        type: "ExpressionSentence",
        expression: $$[$0-1]
      };
    
break;
case 50:
 this.$ = { type: "BreakSentence" }; 
break;
case 51:
 this.$ = { type: "ContinueSentence" }; 
break;
case 54:

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
case 55:

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
case 56:

      this.$ = {
        type: "SwitchSentence",
        discriminant: $$[$0-2],
        cases: $$[$0]
      };
    
break;
case 57: case 63: case 67: case 93:
 this.$ = [$$[$0]]; 
break;
case 58: case 64:
 $$[$0-1].push($$[$0]); 
break;
case 60:
 this.$ = [$$[$0-1]]; 
break;
case 62:
 $$[$0-2].push($$[$0-1]); 
break;
case 65:

      this.$ = {
        type: "SwitchCase",
        tests: $$[$0-2],
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 66:

      this.$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 68: case 94:
 $$[$0-2].push($$[$0]); 
break;
case 70:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 71:

      this.$ = {
        type: "WhileSentence",
        test: $$[$0-2],
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 72:

      this.$ = {
        type: "RepeatSentence",
        test: $$[$0].test,
        body: {
          type: "SentenceBlock",
          sentences: $$[$0].body
        }
      };
    
break;
case 73:

      this.$ = {
        test: $$[$0],
        body: []
      };
    
break;
case 74:

      this.$ = {
        test: $$[$0],
        body: $$[$0-1]
      };
    
break;
case 76:

      this.$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    
break;
case 77:

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
case 78:
 this.$ = null 
break;
case 79:
 this.$ = $$[$0]; 
break;
case 80:

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
case 81:

      this.$ = {
        inits: $$[$0-2],
        tests: $$[$0-1],
        updates: $$[$0]
      };
    
break;
case 88:

      this.$ = {
        type: "ReturnSentence",
        argument: null 
      };
    
break;
case 89:

      this.$ = {
        type: "ReturnSentence",
        argument: $$[$0-1]
      };
    
break;
case 90:

      this.$ = {
        type: "FrameSentence",
        argument: null
      };
    
break;
case 91:

      this.$ = {
        type: "FrameSentence",
        argument: $$[$0-1]
      };
    
break;
case 92:

      this.$ = {
        type: "CloneSentence",
        body: {
          type: "SentenceBlock",
          sentences: $$[$0]
        }
      };
    
break;
case 96:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
case 97:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 103:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: false
      };
    
break;
case 104:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-2],
        arguments: []
      };
    
break;
case 105:

      this.$ = {
        type: "CallExpression",
        callee: $$[$0-3],
        arguments: $$[$0-1]
      };
    
break;
case 107:

      this.$ = {
        type: "UpdateExpression",
        operator: $$[$0-1],
        argument: $$[$0],
        prefix: true
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
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,29]),{8:12,15:$V1},{9:[1,13]},o($V3,[2,4]),{1:[2,2]},o($V2,[2,30]),{9:[1,14]},o($V4,[2,6],{10:15,16:[1,16]}),{14:18,38:[1,17],39:$V5},o($V6,[2,8],{11:20,18:[1,21]}),o($V7,[2,13],{17:22}),{14:23,39:$V5},o($V2,[2,32]),{8:70,15:$V1,24:39,40:24,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vw,[2,10],{12:79,20:[1,80]}),o($Vx,$Vy,{19:81}),o($V4,[2,5],{22:82,8:83,15:$V1}),o($V2,[2,31]),o($V2,[2,33]),o($Vz,[2,34]),{8:70,15:$V1,24:39,41:$VA,45:85,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VB,[2,57]),o($VB,[2,38]),o($VB,[2,39]),o($VB,[2,40]),o($VB,[2,52],{50:86,9:[1,87]}),o($VB,[2,42]),o($VB,[2,43]),o($VB,[2,44]),{9:[1,88]},{9:[1,89]},o($VB,[2,47]),{9:[1,90]},{9:[1,91]},{9:[1,92]},{9:[1,93]},{61:[1,94]},{61:[1,95]},{61:[1,96]},{8:70,15:$V1,24:39,42:99,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,77:97,78:98,79:$VC,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:39,40:101,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:102,15:$V1},{61:[1,104],86:103},{9:[2,88],61:[1,105]},{9:[2,90],61:[1,106]},{8:70,15:$V1,24:39,40:107,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VD,[2,154]),o($VD,[2,141]),o($VE,$VF,{135:108,23:[1,109],136:[1,110],137:[1,111],138:[1,112],139:[1,113],140:[1,114],141:[1,115],142:[1,116],143:[1,117],144:[1,118],145:[1,119]}),o($VD,[2,140],{132:[1,120]}),o($VG,[2,106],{102:123,61:[1,124],98:[1,121],101:[1,122],105:$Vp,106:$Vq}),{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:125,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:126,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv},o($VH,[2,138],{130:$VI}),o($V3,[2,99]),o($V3,[2,101]),o($VJ,[2,109]),o($VJ,[2,110]),o($VK,[2,111]),o($VK,[2,112]),o($VK,[2,113]),o($VK,[2,114]),o($VK,[2,115]),o($VL,[2,136],{128:$VM}),o($V3,[2,95]),o($V3,[2,96]),o($V3,[2,97]),{8:70,15:$V1,24:129,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VN,[2,134],{125:$VO,126:$VP}),o($VQ,[2,131],{120:$VR,121:$VS,122:$VT,123:$VU}),o($VV,[2,126],{117:$VW,118:$VX}),o($VY,[2,123],{109:$VZ,110:$V_}),o($V$,[2,120],{108:$V01,113:$V11,114:$V21}),{13:143,21:[1,144],39:[2,12]},o([21,27,28,29,30,31,32,33,34,35,39],$Vy,{19:145}),o($V6,[2,7],{25:146,26:147,27:$V31,28:$V41,29:$V51,30:$V61,31:$V71,32:$V81,33:$V91,34:$Va1,35:$Vb1}),o($V7,[2,14]),{23:[1,157]},o($Vz,[2,35]),o($VB,[2,58]),o($VB,[2,41]),o($VB,[2,53]),o($VB,[2,45]),o($VB,[2,46]),o($VB,[2,48]),o($VB,[2,49]),o($VB,[2,50]),o($VB,[2,51]),{8:70,15:$V1,24:158,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:159,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:160,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vc1,[2,72]),o($Vc1,[2,73]),{8:70,15:$V1,24:39,45:85,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,78:161,79:$VC,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{61:[1,162]},o($VB,[2,76]),{23:[1,163]},{8:70,15:$V1,24:39,40:164,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,9:[1,166],15:$V1,24:168,61:$Vd,87:165,90:167,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:169,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:170,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VB,[2,92]),{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:171},o($VK,[2,143]),o($VK,[2,144]),o($VK,[2,145]),o($VK,[2,146]),o($VK,[2,147]),o($VK,[2,148]),o($VK,[2,149]),o($VK,[2,150]),o($VK,[2,151]),o($VK,[2,152]),o($VK,[2,153]),{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:172},{8:70,15:$V1,24:174,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:175,15:$V1},o($V3,[2,103]),{8:70,15:$V1,24:168,61:$Vd,62:[1,176],90:177,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VG,[2,107]),o($VG,[2,108]),{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:178},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:179},{62:[1,180]},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:181},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:182},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:183},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:184},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:185},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:186},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:187},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:188},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:189},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:173,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:190},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:191,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:192,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv},{8:70,15:$V1,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:193,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv},{14:194,39:$V5},o([27,28,29,30,31,32,33,34,35,39],$Vy,{19:195}),o($Vw,[2,9],{25:146,26:147,27:$V31,28:$V41,29:$V51,30:$V61,31:$V71,32:$V81,33:$V91,34:$Va1,35:$Vb1}),o($Vx,[2,17]),{8:196,15:$V1},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{8:70,15:$V1,24:197,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{62:[1,198]},{62:[1,199]},{62:[1,200]},o($Vc1,[2,74]),{8:70,15:$V1,24:201,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:202,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VB,[2,80]),{8:70,9:[1,204],15:$V1,24:168,61:$Vd,88:203,90:205,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vd1,[2,82]),{9:[1,206],73:$Ve1},o($Vf1,[2,93]),{62:[1,208]},{62:[1,209]},o($VD,[2,142]),o($VH,[2,139],{130:$VI}),o($VE,$VF),{99:[1,210]},o($V3,[2,102]),o($V3,[2,104]),{62:[1,211],73:$Ve1},o($VL,[2,137],{128:$VM}),o($VN,[2,135],{125:$VO,126:$VP}),o($V3,[2,98]),o($VQ,[2,132],{120:$VR,121:$VS,122:$VT,123:$VU}),o($VQ,[2,133],{120:$VR,121:$VS,122:$VT,123:$VU}),o($VV,[2,127],{117:$VW,118:$VX}),o($VV,[2,128],{117:$VW,118:$VX}),o($VV,[2,129],{117:$VW,118:$VX}),o($VV,[2,130],{117:$VW,118:$VX}),o($VY,[2,124],{109:$VZ,110:$V_}),o($VY,[2,125],{109:$VZ,110:$V_}),o($V$,[2,121],{108:$V01,113:$V11,114:$V21}),o($V$,[2,122],{108:$V01,113:$V11,114:$V21}),o($VE,[2,117]),o($VE,[2,118]),o($VE,[2,119]),o($V2,[2,3]),{25:146,26:147,27:$V31,28:$V41,29:$V51,30:$V61,31:$V71,32:$V81,33:$V91,34:$Va1,35:$Vb1,39:[2,11]},{9:[1,213],23:[1,212]},{9:[1,214]},{8:70,15:$V1,24:39,40:215,41:$V8,42:217,43:216,44:[1,218],45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{41:[1,220],64:219,65:221,66:222,67:224,68:$Vg1,71:$Vh1},{8:70,15:$V1,24:39,40:226,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{62:[1,227]},{82:[1,228]},{8:70,15:$V1,24:168,61:$Vd,62:[1,230],89:229,90:231,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vi1,[2,84]),{9:[1,232],73:$Ve1},o($Vd1,[2,83]),{8:70,15:$V1,24:233,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{9:[2,89]},{9:[2,91]},o($V3,[2,100]),o($V3,[2,105]),{8:70,15:$V1,24:234,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vx,[2,19]),o($V7,[2,15]),o($VB,[2,54]),{8:70,15:$V1,24:39,40:235,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:39,41:$VA,44:[1,236],45:85,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vj1,[2,36]),o($VB,[2,56]),o($VB,[2,59]),{41:[1,237]},{41:[1,238],65:239,67:240,68:$Vg1,71:$Vh1},{70:[1,241]},o($Vk1,[2,63]),{8:70,15:$V1,24:244,61:$Vd,69:242,72:243,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($VB,[2,71]),o($Vc1,[2,75]),{8:70,15:$V1,24:245,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vj1,[2,81]),o($Vj1,[2,86]),{62:[1,246],73:$Ve1},o($Vi1,[2,85]),o($Vf1,[2,94]),{9:[1,247]},o($VB,[2,55]),o($Vj1,[2,37]),o($VB,[2,60]),o($VB,[2,61]),{41:[1,248]},o($Vk1,[2,64]),{8:70,15:$V1,24:39,40:249,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{70:[1,250],73:[1,251]},o($Vl1,[2,67]),o($Vl1,[2,69],{74:[1,252]}),{9:[2,78],83:253,84:[1,254]},o($Vj1,[2,87]),o($Vx,[2,18]),o($VB,[2,62]),{41:[2,66]},{8:70,15:$V1,24:39,40:255,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:244,61:$Vd,72:256,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{8:70,15:$V1,24:257,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{9:[1,258]},{8:70,15:$V1,24:259,61:$Vd,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},o($Vk1,[2,65]),o($Vl1,[2,68]),o($Vl1,[2,70]),{8:70,15:$V1,24:39,40:260,41:$V8,42:26,45:27,46:28,47:29,48:30,49:31,51:32,52:33,53:34,54:35,55:36,56:37,57:$V9,58:$Va,59:$Vb,60:$Vc,61:$Vd,63:$Ve,75:$Vf,76:$Vg,80:$Vh,81:$Vi,85:$Vj,91:$Vk,92:$Vl,93:$Vm,94:60,95:$Vn,96:$Vo,97:56,100:61,102:57,103:54,104:58,105:$Vp,106:$Vq,107:$Vr,108:$Vs,109:$Vt,110:$Vu,111:$Vv,112:78,115:77,116:76,119:75,124:74,127:69,129:59,131:55,133:53,134:52},{9:[2,79]},o($VB,[2,77])],
defaultActions: {4:[2,1],10:[2,2],148:[2,20],149:[2,21],150:[2,22],151:[2,23],152:[2,24],153:[2,25],154:[2,26],155:[2,27],156:[2,28],208:[2,89],209:[2,91],249:[2,66],259:[2,79]},
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
case 1: return 60; 
break;
case 2: return 44; 
break;
case 3: return 63; 
break;
case 4: return 68; 
break;
case 5: return 71; 
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
case 15: return 58; 
break;
case 16: return 59; 
break;
case 17: return 91; 
break;
case 18: return 92; 
break;
case 19: return 93; 
break;
case 20: return 57; 
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
case 41: return 61; 
break;
case 42: return 62; 
break;
case 43: return 98; 
break;
case 44: return 99; 
break;
case 45: return 73; 
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
case 57: return 125; 
break;
case 58: return 123; 
break;
case 59: return '=>'; 
break;
case 60: return 122; 
break;
case 61: return 126; 
break;
case 62: return 126; 
break;
case 63: return 120; 
break;
case 64: return 121; 
break;
case 65: return 128; 
break;
case 66: return 128; 
break;
case 67: return 107; 
break;
case 68: return 132; 
break;
case 69: return 132; 
break;
case 70: return '^^'; 
break;
case 71: return '^^'; 
break;
case 72: return 130; 
break;
case 73: return 118; 
break;
case 74: return 117; 
break;
case 75: return 105; 
break;
case 76: return 106; 
break;
case 77: return 109; 
break;
case 78: return 110; 
break;
case 79: return 23; 
break;
case 80: return 113; 
break;
case 81: return 108; 
break;
case 82: return 114; 
break;
case 83: return 114; 
break;
case 84: return 111; 
break;
case 85: return 111; 
break;
case 86: return 107; 
break;
case 87: return 108; 
break;
case 88: return 74; 
break;
case 89: return 70; 
break;
case 90: return 101; 
break;
case 91: return 95; 
break;
case 92: return 96; 
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