/*
 * DIV 2 Parser
 */

%lex
%options case-insensitive

SYMBOL "#ªº$þƒ£¥¢_"
ALPHA  "a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ"
DIGIT  "0-9"
NAME   [a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_][0-9a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_]*
%%

\s+                                        { /* ignore */ }

"IF"                                       { return 'IF'; }
"ELSE"                                     { return 'ELSE'; }
"SWITCH"                                   { return 'SWITCH'; }
"CASE"                                     { return 'CASE'; }
"DEFAULT"                                  { return 'DEFAULT'; }
"LOOP"                                     { return 'LOOP'; }
"FROM"                                     { return 'FROM'; }
"REPEAT"                                   { return 'REPEAT'; }
"UNTIL"                                    { return 'UNTIL'; }
"WHILE"                                    { return 'WHILE'; }
"FROM"                                     { return 'FROM'; }
"TO"                                       { return 'TO'; }
"STEP"                                     { return 'STEP'; }
"FOR"                                      { return 'FOR'; }
"BREAK"                                    { return 'BREAK'; }
"CONTINUE"                                 { return 'CONTINUE'; }
"RETURN"                                   { return 'RETURN'; }
"FRAME"                                    { return 'FRAME'; }
"CLONE"                                    { return 'CLONE'; }
"DEBUG"                                    { return 'DEBUG'; }
"FRAME"                                    { return 'FRAME'; }

"PROGRAM"                                  { return 'PROGRAM'; }
"CONST"                                    { return 'CONST'; }
"GLOBAL"                                   { return 'GLOBAL'; }
"LOCAL"                                    { return 'LOCAL'; }
"PRIVATE"                                  { return 'PRIVATE'; }
"PROCESS"                                  { return 'PROCESS'; }
"FUNCTION"                                 { return 'FUNCTION'; }
"BEGIN"                                    { return 'BEGIN'; }
"END"                                      { return 'END'; }

"INT POINTER"                              { return 'INT_POINTER'; }
"INT"                                      { return 'INT'; }
"WORD POINTER"                             { return 'WORD_POINTER'; }
"WORD"                                     { return 'WORD'; }
"BYTE POINTER"                             { return 'BYTE_POINTER'; }
"BYTE"                                     { return 'BYTE'; }
"STRING POINTER"                           { return 'STRING_POINTER'; }
"STRING"                                   { return 'STRING'; }
"STRUCT POINTER"                           { return 'STRUCT_POINTER'; }

";"                                        { return ';'; }
"("                                        { return '('; }
")"                                        { return ')'; }
"["                                        { return '['; }
"]"                                        { return ']'; }
","                                        { return ','; }

/* priority 9 */
":="                                       { return '='; }
"+="                                       { return '+='; }
"-="                                       { return '-='; }
"/="                                       { return '/='; }
"*="                                       { return '*='; }
"%="                                       { return '%='; }
"&="                                       { return '&='; }
"|="                                       { return '|='; }
"^="                                       { return '^='; }
"<<="                                      { return '<<='; }
">>="                                      { return '>>='; }

/* priority 8 */
"=="                                       { return '=='; }
">="                                       { return '>='; }
"=>"                                       { return '=>'; }
"<="                                       { return '<='; }
"<>"                                       { return '!='; }
"!="                                       { return '!='; }
"<"                                        { return '<'; }
">"                                        { return '>'; }

/* priority 7 */
"AND"                                      { return '&&'; }
"&&"                                       { return '&&'; }
"&"                                        { return '&'; }
"OR"                                       { return '||'; }
"||"                                       { return '||'; }
"XOR"                                      { return '^^'; }
"^^"                                       { return '^^'; }
"^"                                        { return '^'; }

/* priority 6 */
">>"                                       { return '>>'; }
"<<"                                       { return '<<'; }

/* priority 2 (should be declared here to not conflict with + and - */
"++"                                       { return '++'; }
"--"                                       { return '--'; }

/* priority 5 */
"+"                                        { return '+'; }
"-"                                        { return '-'; }

/* priority 9 */
"="                                        { return '='; }

/* priority 4 */
"/"                                        { return '/'; }
"*"                                        { return '*'; }
"MOD"                                      { return '%'; }
"%"                                        { return '%'; }

/* priority 3 */
"NOT"                                      { return '!'; }
"!"                                        { return '!'; }
"OFFSET"                                   { return '&'; }
"POINTER"                                  { return '*'; }

".."                                       { return '..'; }
":"                                        { return ':'; }

/* priority 1 */
"."                                        { return '.'; }


(\"\")|(\".*?([^\\]\"))                    { return 'STRING_LITERAL'; }
[0-9]+                                     { return 'NUMBER'; }

{NAME}                                     { return 'NAME'; }
<<EOF>>                                    { return 'EOF'; }

/lex

%start translation_unit

%%

// TODO: rewrite process_list to be optional
translation_unit
  : program EOF
    { 
      $$ = {
        type: "Unit",
        program: $1,
        processes: []
      };
      return $$;
    }
  | program process_list EOF
    {
      $$ = {
        type: "Unit",
        program: $1,
        processes: $2
      };
      return $$;
    }
  ;

program
  : PROGRAM id ';' const_block global_block local_block private_block body
    {
      $$ = {
        type: "Program",
        name: $2,
        consts: $4,
        globals: $5,
        locals: $6,
        privates: $7,
        body: $8
      };
    }
  ;

id
  : NAME
    { $$ = { type: "Identifier", name: $1 }; }
  ;

const_block
  : CONST const_declaration_list
    {
      $$ = {
        type: "ConstDeclarations",
        declarations: $2
      };
    }
  | /* empty */
    { $$ = null; }
  ;

global_block
  : GLOBAL declaration_list
    {
      $$ = {
        type: "GlobalDeclarations",
        declarations: $2
      };
    }
  | /* empty */
    { $$ = null; }
  ;

local_block
  : LOCAL declaration_list
    {
      $$ = {
        type: "LocalDeclarations",
        declarations: $2
      };
    }
  | /* empty */
    { $$ = null; }
  ;

private_block
  : PRIVATE declaration_list
    {
      $$ = {
        type: "PrivateDeclarations",
        declarations: $2
      };
    }
  | /* empty */
    { $$ = null; }
  ;

const_declaration_list
  : /* empty */
    { $$ = []; }
  | const_declaration_list const_declaration
    { $$ = $1.concat([$2]); }
  ;

const_declaration
  : id '=' expression ';'
    {
      // TODO: I think consts are actually MACROS
      $$ = {
        type: "ConstDeclarator",
        constType: "int",
        constName: $1,
        constInit: $3
      };
    }
  ;

declaration_list
  : /* empty */
    { $$ = []; }
  | declaration_list declaration
    { $$ = $1.concat([$2]); }
  ;

declaration
  : type id '=' expression ';'
    {
      $$ = {
        type: "VariableDeclarator",
        varType: $1,
        varName: $2,
        varInit: $4
      };
    }
  | type id ';'
    {
      $$ = {
        type: "VariableDeclarator",
        varType: $1,
        varName: $2,
        varInit: null
      };
    }
  ;

type
  : INT_POINTER 
    { $$ = "int_pointer"; }
  | INT
    { $$ = "int"; }
  | WORD_POINTER
    { $$ = "word_pointer"; }
  | WORD
    { $$ = "word"; }
  | BYTE_POINTER
    { $$ = "byte_pointer"; }
  | BYTE
    { $$ = "byte"; }
  | STRING_POINTER
    { $$ = "string_pointer"; }
  | STRING
    { $$ = "string"; }
  | STRUCT_POINTER
    { $$ = "struct_pointer"; }
  ;

process_list
  : process
  | process_list process
  ;

process
  : PROCESS id ';' private body
  | PROCESS id ';' body
  ;

body
  : BEGIN group_of_sentences
    {
      $$ = {
        type: "ProcessBody",
        sentences: $2
      };
    }
  ;

group_of_sentences
  : END
    { $$ = []; }
  | sentence_list END
    { $$ = $1; }
  ;

group_of_sentences_for_if_else
  : ELSE
    { $$ = []; }
  | sentence_list ELSE
    { $$ = $1; }
  ;

sentence
  : if_sentence
  | switch_sentence
  | while_sentence
  | repeat_sentence opt_end
  | loop_sentence
  | from_sentence
  | for_sentence
  | return_sentence ';'
  | frame_sentence ';'
  | clone_sentence
  | DEBUG ';'
    { $$ = { type: "DebuggerSentence" }; }
  | expression ';'
    {
      $$ = {
        type: "ExpressionSentence",
        expression: $1
      };
    }
  | BREAK ';'
    { $$ = { type: "BreakSentence" }; }
  | CONTINUE ';'
    { $$ = { type: "ContinueSentence" }; }
  ;

/* It exists to relax the rules for ; in sentences. */
opt_end
  : /* empty */
  | ';'
  ;

if_sentence
  : IF '(' expression ')' group_of_sentences
    {
      $$ = {
        type: "IfSentence",
        test: $3,
        consequent: {
          type: "SentenceBlock",
          sentences: $5
        },
        alternate: null
      };
    }
  | IF '(' expression ')' group_of_sentences_for_if_else group_of_sentences
    {
      $$ = {
        type: "IfSentence",
        test: $3,
        consequent: {
          type: "SentenceBlock",
          sentences: $5
        },
        alternate: {
          type: "SentenceBlock",
          sentences: $6
        },
      };
    }
  ;

switch_sentence
  : SWITCH '(' expression ')' group_of_cases
    {
      $$ = {
        type: "SwitchSentence",
        discriminant: $3,
        cases: $5
      };
    }
  ;

sentence_list
  : sentence
    { $$ = [$1]; }
  | sentence_list sentence
    { $1.push($2); }
  ;

group_of_cases
  : END
    { $$ = []; }
  | default END
    { $$ = [$1]; }
  | case_list END
  | case_list default END
    { $1.push($2); }
  ;

case_list
  : case
    { $$ = [$1]; }
  | case_list case
    { $1.push($2); }
  ;

case
  : CASE list_of_ranges ':' group_of_sentences
    {
      $$ = {
        type: "SwitchCase",
        tests: $2,
        consequent: {
          type: "SentenceBlock",
          sentences: $4
        }
      };
    }
  ;

default
  : DEFAULT ':' group_of_sentences
    {
      $$ = {
        type: "SwitchCase",
        tests: null,
        consequent: {
          type: "SentenceBlock",
          sentences: $3
        }
      };
    }
  ;

list_of_ranges
  : range
    { $$ = [$1]; }
  | list_of_ranges ',' range
    { $1.push($3); }
  ;

range
  : expression
  | expression '..' expression
    {
      $$ = {
        type: "Range",
        min: $1,
        max: $3
      };
    }
  ;

while_sentence
  : WHILE '(' expression ')' group_of_sentences
    {
      $$ = {
        type: "WhileSentence",
        test: $3,
        body: {
          type: "SentenceBlock",
          sentences: $5
        }
      };
    }
  ;

repeat_sentence
  : REPEAT group_of_sentences_for_repeat
    {
      $$ = {
        type: "RepeatSentence",
        test: $2.test,
        body: {
          type: "SentenceBlock",
          sentences: $2.body
        }
      };
    }
  ;

group_of_sentences_for_repeat
  : until_condition
    {
      $$ = {
        test: $1,
        body: []
      };
    }
  | sentence_list until_condition 
    {
      $$ = {
        test: $2,
        body: $1
      };
    }
  ;

until_condition
  : UNTIL '(' expression ')'
    { $$ = $3; }
  ;

loop_sentence
  : LOOP group_of_sentences
    {
      $$ = {
        type: "LoopSentence",
        body: {
          type: "SentenceBlock",
          sentences: []
        }
      };
    }
  ;

from_sentence
  : FROM id '=' expression TO expression step ';' group_of_sentences
    {
      $$ = {
        type: "FromSentence",
        identifier: $2,
        init: $4,
        limit: $6,
        step: $7,
        body: {
          type: "SentenceBlock",
          sentences: $9
        }
      };
    }
  ;

step
  : /* empty */
    { $$ = null }
  | STEP expression
    { $$ = $2; }
  ;

for_sentence
  : FOR for_params group_of_sentences
    {
      $$ = {
        type: "ForSentence",
        inits: $2.inits,
        tests: $2.tests,
        updates: $2.updates,
        body: {
          type: "SentenceBlock",
          sentences: $3
        }
      };
    }
  ;

/* The closing bracket is included in increment */
for_params
  : '(' initialization condition increment
    {
      $$ = {
        inits: $2,
        tests: $3,
        updates: $4
      };
    }
  ;

initialization
  : ';'
    { $$ = []; }
  | expression_list ';'
  ;

condition
  : ';'
    { $$ = []; }
  | expression_list ';'
  ;

increment
  : ')'
    { $$ = []; }
  | expression_list ')'
  ;

return_sentence
  : RETURN
    {
      $$ = {
        type: "ReturnSentence",
        argument: null 
      };
    }
  | RETURN '(' expression ')'
    {
      $$ = {
        type: "ReturnSentence",
        argument: $3
      };
    }
  ;

frame_sentence
  : FRAME
    {
      $$ = {
        type: "FrameSentence",
        argument: null
      };
    }
  | FRAME '(' expression ')'
    {
      $$ = {
        type: "FrameSentence",
        argument: $3
      };
    }
  ;

clone_sentence
  : CLONE group_of_sentences
    {
      $$ = {
        type: "CloneSentence",
        body: {
          type: "SentenceBlock",
          sentences: $2
        }
      };
    }
  ;

expression_list
  : expression
    { $$ = [$1]; }
  | expression_list ',' expression
    { $1.push($3); }
  ;

primary_expression
	: id
	| STRING_LITERAL
    {
      $$ = {
        type: "Literal",
        value: JSON.parse($1),
        raw: $1
      };
    }
  | NUMBER
    {
      $$ = {
        type: "Literal",
        value: parseInt($1),
        raw: $1
      };
    }
	| '(' expression ')'
    { $$ = $2; }
	;

postfix_expression
	: primary_expression
	| postfix_expression '[' expression ']'
	| call_expression
	| postfix_expression '.' id
	| postfix_expression update_operator
    {
      $$ = {
        type: "UpdateExpression",
        operator: $2,
        argument: $1,
        prefix: false
      };
    }
	;

call_expression
  : postfix_expression '(' ')'
    {
      $$ = {
        type: "CallExpression",
        callee: $1,
        arguments: []
      };
    }
  | postfix_expression '(' expression_list ')'
    {
      $$ = {
        type: "CallExpression",
        callee: $1,
        arguments: $3
      };
    }
  ;

unary_expression
	: postfix_expression
	| update_operator unary_expression
    {
      $$ = {
        type: "UpdateExpression",
        operator: $1,
        argument: $2,
        prefix: true
      };
    }
	| unary_operator unary_expression
	;

update_operator
  : '++'
  | '--'
  ;

unary_operator
	: '&'
	| '*'
	| '+'
	| '-'
	| '!'
	;

multiplicative_expression
	: unary_expression
  | multiplicative_expression '*' unary_expression
	| multiplicative_expression '/' unary_expression
	| multiplicative_expression '%' unary_expression
	;

additive_expression
	: multiplicative_expression
	| additive_expression '+' multiplicative_expression
	| additive_expression '-' multiplicative_expression
	;

shift_expression
	: additive_expression
	| shift_expression '<<' additive_expression
	| shift_expression '>>' additive_expression
	;

relational_expression
	: shift_expression
	| relational_expression '<' shift_expression
	| relational_expression '>' shift_expression
	| relational_expression '<=' shift_expression
	| relational_expression '>=' shift_expression
	;

equality_expression
	: relational_expression
	| equality_expression '==' relational_expression
	| equality_expression '!=' relational_expression
	;

and_expression
	: equality_expression
	| and_expression '&&' equality_expression
	;

exclusive_or_expression
	: and_expression
	| exclusive_or_expression '^' and_expression
	;

inclusive_or_expression
	: exclusive_or_expression
	| inclusive_or_expression '||' exclusive_or_expression
	;

conditional_expression
	: inclusive_or_expression
	;

assignment_expression
	: conditional_expression
	| unary_expression assignment_operator assignment_expression
    {
      $$ = {
        type: "AssignmentExpression",
        operator: $2,
        left: $1,
        right: $3
      };
    }
	;

assignment_operator
	: '='
	| '*='
	| '/='
	| '%='
	| '+='
	| '-='
	| '<<='
	| '>>='
	| '&='
	| '^='
	| '|='
	;

expression
	: assignment_expression
	;
