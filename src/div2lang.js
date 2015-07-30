

define(function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,36],$V3=[18,19,20,38],$V4=[1,19],$V5=[19,20,38],$V6=[1,26],$V7=[1,27],$V8=[1,28],$V9=[1,29],$Va=[1,30],$Vb=[1,31],$Vc=[1,32],$Vd=[1,33],$Ve=[1,34],$Vf=[1,37],$Vg=[1,47],$Vh=[1,48],$Vi=[1,52],$Vj=[1,55],$Vk=[1,56],$Vl=[1,57],$Vm=[1,58],$Vn=[1,59],$Vo=[1,60],$Vp=[1,61],$Vq=[1,62],$Vr=[1,63],$Vs=[1,64],$Vt=[1,68],$Vu=[1,69],$Vv=[20,38],$Vw=[18,19,20,26,27,28,29,30,31,32,33,34,38],$Vx=[5,15,36,40,43,53,54,58,61,64,69,72,76,77,80,81,82,85,91,92,93,141,142],$Vy=[1,75],$Vz=[15,40,43,53,54,58,61,64,76,77,80,81,82,85,91,92,93,141,142],$VA=[2,52],$VB=[1,78],$VC=[1,92],$VD=[9,15,40,43,53,54,58,61,64,76,77,80,81,82,85,91,92,93,141,142],$VE=[9,24,63,71,74,75,83,84,98,99,100,101,102,103,104,105,106,107,110,111,112,113,114,115,118,119,120,121,122,123,126,127,130,131,134,135,136,141,142,143,144,145],$VF=[2,154],$VG=[1,104],$VH=[1,105],$VI=[9,15,63,71,74,75,83,84,110,111,112,113,114,115,118,119,120,121,122,123,126,127,130,131,134,135,136,145],$VJ=[1,140],$VK=[1,137],$VL=[1,135],$VM=[1,138],$VN=[1,136],$VO=[1,141],$VP=[1,142],$VQ=[9,63,74,83],$VR=[15,62,119,131,135,139,141,142,147,148],$VS=[1,166],$VT=[1,167],$VU=[1,168],$VV=[1,169],$VW=[1,170],$VX=[1,171],$VY=[9,63,71,74,75,83,84,110,111,112,113,114,115,145],$VZ=[1,173],$V_=[1,174],$V$=[1,175],$V01=[1,176],$V11=[1,177],$V21=[1,178],$V31=[9,63,71,74,75,83,84,110,111,112,113,114,115,118,119,120,121,122,123,145],$V41=[1,180],$V51=[1,181],$V61=[9,63,71,74,75,83,84,110,111,112,113,114,115,118,119,120,121,122,123,126,127,145],$V71=[1,183],$V81=[1,184],$V91=[9,63,71,74,75,83,84,110,111,112,113,114,115,118,119,120,121,122,123,126,127,130,131,145],$Va1=[1,186],$Vb1=[1,187],$Vc1=[1,188],$Vd1=[9,63,71,74,75,83,84,110,111,112,113,114,115,118,119,120,121,122,123,126,127,130,131,134,135,136,145],$Ve1=[9,15,62,119,131,135,139,141,142,147,148],$Vf1=[1,201],$Vg1=[9,63,74],$Vh1=[63,74],$Vi1=[1,224],$Vj1=[1,222],$Vk1=[15,63,141,142],$Vl1=[15,40,53,54,58,61,64,76,77,81,82,85,91,92,93,141,142],$Vm1=[40,69,72],$Vn1=[71,74];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"declaration_list":17,"GLOBAL":18,"LOCAL":19,"PRIVATE":20,"declaration":21,"variable_declaration":22,"type":23,"=":24,"expression":25,"INT_POINTER":26,"INT":27,"WORD_POINTER":28,"WORD":29,"BYTE_POINTER":30,"BYTE":31,"STRING_POINTER":32,"STRING":33,"STRUCT_POINTER":34,"process":35,"PROCESS":36,"private":37,"BEGIN":38,"group_of_sentences":39,"END":40,"sentence_list":41,"group_of_sentences_for_if_else":42,"ELSE":43,"sentence":44,"if_sentence":45,"switch_sentence":46,"while_sentence":47,"repeat_sentence":48,"opt_end":49,"loop_sentence":50,"from_sentence":51,"for_sentence":52,"BREAK":53,"CONTINUE":54,"return_sentence":55,"frame_sentence":56,"clone_sentence":57,"DEBUG":58,"call":59,"assignment_sentence":60,"IF":61,"(":62,")":63,"SWITCH":64,"group_of_cases":65,"default":66,"case_list":67,"case":68,"CASE":69,"list_of_ranges":70,":":71,"DEFAULT":72,"range":73,",":74,"..":75,"WHILE":76,"REPEAT":77,"group_of_sentences_for_repeat":78,"until_condition":79,"UNTIL":80,"LOOP":81,"FROM":82,"TO":83,"STEP":84,"FOR":85,"for_params":86,"initialization":87,"condition":88,"increment":89,"list_of_assignments":90,"RETURN":91,"FRAME":92,"CLONE":93,"expression_list":94,"access_expression":95,"assignment_operator":96,"increment_operator":97,"*=":98,"/=":99,"%=":100,"+=":101,"-=":102,"&=":103,"|=":104,"^=":105,"<<=":106,">>=":107,"boolean_expression":108,"comparison_operator":109,"==":110,"!=":111,">=":112,"<=":113,"<":114,">":115,"shift_expression":116,"boolean_operator":117,"&&":118,"&":119,"||":120,"|":121,"^^":122,"^":123,"additive_expression":124,"shift_operator":125,"<<":126,">>":127,"multiplicative_expression":128,"additive_operator":129,"+":130,"-":131,"unary_expression":132,"multiplicative_operator":133,"/":134,"*":135,"%":136,"postfix_expression":137,"unary_operator":138,"!":139,"primary_expression":140,"++":141,"--":142,".":143,"[":144,"]":145,"const":146,"NUMBER":147,"STRING_LITERAL":148,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",19:"LOCAL",20:"PRIVATE",24:"=",26:"INT_POINTER",27:"INT",28:"WORD_POINTER",29:"WORD",30:"BYTE_POINTER",31:"BYTE",32:"STRING_POINTER",33:"STRING",34:"STRUCT_POINTER",36:"PROCESS",37:"private",38:"BEGIN",40:"END",43:"ELSE",53:"BREAK",54:"CONTINUE",58:"DEBUG",61:"IF",62:"(",63:")",64:"SWITCH",69:"CASE",71:":",72:"DEFAULT",74:",",75:"..",76:"WHILE",77:"REPEAT",80:"UNTIL",81:"LOOP",82:"FROM",83:"TO",84:"STEP",85:"FOR",91:"RETURN",92:"FRAME",93:"CLONE",98:"*=",99:"/=",100:"%=",101:"+=",102:"-=",103:"&=",104:"|=",105:"^=",106:"<<=",107:">>=",110:"==",111:"!=",112:">=",113:"<=",114:"<",115:">",118:"&&",119:"&",120:"||",121:"|",122:"^^",123:"^",126:"<<",127:">>",130:"+",131:"-",134:"/",135:"*",136:"%",139:"!",141:"++",142:"--",143:".",144:"[",145:"]",147:"NUMBER",148:"STRING_LITERAL"},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,1],[13,0],[17,1],[17,2],[21,1],[22,5],[22,3],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[6,1],[6,2],[35,5],[35,4],[14,2],[39,1],[39,2],[42,1],[42,2],[44,1],[44,1],[44,1],[44,2],[44,1],[44,1],[44,1],[44,2],[44,2],[44,2],[44,2],[44,1],[44,2],[44,2],[44,2],[49,0],[49,1],[45,5],[45,6],[46,5],[41,1],[41,2],[65,1],[65,2],[65,2],[65,3],[67,1],[67,2],[68,4],[66,3],[70,1],[70,3],[73,1],[73,3],[47,5],[48,2],[78,1],[78,2],[79,4],[50,2],[51,6],[51,8],[52,3],[86,4],[87,1],[87,2],[88,1],[88,2],[89,1],[89,2],[90,1],[90,3],[55,1],[55,4],[56,1],[56,4],[57,2],[59,3],[59,4],[94,1],[94,3],[60,3],[60,2],[60,2],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[96,1],[25,1],[25,3],[109,1],[109,1],[109,1],[109,1],[109,1],[109,1],[108,1],[108,3],[117,1],[117,1],[117,1],[117,1],[117,1],[117,1],[116,1],[116,3],[125,1],[125,1],[124,1],[124,3],[129,1],[129,1],[128,1],[128,3],[133,1],[133,1],[133,1],[132,1],[132,2],[132,2],[138,1],[138,1],[138,1],[138,1],[137,1],[137,1],[137,2],[137,1],[97,1],[97,1],[95,1],[95,3],[95,4],[140,1],[140,3],[146,1],[146,1]],
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
case 6: case 8: case 10: case 13:
 this.$ = null; 
break;
case 11:

      this.$ = {
        type: "PrivateDeclarations",
        declarations: $$[$0]
      };
    
break;
case 12:

      this.$ = {
        type: "PrivateDeclarations",
        declarations: []
      };
    
break;
case 14: case 57: case 63: case 67:
 this.$ = [$$[$0]]; 
break;
case 15:
 this.$ = $$[$0-1].push($$[$0]); 
break;
case 17:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-4],
        varName: $$[$0-3],
        varInit: $$[$0-1]
      };
    
break;
case 18:

      this.$ = {
        type: "VariableDeclarator",
        varType: $$[$0-2],
        varName: $$[$0-1],
        varInit: null
      };
    
break;
case 19:
 this.$ = "int_pointer"; 
break;
case 20:
 this.$ = "int"; 
break;
case 21:
 this.$ = "word_pointer"; 
break;
case 22:
 this.$ = "word"; 
break;
case 23:
 this.$ = "byte_pointer"; 
break;
case 24:
 this.$ = "byte"; 
break;
case 25:
 this.$ = "string_pointer"; 
break;
case 26:
 this.$ = "string"; 
break;
case 27:
 this.$ = "struct_pointer"; 
break;
case 32:

      this.$ = {
        type: "SentenceBlock",
        sentences: $$[$0]
      };
    
break;
case 33: case 35: case 59:
 this.$ = []; 
break;
case 34: case 36:
 this.$ = $$[$0-1]; 
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
case 58:
 this.$ = $$[$0-1].push(sentence); 
break;
case 60:
 this.$ = [$$[$0-1]]; 
break;
case 62:
 $$[$0-2].push($$[$0-1]); 
break;
case 64:
 $$[$0-1].push($$[$0]); 
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
case 68:
 $$[$0-2].push($$[$0]); 
break;
case 70:

      this.$ = {
        type: "Range",
        min: $$[$0-2],
        max: $$[$0]
      };
    
break;
case 94:
 this.$ = $$[$0-2] + '()'; 
break;
case 95:
 this.$ = $$[$0-3] + '(' + $$[$0-1] + ')'; 
break;
case 98:

      this.$ = {
        type: "AssignmentSentence",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
case 99:

      this.$ = {
        type: "UpdateSentence",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: false
      };
    
break;
case 100:

      this.$ = {
        type: "UpdateSentence",
        operator: $$[$0],
        argument: $$[$0-1],
        prefix: true
      };
    
break;
case 159:

      this.$ = {
        type: "Literal",
        value: parseInt($$[$0]),
        raw: $$[$0]
      };
    
break;
case 160:

      this.$ = {
        type: "Literal",
        value: JSON.parse($$[$0]),
        raw: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,35:6,36:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],35:11,36:$V0},o($V2,[2,28]),{8:12,15:$V1},{9:[1,13]},o([9,24,62,63,71,74,75,83,84,98,99,100,101,102,103,104,105,106,107,110,111,112,113,114,115,118,119,120,121,122,123,126,127,130,131,134,135,136,141,142,143,144,145],[2,4]),{1:[2,2]},o($V2,[2,29]),{9:[1,14]},o($V3,[2,6],{10:15,16:[1,16]}),{14:18,37:[1,17],38:$V4},o($V5,[2,8],{11:20,18:[1,21]}),{17:22,21:23,22:24,23:25,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve},{14:35,38:$V4},o($V2,[2,31]),{8:65,15:$V1,39:36,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},o($Vv,[2,10],{12:70,19:[1,71]}),{17:72,21:23,22:24,23:25,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve},o($V3,[2,5],{22:24,23:25,21:73,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve}),o($Vw,[2,14]),o($Vw,[2,16]),{8:74,15:$V1},{15:[2,19]},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},o($V2,[2,30]),o($V2,[2,32]),o($Vx,[2,33]),{8:65,15:$V1,40:$Vy,44:76,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},o($Vz,[2,57]),o($Vz,[2,37]),o($Vz,[2,38]),o($Vz,[2,39]),o($Vz,$VA,{49:77,9:$VB}),o($Vz,[2,41]),o($Vz,[2,42]),o($Vz,[2,43]),o($Vz,$VA,{49:79,9:$VB}),o($Vz,$VA,{49:80,9:$VB}),o($Vz,$VA,{49:81,9:$VB}),o($Vz,$VA,{49:82,9:$VB}),o($Vz,[2,48]),o($Vz,$VA,{49:83,9:$VB}),{9:[1,84]},{9:[1,85]},{62:[1,86]},{62:[1,87]},{62:[1,88]},{8:65,15:$V1,41:91,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,78:89,79:90,80:$VC,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,39:93,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:95,15:$V1,60:94,95:66,97:67,141:$Vt,142:$Vu},{62:[1,97],86:96},o($VD,[2,89],{62:[1,98]}),o($VD,[2,91],{62:[1,99]}),{8:65,15:$V1,39:100,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},o($VE,$VF,{62:[1,101]}),{24:[1,106],96:102,97:103,98:[1,107],99:[1,108],100:[1,109],101:[1,110],102:[1,111],103:[1,112],104:[1,113],105:[1,114],106:[1,115],107:[1,116],141:$Vt,142:$Vu,143:$VG,144:$VH},{8:95,15:$V1,95:117},o($VI,[2,152]),o($VI,[2,153]),{13:118,20:[1,119],38:[2,13]},{17:120,21:23,22:24,23:25,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve},o($V5,[2,7],{22:24,23:25,21:73,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve}),o($Vw,[2,15]),{9:[1,122],24:[1,121]},o($Vx,[2,34]),o($Vz,[2,58]),o($Vz,[2,40]),o($Vz,[2,53]),o($Vz,[2,44]),o($Vz,[2,45]),o($Vz,[2,46]),o($Vz,[2,47]),o($Vz,[2,49]),o($Vz,[2,50]),o($Vz,[2,51]),{8:65,15:$V1,25:123,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:143,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:144,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VD,[2,72]),o($VD,[2,73]),{8:65,15:$V1,44:76,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,79:145,80:$VC,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{62:[1,146]},o($Vz,[2,76]),{83:[1,147]},o($VE,$VF),{8:65,15:$V1,39:148,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:95,9:[1,150],15:$V1,60:152,87:149,90:151,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,25:153,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:154,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vz,[2,93]),{8:65,15:$V1,25:157,59:134,62:$VJ,63:[1,155],94:156,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:158,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VQ,[2,99]),{8:159,15:$V1},{8:65,15:$V1,25:160,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,101]),o($VR,[2,102]),o($VR,[2,103]),o($VR,[2,104]),o($VR,[2,105]),o($VR,[2,106]),o($VR,[2,107]),o($VR,[2,108]),o($VR,[2,109]),o($VR,[2,110]),o($VR,[2,111]),o($VQ,[2,100],{143:$VG,144:$VH}),{14:161,38:$V4},{17:162,21:23,22:24,23:25,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve,38:[2,12]},o($Vv,[2,9],{22:24,23:25,21:73,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve}),{8:65,15:$V1,25:163,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vw,[2,18]),{63:[1,164],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},o($VY,[2,112],{117:172,118:$VZ,119:$V_,120:$V$,121:$V01,122:$V11,123:$V21}),o($V31,[2,120],{125:179,126:$V41,127:$V51}),o($V61,[2,128],{129:182,130:$V71,131:$V81}),o($V91,[2,132],{133:185,134:$Va1,135:$Vb1,136:$Vc1}),o($Vd1,[2,136]),o($Vd1,[2,141]),{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,119:$VK,131:$VL,132:189,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:95,15:$V1,95:190},o($Vd1,[2,148],{97:191,141:$Vt,142:$Vu,143:$VG,144:$VH}),o($Vd1,[2,149]),o($Vd1,[2,151]),o($VR,[2,144]),o($VR,[2,145]),o($VR,[2,146]),o($VR,[2,147]),o($Vd1,[2,157]),{8:65,15:$V1,25:192,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vd1,[2,159]),o($Vd1,[2,160]),{63:[1,193],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{63:[1,194],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},o($VD,[2,74]),{8:65,15:$V1,25:195,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:196,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vz,[2,79]),{8:65,9:[1,198],15:$V1,25:199,59:134,62:$VJ,88:197,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Ve1,[2,81]),{9:[1,200],74:$Vf1},o($Vg1,[2,87]),{63:[1,202],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{63:[1,203],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},o($Vd1,[2,94]),{63:[1,204],74:[1,205]},o($Vh1,[2,96],{109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX}),o($VQ,[2,98],{109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX}),o($VE,[2,155]),{109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX,145:[1,206]},o($V2,[2,3]),{21:73,22:24,23:25,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va,31:$Vb,32:$Vc,33:$Vd,34:$Ve,38:[2,11]},{9:[1,207],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{8:65,15:$V1,39:208,40:$Vf,41:210,42:209,43:[1,211],44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,108:212,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,114]),o($VR,[2,115]),o($VR,[2,116]),o($VR,[2,117]),o($VR,[2,118]),o($VR,[2,119]),{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,116:213,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,122]),o($VR,[2,123]),o($VR,[2,124]),o($VR,[2,125]),o($VR,[2,126]),o($VR,[2,127]),{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,119:$VK,124:214,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,130]),o($VR,[2,131]),{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,119:$VK,128:215,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,134]),o($VR,[2,135]),{8:65,15:$V1,59:134,62:$VJ,95:132,97:131,119:$VK,131:$VL,132:216,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VR,[2,138]),o($VR,[2,139]),o($VR,[2,140]),o($Vd1,[2,142]),o($Vd1,[2,143],{143:$VG,144:$VH}),o($Vd1,[2,150]),{63:[1,217],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{40:[1,219],65:218,66:220,67:221,68:223,69:$Vi1,72:$Vj1},{8:65,15:$V1,39:225,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{63:[1,226],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{9:[1,227],84:[1,228],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},{8:95,15:$V1,60:152,63:[1,230],89:229,90:231,95:66,97:67,141:$Vt,142:$Vu},o($Vk1,[2,83]),{9:[1,232],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},o($Ve1,[2,82]),{8:95,15:$V1,60:233,95:66,97:67,141:$Vt,142:$Vu},o($VD,[2,90]),o($VD,[2,92]),o($Vd1,[2,95]),{8:65,15:$V1,25:234,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($VE,[2,156]),o($Vw,[2,17]),o($Vz,[2,54]),{8:65,15:$V1,39:235,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,40:$Vy,43:[1,236],44:76,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},o($Vl1,[2,35]),o($VY,[2,113],{117:172,118:$VZ,119:$V_,120:$V$,121:$V01,122:$V11,123:$V21}),o($V31,[2,121],{125:179,126:$V41,127:$V51}),o($V61,[2,129],{129:182,130:$V71,131:$V81}),o($V91,[2,133],{133:185,134:$Va1,135:$Vb1,136:$Vc1}),o($Vd1,[2,137]),o($Vd1,[2,158]),o($Vz,[2,56]),o($Vz,[2,59]),{40:[1,237]},{40:[1,238],66:239,68:240,69:$Vi1,72:$Vj1},{71:[1,241]},o($Vm1,[2,63]),{8:65,15:$V1,25:244,59:134,62:$VJ,70:242,73:243,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vz,[2,71]),o($VD,[2,75]),{8:65,15:$V1,39:245,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,25:246,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},o($Vl1,[2,80]),o($Vl1,[2,85]),{63:[1,247],74:$Vf1},o($Vk1,[2,84]),o($Vg1,[2,88]),o($Vh1,[2,97],{109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX}),o($Vz,[2,55]),o($Vl1,[2,36]),o($Vz,[2,60]),o($Vz,[2,61]),{40:[1,248]},o($Vm1,[2,64]),{8:65,15:$V1,39:249,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{71:[1,250],74:[1,251]},o($Vn1,[2,67]),o($Vn1,[2,69],{109:165,75:[1,252],110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX}),o($Vz,[2,77]),{9:[1,253],109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX},o($Vl1,[2,86]),o($Vz,[2,62]),{40:[2,66]},{8:65,15:$V1,39:254,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},{8:65,15:$V1,25:244,59:134,62:$VJ,73:255,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,25:256,59:134,62:$VJ,95:132,97:131,108:124,116:125,119:$VK,124:126,128:127,131:$VL,132:128,135:$VM,137:129,138:130,139:$VN,140:133,141:$Vt,142:$Vu,146:139,147:$VO,148:$VP},{8:65,15:$V1,39:257,40:$Vf,41:38,44:39,45:40,46:41,47:42,48:43,50:44,51:45,52:46,53:$Vg,54:$Vh,55:49,56:50,57:51,58:$Vi,59:53,60:54,61:$Vj,64:$Vk,76:$Vl,77:$Vm,81:$Vn,82:$Vo,85:$Vp,91:$Vq,92:$Vr,93:$Vs,95:66,97:67,141:$Vt,142:$Vu},o($Vm1,[2,65]),o($Vn1,[2,68]),o($Vn1,[2,70],{109:165,110:$VS,111:$VT,112:$VU,113:$VV,114:$VW,115:$VX}),o($Vz,[2,78])],
defaultActions: {4:[2,1],10:[2,2],26:[2,19],27:[2,20],28:[2,21],29:[2,22],30:[2,23],31:[2,24],32:[2,25],33:[2,26],34:[2,27],249:[2,66]},
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
case 1: return 61; 
break;
case 2: return 43; 
break;
case 3: return 64; 
break;
case 4: return 69; 
break;
case 5: return 72; 
break;
case 6: return 81; 
break;
case 7: return 82; 
break;
case 8: return 77; 
break;
case 9: return 80; 
break;
case 10: return 76; 
break;
case 11: return 82; 
break;
case 12: return 83; 
break;
case 13: return 84; 
break;
case 14: return 85; 
break;
case 15: return 53; 
break;
case 16: return 54; 
break;
case 17: return 91; 
break;
case 18: return 92; 
break;
case 19: return 93; 
break;
case 20: return 58; 
break;
case 21: return 92; 
break;
case 22: return 7; 
break;
case 23: return 16; 
break;
case 24: return 18; 
break;
case 25: return 19; 
break;
case 26: return 20; 
break;
case 27: return 36; 
break;
case 28: return 'FUNCTION'; 
break;
case 29: return 38; 
break;
case 30: return 40; 
break;
case 31: return 26; 
break;
case 32: return 27; 
break;
case 33: return 28; 
break;
case 34: return 29; 
break;
case 35: return 30; 
break;
case 36: return 31; 
break;
case 37: return 32; 
break;
case 38: return 33; 
break;
case 39: return 34; 
break;
case 40: return 9; 
break;
case 41: return 62; 
break;
case 42: return 63; 
break;
case 43: return 144; 
break;
case 44: return 145; 
break;
case 45: return 74; 
break;
case 46: return 24; 
break;
case 47: return 101; 
break;
case 48: return 102; 
break;
case 49: return 99; 
break;
case 50: return 98; 
break;
case 51: return 100; 
break;
case 52: return 103; 
break;
case 53: return 104; 
break;
case 54: return 105; 
break;
case 55: return 106; 
break;
case 56: return 107; 
break;
case 57: return 110; 
break;
case 58: return 112; 
break;
case 59: return '=>'; 
break;
case 60: return 113; 
break;
case 61: return 111; 
break;
case 62: return 111; 
break;
case 63: return 114; 
break;
case 64: return 115; 
break;
case 65: return 118; 
break;
case 66: return 118; 
break;
case 67: return 119; 
break;
case 68: return 120; 
break;
case 69: return 120; 
break;
case 70: return 122; 
break;
case 71: return 122; 
break;
case 72: return 123; 
break;
case 73: return 127; 
break;
case 74: return 126; 
break;
case 75: return 141; 
break;
case 76: return 142; 
break;
case 77: return 130; 
break;
case 78: return 131; 
break;
case 79: return 24; 
break;
case 80: return 134; 
break;
case 81: return 135; 
break;
case 82: return 136; 
break;
case 83: return 136; 
break;
case 84: return 139; 
break;
case 85: return 139; 
break;
case 86: return 119; 
break;
case 87: return 135; 
break;
case 88: return 75; 
break;
case 89: return 71; 
break;
case 90: return 143; 
break;
case 91: return 148; 
break;
case 92: return 147; 
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