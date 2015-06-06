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

translation_unit
  : program_definition EOF
  ;

program_definition
  : PROGRAM NAME ';' body
  ;

body
  : BEGIN group_of_sentences
  ;

group_of_sentences
  : END
  | sentence_list END
  ;

group_of_sentences_for_if_else
  : ELSE
  | sentence_list ELSE
  ;

sentence
  : if_sentence
  | switch_sentence
  | while_sentence
  | repeat_sentence opt_end
  | loop_sentence
  | from_sentence
  | for_sentence
  | BREAK opt_end
  | CONTINUE opt_end
  | return_sentence opt_end
  | frame_sentence opt_end
  | clone_sentence
  | DEBUG opt_end
  | call ';'
  | assignment_sentence ';'
  ;

/* It exists to relax the rules for ; in sentences. */
/* TODO: Check the cases! */
opt_end
  : /* empty */
  | ';'
  ;

if_sentence
  : IF '(' expression ')' group_of_sentences
  | IF '(' expression ')' group_of_sentences_for_if_else group_of_sentences
  ;

switch_sentence
  : SWITCH '(' expression ')' group_of_cases
  ;

sentence_list
  : sentence
  | sentence_list sentence
  ;

group_of_cases
  : END
  | default END
  | case_list END
  | case_list default END
  ;

case_list
  : case
  | case_list case
  ;

case
  : CASE range ':' group_of_sentences
  ;

default
  : DEFAULT ':' group_of_sentences
  ;

range
  : expression
  | expression '..' expression
  ;

while_sentence
  : WHILE '(' expression ')' group_of_sentences
  ;

repeat_sentence
  : REPEAT group_of_sentences_for_repeat
  ;

group_of_sentences_for_repeat
  : until_condition
  | sentence_list until_condition 
  ;

until_condition
  : UNTIL '(' expression ')'
  ;

loop_sentence
  : LOOP group_of_sentences
  ;

from_sentence
  : FROM assignment_sentence TO expression ';' group_of_sentences
  | FROM assignment_sentence TO expression STEP expression ';' group_of_sentences
  ;

for_sentence
  : FOR for_params group_of_sentences
  ;

/* The closing bracket is included in increment */
for_params
  : '(' initialization condition increment
  ;

initialization
  : ';'
  | list_of_assignments ';'
  ;

condition
  : ';'
  | expression ';'
  ;

increment
  : ')'
  | list_of_assignments ')'
  ;

list_of_assignments
  : assignment_sentence
  | list_of_assignments ',' assignment_sentence
  ;

return_sentence
  : RETURN
  | RETURN '(' expression ')'
  ;

frame_sentence
  : FRAME
  | FRAME '(' expression ')'
  ;

clone_sentence
  : CLONE group_of_sentences
  ;

call
  : NAME '(' ')'
  | NAME '(' expression_list ')'
  ;

expression_list
  : expression
  | expression_list ',' expression
  ;

assignment_sentence
  : NAME assignment_operator expression
  | NAME '++'
  | NAME '--'
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

expression
  : boolean_expression
  | expression comparison_operator boolean_expression
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
  | call
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
