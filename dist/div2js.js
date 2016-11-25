(function (root, factory) {
    var old_div2js, lib_div2js;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        old_div2js = root.div2js;
        lib_div2js = factory();
        root.div2js = lib_div2js;
        root.div2js.restore = function () {
          root.div2js = old_div2js;
          return lib_div2js;
        };
    }
}(this, function () {
'use strict';

var objects = {};

function define(name, dependencies, factory) {
  var args = gatherDependencies(dependencies);
  var newObject = factory.apply(void 0, args);
  objects[normalize(name)] = newObject;
}

function gatherDependencies(dependencies) {
  return dependencies.map(function (dependencyName) {
    return objects[normalize(dependencyName)];
  });
}

function normalize(name) {
  if (name.indexOf('./') === 0) {
    return name.substring(2);
  }
  return name;
}




define('div2lang',['require'],function(require){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[5,37],$V3=[9,23,60,61,69,72,73,81,83,97,98,100,104,105,107,108,109,112,113,116,117,119,120,121,122,124,125,127,129,131,135,136,137,138,139,140,141,142,143,144],$V4=[18,20,21,38],$V5=[1,18],$V6=[2,12],$V7=[20,21,38],$V8=[15,18,20,21,38],$V9=[1,23],$Va=[2,16],$Vb=[21,38],$Vc=[20,21,27,28,29,30,31,32,33,34,35,38],$Vd=[1,31],$Ve=[1,44],$Vf=[1,46],$Vg=[1,47],$Vh=[1,48],$Vi=[1,79],$Vj=[1,49],$Vk=[1,50],$Vl=[1,51],$Vm=[1,52],$Vn=[1,53],$Vo=[1,54],$Vp=[1,55],$Vq=[1,56],$Vr=[1,57],$Vs=[1,77],$Vt=[1,78],$Vu=[1,68],$Vv=[1,69],$Vw=[1,70],$Vx=[1,71],$Vy=[1,72],$Vz=[1,73],$VA=[1,74],$VB=[1,87],$VC=[1,88],$VD=[1,89],$VE=[1,90],$VF=[1,91],$VG=[1,92],$VH=[1,93],$VI=[1,94],$VJ=[1,95],$VK=[5,15,37,40,43,56,57,58,59,60,62,67,70,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$VL=[1,99],$VM=[15,40,43,56,57,58,59,60,62,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$VN=[1,115],$VO=[9,61,69,72,73,81,83,98],$VP=[9,61,69,72,73,81,83,98,107,108,109,112,113,116,117,119,120,121,122,124,125,127,129,131],$VQ=[2,115],$VR=[9,23,61,69,72,73,81,83,98,107,108,109,112,113,116,117,119,120,121,122,124,125,127,129,131,135,136,137,138,139,140,141,142,143,144],$VS=[9,61,69,72,73,81,83,98,131],$VT=[1,142],$VU=[9,15,23,60,61,69,72,73,81,83,94,95,97,98,100,104,105,106,107,108,109,110,112,113,116,117,119,120,121,122,124,125,127,129,131,135,136,137,138,139,140,141,142,143,144],$VV=[15,60,94,95,104,105,106,107,108,109,110],$VW=[9,61,69,72,73,81,83,98,129,131],$VX=[1,143],$VY=[9,61,69,72,73,81,83,98,127,129,131],$VZ=[1,145],$V_=[1,146],$V$=[9,61,69,72,73,81,83,98,124,125,127,129,131],$V01=[1,147],$V11=[1,148],$V21=[1,149],$V31=[1,150],$V41=[9,61,69,72,73,81,83,98,119,120,121,122,124,125,127,129,131],$V51=[1,151],$V61=[1,152],$V71=[9,61,69,72,73,81,83,98,116,117,119,120,121,122,124,125,127,129,131],$V81=[1,153],$V91=[1,154],$Va1=[9,61,69,72,73,81,83,98,108,109,116,117,119,120,121,122,124,125,127,129,131],$Vb1=[1,155],$Vc1=[1,156],$Vd1=[1,157],$Ve1=[9,15,40,43,56,57,58,59,60,62,74,75,78,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$Vf1=[9,15,60,94,95,104,105,106,107,108,109,110],$Vg1=[1,209],$Vh1=[9,61,72],$Vi1=[1,225],$Vj1=[1,223],$Vk1=[15,60,61,94,95,104,105,106,107,108,109,110],$Vl1=[15,40,56,57,58,59,60,62,74,75,79,80,84,90,91,92,94,95,104,105,106,107,108,109,110],$Vm1=[40,67,70],$Vn1=[69,72];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"translation_unit":3,"program":4,"EOF":5,"process_list":6,"PROGRAM":7,"id":8,";":9,"const_block":10,"global_block":11,"local_block":12,"private_block":13,"body":14,"NAME":15,"CONST":16,"const_declaration_list":17,"GLOBAL":18,"declaration_list":19,"LOCAL":20,"PRIVATE":21,"const_declaration":22,"=":23,"expression":24,"declaration":25,"type":26,"INT_POINTER":27,"INT":28,"WORD_POINTER":29,"WORD":30,"BYTE_POINTER":31,"BYTE":32,"STRING_POINTER":33,"STRING":34,"STRUCT_POINTER":35,"process":36,"PROCESS":37,"BEGIN":38,"group_of_sentences":39,"END":40,"sentence_list":41,"group_of_sentences_for_if_else":42,"ELSE":43,"sentence":44,"if_sentence":45,"switch_sentence":46,"while_sentence":47,"repeat_sentence":48,"opt_end":49,"loop_sentence":50,"from_sentence":51,"for_sentence":52,"return_sentence":53,"frame_sentence":54,"clone_sentence":55,"DEBUG":56,"BREAK":57,"CONTINUE":58,"IF":59,"(":60,")":61,"SWITCH":62,"group_of_cases":63,"default":64,"case_list":65,"case":66,"CASE":67,"list_of_ranges":68,":":69,"DEFAULT":70,"range":71,",":72,"..":73,"WHILE":74,"REPEAT":75,"group_of_sentences_for_repeat":76,"until_condition":77,"UNTIL":78,"LOOP":79,"FROM":80,"TO":81,"step":82,"STEP":83,"FOR":84,"for_params":85,"initialization":86,"condition":87,"increment":88,"expression_list":89,"RETURN":90,"FRAME":91,"CLONE":92,"primary_expression":93,"STRING_LITERAL":94,"NUMBER":95,"postfix_expression":96,"[":97,"]":98,"call_expression":99,".":100,"update_operator":101,"unary_expression":102,"unary_operator":103,"++":104,"--":105,"&":106,"*":107,"+":108,"-":109,"!":110,"multiplicative_expression":111,"/":112,"%":113,"additive_expression":114,"shift_expression":115,"<<":116,">>":117,"relational_expression":118,"<":119,">":120,"<=":121,">=":122,"equality_expression":123,"==":124,"!=":125,"and_expression":126,"&&":127,"exclusive_or_expression":128,"^":129,"inclusive_or_expression":130,"||":131,"conditional_expression":132,"assignment_expression":133,"assignment_operator":134,"*=":135,"/=":136,"%=":137,"+=":138,"-=":139,"<<=":140,">>=":141,"&=":142,"^=":143,"|=":144,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PROGRAM",9:";",15:"NAME",16:"CONST",18:"GLOBAL",20:"LOCAL",21:"PRIVATE",23:"=",27:"INT_POINTER",28:"INT",29:"WORD_POINTER",30:"WORD",31:"BYTE_POINTER",32:"BYTE",33:"STRING_POINTER",34:"STRING",35:"STRUCT_POINTER",37:"PROCESS",38:"BEGIN",40:"END",43:"ELSE",56:"DEBUG",57:"BREAK",58:"CONTINUE",59:"IF",60:"(",61:")",62:"SWITCH",67:"CASE",69:":",70:"DEFAULT",72:",",73:"..",74:"WHILE",75:"REPEAT",78:"UNTIL",79:"LOOP",80:"FROM",81:"TO",83:"STEP",84:"FOR",90:"RETURN",91:"FRAME",92:"CLONE",94:"STRING_LITERAL",95:"NUMBER",97:"[",98:"]",100:".",104:"++",105:"--",106:"&",107:"*",108:"+",109:"-",110:"!",112:"/",113:"%",116:"<<",117:">>",119:"<",120:">",121:"<=",122:">=",124:"==",125:"!=",127:"&&",129:"^",131:"||",135:"*=",136:"/=",137:"%=",138:"+=",139:"-=",140:"<<=",141:">>=",142:"&=",143:"^=",144:"|="},
productions_: [0,[3,2],[3,3],[4,8],[8,1],[10,2],[10,0],[11,2],[11,0],[12,2],[12,0],[13,2],[13,0],[17,0],[17,2],[22,4],[19,0],[19,2],[25,5],[25,3],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[6,1],[6,2],[36,5],[14,2],[39,1],[39,2],[42,1],[42,2],[44,1],[44,1],[44,1],[44,2],[44,1],[44,1],[44,1],[44,2],[44,2],[44,1],[44,2],[44,2],[44,2],[44,2],[49,0],[49,1],[45,5],[45,6],[46,5],[41,1],[41,2],[63,1],[63,2],[63,2],[63,3],[65,1],[65,2],[66,4],[64,3],[68,1],[68,3],[71,1],[71,3],[47,5],[48,2],[76,1],[76,2],[77,4],[50,2],[51,9],[82,0],[82,2],[52,3],[85,4],[86,1],[86,2],[87,1],[87,2],[88,1],[88,2],[53,1],[53,4],[54,1],[54,4],[55,2],[89,1],[89,3],[93,1],[93,1],[93,1],[93,3],[96,1],[96,4],[96,1],[96,3],[96,2],[99,3],[99,4],[102,1],[102,2],[102,2],[101,1],[101,1],[103,1],[103,1],[103,1],[103,1],[103,1],[111,1],[111,3],[111,3],[111,3],[114,1],[114,3],[114,3],[115,1],[115,3],[115,3],[118,1],[118,3],[118,3],[118,3],[118,3],[123,1],[123,3],[123,3],[126,1],[126,3],[128,1],[128,3],[130,1],[130,3],[132,1],[133,1],[133,3],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[134,1],[24,1]],
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
case 29:

      this.$ = [$$[$0]];
    
break;
case 30:

      this.$ = $$[$0-1].push($$[$0]);
    
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
case 56: case 62: case 66: case 92:
 this.$ = [$$[$0]]; 
break;
case 57: case 63:
 $$[$0-1].push($$[$0]); 
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
case 141:

      this.$ = {
        type: "AssignmentExpression",
        operator: $$[$0-1],
        left: $$[$0-2],
        right: $$[$0]
      };
    
break;
}
},
table: [{3:1,4:2,7:[1,3]},{1:[3]},{5:[1,4],6:5,36:6,37:$V0},{8:8,15:$V1},{1:[2,1]},{5:[1,10],36:11,37:$V0},o($V2,[2,29]),{8:12,15:$V1},{9:[1,13]},o($V3,[2,4]),{1:[2,2]},o($V2,[2,30]),{9:[1,14]},o($V4,[2,6],{10:15,16:[1,16]}),{13:17,21:$V5,38:$V6},o($V7,[2,8],{11:19,18:[1,20]}),o($V8,[2,13],{17:21}),{14:22,38:$V9},o([27,28,29,30,31,32,33,34,35,38],$Va,{19:24}),o($Vb,[2,10],{12:25,20:[1,26]}),o($Vc,$Va,{19:27}),o($V4,[2,5],{22:28,8:29,15:$V1}),o($V2,[2,31]),{8:76,15:$V1,24:45,39:30,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{25:85,26:86,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ,38:[2,11]},{13:96,21:$V5,38:$V6},o([21,27,28,29,30,31,32,33,34,35,38],$Va,{19:97}),o($V7,[2,7],{25:85,26:86,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ}),o($V8,[2,14]),{23:[1,98]},o($V2,[2,32]),o($VK,[2,33]),{8:76,15:$V1,24:45,40:$VL,44:100,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VM,[2,56]),o($VM,[2,37]),o($VM,[2,38]),o($VM,[2,39]),o($VM,[2,51],{49:101,9:[1,102]}),o($VM,[2,41]),o($VM,[2,42]),o($VM,[2,43]),{9:[1,103]},{9:[1,104]},o($VM,[2,46]),{9:[1,105]},{9:[1,106]},{9:[1,107]},{9:[1,108]},{60:[1,109]},{60:[1,110]},{60:[1,111]},{8:76,15:$V1,24:45,41:114,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,76:112,77:113,78:$VN,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:45,39:116,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:117,15:$V1},{60:[1,119],85:118},{9:[2,87],60:[1,120]},{9:[2,89],60:[1,121]},{8:76,15:$V1,24:45,39:122,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VO,[2,153]),o($VO,[2,140]),o($VP,$VQ,{134:123,23:[1,124],135:[1,125],136:[1,126],137:[1,127],138:[1,128],139:[1,129],140:[1,130],141:[1,131],142:[1,132],143:[1,133],144:[1,134]}),o($VO,[2,139],{131:[1,135]}),o($VR,[2,105],{101:138,60:[1,139],97:[1,136],100:[1,137],104:$Vu,105:$Vv}),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:140,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:141,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},o($VS,[2,137],{129:$VT}),o($V3,[2,98]),o($V3,[2,100]),o($VU,[2,108]),o($VU,[2,109]),o($VV,[2,110]),o($VV,[2,111]),o($VV,[2,112]),o($VV,[2,113]),o($VV,[2,114]),o($VW,[2,135],{127:$VX}),o($V3,[2,94]),o($V3,[2,95]),o($V3,[2,96]),{8:76,15:$V1,24:144,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VY,[2,133],{124:$VZ,125:$V_}),o($V$,[2,130],{119:$V01,120:$V11,121:$V21,122:$V31}),o($V41,[2,125],{116:$V51,117:$V61}),o($V71,[2,122],{108:$V81,109:$V91}),o($Va1,[2,119],{107:$Vb1,112:$Vc1,113:$Vd1}),o($Vc,[2,17]),{8:158,15:$V1},{15:[2,20]},{15:[2,21]},{15:[2,22]},{15:[2,23]},{15:[2,24]},{15:[2,25]},{15:[2,26]},{15:[2,27]},{15:[2,28]},{14:159,38:$V9},o($Vb,[2,9],{25:85,26:86,27:$VB,28:$VC,29:$VD,30:$VE,31:$VF,32:$VG,33:$VH,34:$VI,35:$VJ}),{8:76,15:$V1,24:160,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VK,[2,34]),o($VM,[2,57]),o($VM,[2,40]),o($VM,[2,52]),o($VM,[2,44]),o($VM,[2,45]),o($VM,[2,47]),o($VM,[2,48]),o($VM,[2,49]),o($VM,[2,50]),{8:76,15:$V1,24:161,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:162,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:163,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Ve1,[2,71]),o($Ve1,[2,72]),{8:76,15:$V1,24:45,44:100,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,77:164,78:$VN,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{60:[1,165]},o($VM,[2,75]),{23:[1,166]},{8:76,15:$V1,24:45,39:167,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,9:[1,169],15:$V1,24:171,60:$Vi,86:168,89:170,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:172,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:173,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VM,[2,91]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:174},o($VV,[2,142]),o($VV,[2,143]),o($VV,[2,144]),o($VV,[2,145]),o($VV,[2,146]),o($VV,[2,147]),o($VV,[2,148]),o($VV,[2,149]),o($VV,[2,150]),o($VV,[2,151]),o($VV,[2,152]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:175},{8:76,15:$V1,24:177,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:178,15:$V1},o($V3,[2,102]),{8:76,15:$V1,24:171,60:$Vi,61:[1,179],89:180,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VR,[2,106]),o($VR,[2,107]),{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:181},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:182},{61:[1,183]},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:184},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:185},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:186},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:187},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:188},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:189},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:190},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:191},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:192},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:176,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:193},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:194,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:195,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},{8:76,15:$V1,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:196,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA},{9:[1,198],23:[1,197]},o($V2,[2,3]),{9:[1,199]},{61:[1,200]},{61:[1,201]},{61:[1,202]},o($Ve1,[2,73]),{8:76,15:$V1,24:203,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:204,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VM,[2,79]),{8:76,9:[1,206],15:$V1,24:171,60:$Vi,87:205,89:207,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vf1,[2,81]),{9:[1,208],72:$Vg1},o($Vh1,[2,92]),{61:[1,210]},{61:[1,211]},o($VO,[2,141]),o($VS,[2,138],{129:$VT}),o($VP,$VQ),{98:[1,212]},o($V3,[2,101]),o($V3,[2,103]),{61:[1,213],72:$Vg1},o($VW,[2,136],{127:$VX}),o($VY,[2,134],{124:$VZ,125:$V_}),o($V3,[2,97]),o($V$,[2,131],{119:$V01,120:$V11,121:$V21,122:$V31}),o($V$,[2,132],{119:$V01,120:$V11,121:$V21,122:$V31}),o($V41,[2,126],{116:$V51,117:$V61}),o($V41,[2,127],{116:$V51,117:$V61}),o($V41,[2,128],{116:$V51,117:$V61}),o($V41,[2,129],{116:$V51,117:$V61}),o($V71,[2,123],{108:$V81,109:$V91}),o($V71,[2,124],{108:$V81,109:$V91}),o($Va1,[2,120],{107:$Vb1,112:$Vc1,113:$Vd1}),o($Va1,[2,121],{107:$Vb1,112:$Vc1,113:$Vd1}),o($VP,[2,116]),o($VP,[2,117]),o($VP,[2,118]),{8:76,15:$V1,24:214,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vc,[2,19]),o($V8,[2,15]),{8:76,15:$V1,24:45,39:215,40:$Vd,41:217,42:216,43:[1,218],44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{40:[1,220],63:219,64:221,65:222,66:224,67:$Vi1,70:$Vj1},{8:76,15:$V1,24:45,39:226,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{61:[1,227]},{81:[1,228]},{8:76,15:$V1,24:171,60:$Vi,61:[1,230],88:229,89:231,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vk1,[2,83]),{9:[1,232],72:$Vg1},o($Vf1,[2,82]),{8:76,15:$V1,24:233,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{9:[2,88]},{9:[2,90]},o($V3,[2,99]),o($V3,[2,104]),{9:[1,234]},o($VM,[2,53]),{8:76,15:$V1,24:45,39:235,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:45,40:$VL,43:[1,236],44:100,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vl1,[2,35]),o($VM,[2,55]),o($VM,[2,58]),{40:[1,237]},{40:[1,238],64:239,66:240,67:$Vi1,70:$Vj1},{69:[1,241]},o($Vm1,[2,62]),{8:76,15:$V1,24:244,60:$Vi,68:242,71:243,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($VM,[2,70]),o($Ve1,[2,74]),{8:76,15:$V1,24:245,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vl1,[2,80]),o($Vl1,[2,85]),{61:[1,246],72:$Vg1},o($Vk1,[2,84]),o($Vh1,[2,93]),o($Vc,[2,18]),o($VM,[2,54]),o($Vl1,[2,36]),o($VM,[2,59]),o($VM,[2,60]),{40:[1,247]},o($Vm1,[2,63]),{8:76,15:$V1,24:45,39:248,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{69:[1,249],72:[1,250]},o($Vn1,[2,66]),o($Vn1,[2,68],{73:[1,251]}),{9:[2,77],82:252,83:[1,253]},o($Vl1,[2,86]),o($VM,[2,61]),{40:[2,65]},{8:76,15:$V1,24:45,39:254,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:244,60:$Vi,71:255,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{8:76,15:$V1,24:256,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{9:[1,257]},{8:76,15:$V1,24:258,60:$Vi,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},o($Vm1,[2,64]),o($Vn1,[2,67]),o($Vn1,[2,69]),{8:76,15:$V1,24:45,39:259,40:$Vd,41:32,44:33,45:34,46:35,47:36,48:37,50:38,51:39,52:40,53:41,54:42,55:43,56:$Ve,57:$Vf,58:$Vg,59:$Vh,60:$Vi,62:$Vj,74:$Vk,75:$Vl,79:$Vm,80:$Vn,84:$Vo,90:$Vp,91:$Vq,92:$Vr,93:66,94:$Vs,95:$Vt,96:62,99:67,101:63,102:60,103:64,104:$Vu,105:$Vv,106:$Vw,107:$Vx,108:$Vy,109:$Vz,110:$VA,111:84,114:83,115:82,118:81,123:80,126:75,128:65,130:61,132:59,133:58},{9:[2,78]},o($VM,[2,76])],
defaultActions: {4:[2,1],10:[2,2],87:[2,20],88:[2,21],89:[2,22],90:[2,23],91:[2,24],92:[2,25],93:[2,26],94:[2,27],95:[2,28],210:[2,88],211:[2,90],248:[2,65],258:[2,78]},
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
case 47: return 138; 
break;
case 48: return 139; 
break;
case 49: return 136; 
break;
case 50: return 135; 
break;
case 51: return 137; 
break;
case 52: return 142; 
break;
case 53: return 144; 
break;
case 54: return 143; 
break;
case 55: return 140; 
break;
case 56: return 141; 
break;
case 57: return 124; 
break;
case 58: return 122; 
break;
case 59: return '=>'; 
break;
case 60: return 121; 
break;
case 61: return 125; 
break;
case 62: return 125; 
break;
case 63: return 119; 
break;
case 64: return 120; 
break;
case 65: return 127; 
break;
case 66: return 127; 
break;
case 67: return 106; 
break;
case 68: return 131; 
break;
case 69: return 131; 
break;
case 70: return '^^'; 
break;
case 71: return '^^'; 
break;
case 72: return 129; 
break;
case 73: return 117; 
break;
case 74: return 116; 
break;
case 75: return 104; 
break;
case 76: return 105; 
break;
case 77: return 108; 
break;
case 78: return 109; 
break;
case 79: return 23; 
break;
case 80: return 112; 
break;
case 81: return 107; 
break;
case 82: return 113; 
break;
case 83: return 113; 
break;
case 84: return 110; 
break;
case 85: return 110; 
break;
case 86: return 106; 
break;
case 87: return 107; 
break;
case 88: return 73; 
break;
case 89: return 69; 
break;
case 90: return 100; 
break;
case 91: return 94; 
break;
case 92: return 95; 
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

define('symbols',[], function () {
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


define('ast',[], function () {
  'use strict';

  function Node() {}

  Node.prototype.pojo = function () {
    return JSON.parse(JSON.stringify(this));
  };

  function AssignmentExpression(left, right, operator) {
    operator = operator || '=';
    this.type = 'AssignmentExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(AssignmentExpression, Node);

  function ArrayExpression(elements) {
    this.type = 'ArrayExpression';
    this.elements = elements || [];
  }
  inherits(AssignmentExpression, Node);

  function BinaryExpression(left, right, operator) {
    this.type = 'BinaryExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(BinaryExpression, Node);

  function BlockStatement(statements) {
    if (!Array.isArray(statements)) { statements = [statements]; }
    this.type = 'BlockStatement';
    this.body = statements;
  }
  inherits(BlockStatement, Node);

  function BreakStatement(label) {
    this.type = 'BreakStatement';
    this.label = label || null;
  }
  inherits(BreakStatement, Node);

  function CallExpression(callee, args) {
    this.type = 'CallExpression';
    this.callee = callee;
    this.arguments = args;
  }
  inherits(CallExpression, Node);

  function ConditionalExpression(test, consequent, alternate) {
    this.type = 'ConditionalExpression';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
  inherits(ConditionalExpression, Node);

  function ExpressionStatement(expression) {
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }
  inherits(ExpressionStatement, Node);

  /* jshint maxparams: 6 */
  function FunctionDeclaration(id, params, defaults, body,
                               generator, expression) {
    this.type = 'FunctionDeclaration';
    this.id = id || null;
    this.params = params || [];
    this.defaults = defaults || [];
    this.body = new BlockStatement(body);
    this.generator = generator || false;
    this.expression = expression || false;
  }
  inherits(FunctionDeclaration, Node);

  function Identifier(name) {
    this.type = 'Identifier';
    this.name = name;
  }
  inherits(Identifier, Node);

  function Literal(value) {
    if (typeof value === 'number' && value < 0) {
      throw new Error(
        'Can not construct negative literals. Negative literals are ' +
        'formed by negating a positive literal. Use `Literal.for()` which ' +
        'return either a literal or an expression for a negative literal.'
      );
    }
    this.type = 'Literal';
    this.value = value;
    this.raw = JSON.stringify(value);
  }
  inherits(Literal, Node);

  Literal.for = function (value) {
    if (typeof value === 'number' && value < 0) {
      return new UnaryExpression(new Literal(Math.abs(value)), '-');
    }
    return new Literal(value);
  };

  function LogicalExpression(left, right, operator) {
    this.type = 'LogicalExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(LogicalExpression, Node);

  function MemberExpression(object, property, computed) {
    this.type = 'MemberExpression',
    this.computed = computed || false;
    this.object = object;
    this.property = property;
  }
  inherits(MemberExpression, Node);

  function Program(body) {
    this.type = 'Program';
    this.body = body;
  }
  inherits(Program, Node);

  function ReturnStatement(expression) {
    this.type = 'ReturnStatement';
    this.argument = expression || null;
  }
  inherits(ReturnStatement, Node);

  function SwitchCase(test, sentences) {
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = sentences || [];
  }
  inherits(SwitchCase, Node);

  function SwitchStatement(discriminant, cases) {
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases || [];
  }
  inherits(SwitchStatement, Node);

  function UnaryExpression(argument, operator, prefix) {
    this.type = 'UnaryExpression';
    this.operator = operator;
    this.argument = argument;
    this.prefix = typeof prefix === 'undefined' ? true : prefix;
  }
  inherits(UnaryExpression, Node);

  function VariableDeclaration(declarations, kind) {
    if (!Array.isArray(declarations)) { declarations = [declarations]; }
    this.type = 'VariableDeclaration';
    this.declarations = declarations;
    this.kind = kind || 'var';
  }
  inherits(VariableDeclaration, Node);

  function VariableDeclarator(id, init) {
    this.type = 'VariableDeclarator';
    this.id = id;
    this.init = init;
  }
  inherits(VariableDeclarator, Node);

  function WhileStatement(condition, statements) {
    this.type = 'WhileStatement';
    this.test = condition;
    this.body = new BlockStatement(statements);
  }
  inherits(WhileStatement, Node);

  function inherits(klass, base) {
    klass.prototype = Object.create(base.prototype);
    klass.prototype.constructor = klass;
  }

  return {
    AssignmentExpression: AssignmentExpression,
    ArrayExpression: ArrayExpression,
    BinaryExpression: BinaryExpression,
    BlockStatement: BlockStatement,
    BreakStatement: BreakStatement,
    CallExpression: CallExpression,
    ConditionalExpression: ConditionalExpression,
    ExpressionStatement: ExpressionStatement,
    FunctionDeclaration: FunctionDeclaration,
    Identifier: Identifier,
    Literal: Literal,
    LogicalExpression: LogicalExpression,
    MemberExpression: MemberExpression,
    Program: Program,
    ReturnStatement: ReturnStatement,
    SwitchCase: SwitchCase,
    SwitchStatement: SwitchStatement,
    UnaryExpression: UnaryExpression,
    VariableDeclaration: VariableDeclaration,
    VariableDeclarator: VariableDeclarator,
    WhileStatement: WhileStatement
  };
});


define('templates',['ast'], function (ast) {
  'use strict';

  return {

    callWith: function (name, args) {
      if (!Array.isArray(args)) {
        args = args ? [args] : [];
      }
      return new ast.CallExpression(new ast.Identifier(name), args);
    },

    concurrentBody: function (cases) {
      var programCounter = this.programCounter;
      var switchStatement = new ast.SwitchStatement(programCounter, cases);
      return this.infiniteLoop(switchStatement);
    },

    concurrentLabel: function (label) {
      return new ast.SwitchCase(ast.Literal.for(label));
    },

    get endToken() {
      return {
        type: 'Identifier',
        name: '__yieldEnd'
      };
    },

    every: function (tests) {
      var _this = this;
      return tests.reduce(function (chain, test) {
        return chain === null ? test :
               new ast.LogicalExpression(chain, test, '&&');
      }, null);
    },

    /**
     * Builds a DIV2 AST for a FROM update.
     *
     * @return a DIV2 increment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromIncrement: function (name, constant) {
      return {
        type: 'AssignmentExpression',
        operator: '+=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
    },

    /**
     * Builds a DIV2 AST for a FROM initializator.
     *
     * @return a DIV2 assignment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromInitilizator: function (name, constant) {
      return {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
    },

    /**
     * Builds a DIV2 AST for FROM test.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromTest: function (name, constant, isLowerThan) {
      return {
        type: 'BinaryExpression',
        operator: isLowerThan ? '<=' : '>=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
    },

    /**
     * Builds a DIV2 AST for the default argument for FRAME.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    get defaultFrameArgument() {
      return {
        type: "Literal",
        value: 100,
        raw: "100"
      };
    },

    /**
     * Builds a DIV2 AST for the default argument for RETURN (process id).
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    get defaultReturnArgument() {
      return {
        type: "Identifier",
        name: "id"
      };
    },

    infiniteLoop: function (body) {
      return new ast.WhileStatement(this.trueLiteral, body);
    },

    labeledBlock: function (label) {
      return new ast.SwitchCase(ast.Literal.for(label));
    },

    memoryGlobal: function (name) {
      return this._memory(name, this._globalAddress(name));
    },

    //TODO: Wrong, implement as mem[exec.local_base + L_NAME]
    memoryLocal: function (name) {
      return this._memory(name, new ast.Identifier(name));
    },

    //TODO: Wrong, implement as mem[exec.local_base + name]
    memoryPrivate: function (name) {
      return this.memoryLocal(name);
    },

    _memory: function (name, index) {
      return new ast.MemberExpression(new ast.Identifier('mem'), index, true);
    },

    _globalAddress: function (name) {
      return {
        type: 'BinaryExpression',
        operator: '+',
        left: this.globalBaseIdentifier,
        right: this.identifierForGlobal(name)
      };
    },

    globalBaseIdentifier: new ast.Identifier('G_BASE'),

    identifierForGlobal: function (name) {
      return new ast.Identifier('G_' + name.toUpperCase());
    },

    newRange: function (min, max) {
      return this.callWith('__range', [min, max]);
    },

    get processEnd() {
      return new ast.ReturnStatement(this.endToken);
    },

    call: function (kind, resume, name, argList) {
      var yieldType = {
        'function': '__yieldCallFunction',
        'process': '__yieldNewProcess'
      }[kind];
      return new ast.ReturnStatement(
        this.callWith(
          yieldType,
          [ast.Literal.for(resume), ast.Literal.for(name)].concat(argList)
        )
      );
    },

    processClone: function (child, parent) {
      return new ast.ReturnStatement(
        this.callWith(
          '__yieldClone',
          [ast.Literal.for(child), ast.Literal.for(parent)]
        )
      );
    },

    // TODO: Ok, the former means process clone but what does this mean?
    // It is not "process frame", it is just frame.
    processFrame: function (resume, expression) {
      return new ast.ReturnStatement(
        this.callWith(
          '__yieldFrame',
          [ast.Literal.for(resume), expression]
        )
      );
    },

    // TODO: Same here.
    processDebug: function (resume) {
      return new ast.ReturnStatement(
        this.callWith(
          '__yieldDebug',
          [ast.Literal.for(resume)]
        )
      );
    },

    programFunction: function (name, body) {
      return new ast.FunctionDeclaration(
        new ast.Identifier('program_' + name),
        this.processParameters, null,
        body
      );
    },

    processFunction: function (name, body) {
      return new ast.FunctionDeclaration(
        new ast.Identifier('process_' + name),
        this.processParameters, null,
        body
      );
    },

    // TODO: Maybe mem, exec & args should be supplied by div2trans
    get processParameters() {
      return [
        new ast.Identifier('mem'),
        new ast.Identifier('exec'),
        new ast.Identifier('args')
      ];
    },

    // TODO: See my comment about processFrame. I don't think this should be
    // different for a process than for a function.
    processReturn: function (expression) {
      return new ast.ReturnStatement(
        this.callWith(
          '__yieldReturn',
          expression
        )
      );
    },

    get programCounter() {
      return new ast.MemberExpression(
        new ast.Identifier('exec'),
        new ast.Identifier('pc')
      );
    },

    get returnValue() {
      return new ast.MemberExpression(
        new ast.Identifier('exec'),
        new ast.Identifier('retv')
      );
    },

    some: function (evaluation, tests) {
      return this.callWith('__some', [evaluation].concat(tests));
    },

    toBool: function (ast) {
      return this.callWith('__bool', ast);
    },

    get trueLiteral() {
      return ast.Literal.for(true);
    }

  };
});


define('context',['symbols', 'ast', 'templates'], function (symbols, ast, t) {
  'use strict';

  function Context(ctx) {
    this._processes = Object.create(null);
    this._auxNames = Object.create(null);
    this._currentProcessPrivates = Object.create(null);

    for (var key in ctx) {
      if (ctx.hasOwnProperty(key)) {
        this[key] = ctx[key];
      }
    }
  }

  Context.prototype = {
    constructor: Context,

    startLinearization: function () {
      this._auxNames = Object.create(null);
      this._currentLinearization = new Linearization();
    },

    getLinearizationCases: function () {
      return this._currentLinearization.getCases();
    },

    end: function () {
      return this._currentLinearization.end();
    },

    callFunction: function (resumeLabel, name, argList) {
      return this._currentLinearization
        .callFunction(resumeLabel, name, argList);
    },

    newProcess: function (resumeLabel, name, argList) {
      return this._currentLinearization
        .newProcess(resumeLabel, name, argList);
    },

    clone: function (childLabel, parentLabel) {
      return this._currentLinearization.clone(childLabel, parentLabel);
    },

    frame: function (resumeLabel, expression) {
      return this._currentLinearization.frame(resumeLabel, expression);
    },

    debug: function (resumeLabel) {
      return this._currentLinearization.debug(resumeLabel);
    },

    declareProcess: function (name) {
      this._processes[name] = true;
    },

    isProcess: function (name) {
      return name in this._processes;
    },

    return: function (expression) {
      return this._currentLinearization.return(expression);
    },

    newAux: function (name, initializer) {
      var nameCount = this._auxNames[name] || 0;
      var suffix = this._auxNames[name] = nameCount + 1;
      if (nameCount > 0) {
        name += suffix;
      }
      var identifier = new ast.Identifier(name);
      var declaration = new ast.VariableDeclaration(
        new ast.VariableDeclarator(identifier, initializer)
      );
      return {
        identifier: identifier,
        declaration: declaration
      };
    },

    newLabel: function () {
      return this._currentLinearization.newLabel();
    },

    label: function (label) {
      return this._currentLinearization.label(label);
    },

    verbatim: function (ast) {
      return this._currentLinearization.verbatim(ast);
    },

    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      return this._currentLinearization
        .goToIf(testAst, labelIfTrue, labelIfFalse);
    },

    goTo: function (label) {
      return this._currentLinearization.goTo(label);
    },

    select: function (evaluation, options, defaultLabel) {
      return this._currentLinearization.select(
        evaluation,
        options,
        defaultLabel
      );
    },

    getScope: function (identifier) {
      var scope;
      if (symbols.isGlobal(identifier)) {
        scope = 'global';
      }
      //TODO: What about id? it is not a local but a special keyword with
      //identifier semantics to avoid assignation on it. Should be translated
      //as a local but identified like a special token and translated in a
      //special way.
      else if (symbols.isLocal(identifier)) {
        scope = 'local';
      }
      else if (identifier in this._currentProcessPrivates) {
        scope = 'private';
      }
      return scope;
    },

    getGlobalBaseDeclarator: function () {
      return new ast.VariableDeclarator(
        t.globalBaseIdentifier,
        // TODO: Must take into account all DIV padding including program source
        ast.Literal['for'](0)
      );
    }
  };

  function Linearization() {
    this._pc = -1;
    this._sentences = [];
  }

  Linearization.prototype = {
    constructor: Linearization,

    getCases: function () {
      var cases = [];
      var sentences = this._sentences;
      var currentCase = null;
      var caseIsFinished = false;
      var isReturn, isLabel, consequent;

      for (var i = 0, wrapper; (wrapper = sentences[i]); i++) {
        isLabel = wrapper instanceof Label;
        isReturn = wrapper.type === 'Return';

        if (caseIsFinished && !isLabel) { continue; }

        if (isLabel) {
          currentCase = t.concurrentLabel(wrapper.label + 1);
          cases.push(currentCase);
        }
        consequent = currentCase.consequent;
        consequent.push.apply(consequent, wrapper.sentences);

        caseIsFinished = isReturn || (caseIsFinished && !isLabel);
      }
      return cases;
    },

    newLabel: function () {
      return new Label();
    },

    label: function (label) {
      var lastSentence = this._sentences[this._sentences.length - 1];
      if (lastSentence instanceof Label) {
        label.proxy(lastSentence);
      }
      else {
        label.label = this._pc + 1;
        this._sentences.push(label);
      }
    },

    verbatim: function (sentence) {
      this._addSentence(this._verbatim(sentence));
    },

    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      this._addSentence(this._goToIf(testAst, labelIfTrue, labelIfFalse));
    },

    goTo: function (label) {
      this._addSentence(this._goTo(label));
    },

    select: function (evaluation, options, defaultLabel) {
      this._addSentence(this._select(evaluation, options, defaultLabel));
    },

    end: function () {
      this._addSentence(this._end());
    },

    callFunction: function (resumeLabel, name, argList) {
      this._addSentence(this._call('function', resumeLabel, name, argList));
    },

    newProcess: function (resumeLabel, name, argList) {
      this._addSentence(this._call('process', resumeLabel, name, argList));
    },

    clone: function (childLabel, parentLabel) {
      this._addSentence(this._clone(childLabel, parentLabel));
    },

    frame: function (resumeLabel, expression) {
      this._addSentence(this._frame(resumeLabel, expression));
    },

    debug: function (resumeLabel) {
      this._addSentence(this._debug(resumeLabel));
    },

    return: function (expression) {
      this._addSentence(this._return(expression));
    },

    _verbatim: function (sentence) {
      return {
        type: 'Verbatim',
        sentences: [sentence]
      };
    },

    _goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      var _this = this;
      return {
        type: 'GoToIf',
        get sentences() {
          return [_this._programCounterBranch(
            testAst,
            labelIfTrue.label,
            labelIfFalse.label
          ), new ast.BreakStatement()];
        }
      };
    },

    _goTo: function (label) {
      var _this = this;
      return {
        type: 'GoTo',
        get sentences() {
          return [
            _this._programCounterSet(label.label),
            new ast.BreakStatement()
          ];
        }
      };
    },

    _select: function (evaluation, options, defaultLabel) {
      var _this = this;
      return {
        type: 'Select',
        get sentences() {
          var defaultExpression = _this._programCounterSet(defaultLabel.label);
          var cases = options.map(function (option) {
            var tests = option.tests;
            return _this._programCounterBranch(
              t.some(evaluation, tests),
              option.label.label
            );
          });
          return [defaultExpression]
            .concat(cases)
            .concat([new ast.BreakStatement()]);
        }
      };
    },

    _end: function () {
      return {
        type: 'End',
        get sentences() {
          return [t.processEnd];
        }
      };
    },

    _call: function (kind, resumeLabel, name, argList) {
      var type = { 'function': 'CallFunction', 'process': 'NewProcess' }[kind];
      return {
        type: type,
        get sentences() {
          return [t.call(kind, resumeLabel.label + 1, name, argList)];
        }
      };
    },

    _clone: function (childLabel, parentLabel) {
      return {
        type: 'Clone',
        get sentences() {
          return [t.processClone(childLabel.label + 1, parentLabel.label + 1)];
        }
      };
    },

    _frame: function (resumeLabel, expression) {
      return {
        type: 'Frame',
        get sentences() {
          return [t.processFrame(resumeLabel.label + 1, expression)];
        }
      };
    },

    _debug: function (resumeLabel) {
      return {
        type: 'Debug',
        get sentences() {
          return [t.processDebug(resumeLabel.label + 1)];
        }
      };
    },

    _return: function (expression) {
      return {
        type: 'Return',
        get sentences() {
          return [t.processReturn(expression)];
        }
      };
    },

    _programCounterBranch: function (testAst, consequent, alternate) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          t.programCounter,
          new ast.ConditionalExpression(
            testAst,
            new ast.Literal(consequent + 1),
            alternate ? new ast.Literal(alternate + 1) : t.programCounter
          )
        )
      );
    },

    _programCounterSet: function (label) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          t.programCounter,
          new ast.Literal(label + 1)
        )
      );
    },

    _addSentence: function (ast) {
      if (!this._sentences.length) {
        this._sentences.push(new Label(0));
      }
      this._sentences.push(ast);
      this._pc += 1;
    }
  };

  function Label(n) { this.label = n; }

  Label.prototype = {
    constructor: Label,

    proxy: function (anotherLabel) {
      this._proxifiedLabel = anotherLabel;
      Object.defineProperty(this, 'label', { get: function () {
        return this._proxifiedLabel.label;
      }});
    },

    get sentences() {
      return [];
    }
  };

  return {
    Context: Context,
    Linearization: Linearization
  };

});


define('div2trans',[
  'context',
  'ast',
  'templates',
  'symbols'
], function (ctx, ast, t, symbols) {
  'use strict';

  var translators = Object.create(null);

  translators.AssignmentExpression = function (divAssignment, context) {
    return new ast.AssignmentExpression(
      translate(divAssignment.left, context),
      translate(divAssignment.right, context),

      // XXX: This is good luck. All assignment operators are equal!
      divAssignment.operator
    );
  };

  translators.BinaryExpression = function (divBinary, context) {
    return new ast.BinaryExpression(
      translate(divBinary.left, context),
      translate(divBinary.right, context),
      divBinary.operator
    );
  };

  translators.CallExpression = function (divCall, context) {
    var parameters = new ast.ArrayExpression(
      divCall.arguments.map(function (arg) {
        return translate(arg, context);
      })
    );
    var id = divCall.callee.name;
    var isProcess = context.isProcess(id);
    var afterCallLabel = context.newLabel();
    var auxName = (isProcess ? '_pid_' : '_result_') + id;
    var callAux = context.newAux(auxName, t.returnValue);
    var callKind = isProcess ? 'newProcess' : 'callFunction';
    context[callKind](afterCallLabel, id, parameters);
    context.label(afterCallLabel);
    context.verbatim(callAux.declaration);
    return callAux.identifier;
  };

  translators.CloneSentence = function (divClone, context) {
    var insideCloneLabel = context.newLabel();
    var afterCloneLabel = context.newLabel();
    context.clone(insideCloneLabel, afterCloneLabel);
    context.label(insideCloneLabel);
    translateBody(divClone, context);
    context.label(afterCloneLabel);
  };

  translators.Unit = function (divUnit, context) {
    var programFunction = translate(divUnit.program, context);
    var processesFunctions = divUnit.processes.map(function (divProcess) {
      return translate(divProcess, context);
    });
    var memoryMap = getMemoryMap(context);
    return new ast.Program(
      memoryMap
      .concat([programFunction])
      .concat(processesFunctions)
    );
  };

  function getMemoryMap(context) {
    var offset = 0;
    var globalBase = context.getGlobalBaseDeclarator();
    var globalOffsets = symbols.wellKnownGlobals.map(function (symbol) {
      // TODO: In the future, this will be a property of the symbol
      var name = symbol;
      var global = new ast.VariableDeclarator(
        new t.identifierForGlobal(name),
        new ast.Literal['for'](offset)
      );
      offset += 4; // TODO: Extract info from the symbol
      return global;
    });
    // XXX: Notice this return a list of variable declarators.
    return [new ast.VariableDeclaration([globalBase].concat(globalOffsets))];
  }

  translators.Program = function (divProgram, context) {
    var name = divProgram.name.name;
    var body = translate(divProgram.body, context);
    return t.programFunction(name, body);
  };

  translators.Process = function (divProgram, context) {
    var name = divProgram.name.name;
    var body = translate(divProgram.body, context);
    return t.processFunction(name, body);
  };

  translators.ProcessBody = function (divBody, context) {
    context.startLinearization();
    divBody.sentences.map(function (sentence) {
      translate(sentence, context);
    });
    context.end();
    var bodyCases = context.getLinearizationCases();
    return t.concurrentBody(bodyCases);
  };

  translators.Identifier = function (divIdentifier, context) {
    var name = divIdentifier.name;
    var scope = context.getScope(name);
    if (!scope) { throw new Error('Unknown name ' + name); }
    var scopeTranslator = 'memory' + scope[0].toUpperCase() + scope.substr(1);
    if (!(scopeTranslator in t)) { throw new Error('Unknown scope ' + scope); }
    return t[scopeTranslator](name);
  };

  translators.IfSentence = function (divIf, context) {
    var consequentLabel = context.newLabel();
    var alternateLabel = context.newLabel();

    var test = t.toBool(translate(divIf.test, context));
    context.goToIf(test, consequentLabel, alternateLabel);
    context.label(consequentLabel);
    translateBody(divIf, context, 'consequent');
    context.label(alternateLabel);
    if (divIf.alternate) {
      translateBody(divIf, context, 'alternate');
    }
  };

  translators.ExpressionSentence = function (divExpression, context) {
    var expression = translate(divExpression.expression, context);
    context.verbatim(new ast.ExpressionStatement(expression));
  };

  translators.Literal = function (divLiteral) {
    return ast.Literal.for(divLiteral.value);
  };

  translators.WhileSentence = function (divWhile, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var testLabel = context.newLabel();

    context.label(testLabel);
    context.goToIf(
      translate(divWhile.test, context),
      loopStartLabel,
      afterLoopLabel
    );

    context.label(loopStartLabel);
    translateBody(divWhile, context);
    context.goTo(testLabel);

    context.label(afterLoopLabel);
  };

  translators.LoopSentence = function (divLoop, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();

    context.label(loopStartLabel);
    translateBody(divLoop, context);
    context.goTo(loopStartLabel);

    context.label(afterLoopLabel);
  };

  translators.RepeatSentence = function (divRepeat, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();

    context.label(loopStartLabel);
    translateBody(divRepeat, context);
    context.goToIf(
      translate(divRepeat.test, context),
      afterLoopLabel,
      loopStartLabel
    );

    context.label(afterLoopLabel);
  };

  translators.ReturnSentence = function (divReturn, context) {
    var returnArgument = divReturn.argument;
    if (!returnArgument) {
      returnArgument = t.defaultReturnArgument;
    }
    context.return(translate(returnArgument, context));
  };

  translators.SwitchSentence = function (divSwitch, context) {
    var afterSwitchLabel = context.newLabel();
    var defaultCaseLabel = context.newLabel();

    var cases = divSwitch.cases;
    var lastCase = cases[cases.length - 1];
    var hasDefault = lastCase && lastCase.tests === null;
    if (hasDefault) { cases.pop(); }

    var discriminant = translate(divSwitch.discriminant, context);
    var aux = context.newAux('_switch', discriminant);
    var choices = generateChoices(cases, context);

    context.verbatim(aux.declaration);
    context.select(
      aux.identifier, choices,
      hasDefault ? defaultCaseLabel : afterSwitchLabel
    );
    choices.forEach(function (choice) {
      context.label(choice.label);
      translateBody(choice.case, context, 'consequent');
      context.goTo(afterSwitchLabel);
    });
    if (hasDefault) {
      var defaultCase = lastCase;
      context.label(defaultCaseLabel);
      translateBody(defaultCase, context, 'consequent');
      context.goTo(afterSwitchLabel);
    }
    context.label(afterSwitchLabel);
  };

  function generateChoices(cases, context) {
    return cases.map(function (caseClause) {
      return {
        label: context.newLabel(),
        tests: caseClause.tests.map(function (test) {
          return translate(test, context);
        }),
        case: caseClause
      };
    });
  }


  translators.FrameSentence = function (divFrame, context) {
    var resumeLabel = context.newLabel();
    var argument = divFrame.argument || t.defaultFrameArgument;
    context.frame(resumeLabel, translate(argument, context));
    context.label(resumeLabel);
  };

  translators.DebugSentence = function (divDebug, context) {
    var resumeLabel = context.newLabel();
    context.debug(resumeLabel);
    context.label(resumeLabel);
  };

  translators.FromSentence = function (divFrom, context) {
    var initValue = divFrom.init.value;
    var limitValue = divFrom.limit.value;
    var isAscendant = initValue < limitValue;
    var defaultStep = isAscendant ? 1 : -1;
    var step = divFrom.step ? divFrom.step.value : defaultStep;
    var identifier = divFrom.identifier.name;

    var init = t.fromInitilizator(identifier, initValue);
    var test = t.fromTest(identifier, limitValue, isAscendant);
    var update = t.fromIncrement(identifier, step);

    translateForLikeLoop(divFrom, [init], [test], [update], context);
  };

  translators.ForSentence = function (divFor, context) {
    var inits = divFor.inits;
    var tests = divFor.tests;
    var updates = divFor.updates;
    translateForLikeLoop(divFor, inits, tests, updates, context);
  };

  translators.Range = function (divRange) {
    return t.newRange(divRange.min, divRange.max);
  };

  /**
   * All parameters here must be DIV2 AST.
   */
  function translateForLikeLoop(loop, inits, tests, updates, context) {
    var test = t.every(tests.map(function (test) {
      return t.toBool(translate(test, context));
    }));

    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var updatesLabel = context.newLabel();

    inits.forEach(verbatim);

    context.label(testLabel);
    if (test) {
      context.goToIf(test, loopStartLabel, afterLoopLabel);
    }

    context.label(loopStartLabel);
    translateBody(loop, context);

    context.label(updatesLabel);
    updates.forEach(verbatim);
    context.goTo(testLabel);

    context.label(afterLoopLabel);

    function verbatim(divExpression) {
      context.verbatim(new ast.ExpressionStatement(
        translate(divExpression, context)
      ));
    }
  }

  function translate(divAst, context) {
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst, context);
  }

  function translateBody(divBodySentence, context, bodyProperty) {
    bodyProperty = bodyProperty || 'body';
    return divBodySentence[bodyProperty].sentences.map(function (sentence) {
      return translate(sentence, context);
    });
  }

  return {
    translate: translate
  };
});


define('div2js',[
  'div2lang',
  'div2trans'
], function (parser, translator) {
  'use strict';

  parser.yy = parser.yy || {};
  parser.yy.parseError = parser.parseError;

  return {
    parser: parser,
    translator: translator
  };

});


//# sourceMappingURL=div2js.js.map

return objects['div2js'];

}));

//# sourceMappingURL=div2js.js.map
