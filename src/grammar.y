
/*
 * DIV 2 Parser
 */

%lex
%options case-insensitive

SYMBOL "#ªº$þƒ£¥¢_"
ALPHA  "a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ"
DIGIT  "0-9"
%%
\s+                                        { /* ignore */ }

"IF"                                       { return 'IF'; }
"SWITCH"                                   { return 'SWITCH'; }
"LOOP"                                     { return 'LOOP'; }
"FROM"                                     { return 'FROM'; }
"REPEAT"                                   { return 'REPEAT'; }
"WHILE"                                    { return 'WHILE'; }
"FOR"                                      { return 'FOR'; }
"BREAK"                                    { return 'BREAK'; }
"CONTINUE"                                 { return 'CONTINUE'; }
"RETURN"                                   { return 'RETURN'; }
"FRAME"                                    { return 'FRAME'; }
"CLONE"                                    { return 'CLONE'; }
"DEBUG"                                    { return 'DEBUG'; }
"FRAME"                                    { return 'FRAME'; }

"PROGRAM"                                  { return 'PROGRAM'; }
"PROCESS"                                  { return 'PROCESS'; }
"FUNCTION"                                 { return 'FUNCTION'; }
"BEGIN"                                    { return 'BEGIN'; }
"END"                                      { return 'END'; }

";"                                        { return ';'; }
"("                                        { return '('; }
")"                                        { return ')'; }
"["                                        { return '['; }
"]"                                        { return ']'; }
","                                        { return ','; }

/* priority 9 */
"="                                        { return '='; }
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
"<>"                                       { return '!='; }
"!="                                       { return '!='; }
"<"                                        { return '<'; }
">"                                        { return '>'; }
">="                                       { return '>='; }
"=>"                                       { return '=>'; }
"<="                                       { return '<='; }

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

/* missing operators are already recognized by the lexer (^ & * and []) */

/* priority 1 */
"."                                        { return '.'; }


(\"\")|(\".*?([^\\]\"))                    { return 'STRING_LITERAL'; }
[0-9]+                                     { return 'NUMBER'; }

[{SYMBOL}{ALPHA}][{SYMBOL}{ALPHA}{DIGIT}]* { return 'NAME'; }
<<EOF>>                                    { return 'EOF'; }

/lex

%start translation_unit

%%

translation_unit
  : program_definition EOF
  ;

program_definition
  : PROGRAM NAME ';' body
  ;

body
  : BEGIN END
  | BEGIN statement_list END
  ;

statement_list
  : statement
  | statement_list statement
  ;

statement
  : frame_statement
  | expression_statement
  ;

frame_statement
  : FRAME
  | FRAME '(' ')'
  ;

expression_statement
  : ';'
  | expression ';'
  ;

expression
  : assignment_expression
  | expression ',' assignment_expression
  ;

assignment_expression
  : comparison_expression
  | assignment_left_side assignment_expression
  ;

assignment_left_side
  : NAME assignment_operator
  ;

assignment_operator
  : '='
  | '*='
  | '/='
  | '%='
  | '+='
  | '-='
  | '&='
  | '|='
  | '^='
  | '<<='
  | '>>='
  ;

comparison_expression
  : boolean_expression
  | comparison_expression comparison_operator boolean_expression
  ;


comparison_operator
  : '=='
  | '!='
  | '>='
  | '<='
  | '<'
  | '>'
  ;

boolean_expression
  : shift_expression
  | boolean_expression boolean_operator shift_expression
  ;

boolean_operator
  : '&&'
  | '&'
  | '||'
  | '|'
  | '^^'
  | '^'
  ;

shift_expression
  : additive_expression
  | shift_expression shift_operator additive_expression
  ;

shift_operator
  : '<<'
  | '>>'
  ;

additive_expression
  : multiplicative_expression
  | additive_expression additive_operator multiplicative_expression
  ;

additive_operator
  : '+'
  | '-'
  ;

multiplicative_expression
  : unary_expression
  | multiplicative_expression multiplicative_operator unary_expression
  ;

multiplicative_operator
  : '/'
  | '*'
  | '%'
  ;

unary_expression
  : postfix_expression
  | unary_operator unary_expression
  ;

unary_operator
  : '-'
  | '!'
  | '&'
  | '*'
  ;

postfix_expression
  : access_expression
  | postfix_expression '[' expression ']'
  | postfix_expression '++'
  | postfix_expression '--'
  ;

access_expression
  : primary_expression
  | access_expression '.' NAME
  ;

primary_expression
  : NAME
  | NUMBER
  | STRING_LITERAL
  | '(' expression ')'
  ;
