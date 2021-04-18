/*
    Organizacion de Lenguajes y Compiladores 1 "A"
    German Paz
*/

/* Definición Léxica */
%lex

%options case-insensitive

%%

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

/* Comentarios */
\s+                                 // se ignoran espacios en blanco
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

"print"             return 'RIMPRIMIR';

"int"               return 'INT';
"double"            return 'DOUBLE';
"boolean"           return 'BOOLEAN';
"char"              return 'CHAR';
"string"            return 'STRING';

"true"              return 'TRUE';
"false"             return 'FALSE';

";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';

"+"					return 'MAS';
"-"					return 'MENOS';
"/"                 return 'DIVISION';
"*"					return 'MULTIPLICACION';
"%"					return 'MODULO';
"^"					return 'POTENCIA';

"=="                return 'IGUALACION';
"!="                return 'DIFERENCIACION';
"<="                return 'MENORIGUAL';
">="                return 'MAYORIGUAL';

"!"                 return 'NOT';
"&&"                return 'AND';
"||"                return 'OR';
">"                 return 'MAYORQUE';
"<"                 return 'MENORQUE';
"="                 return "IGUAL";

\"[^\"]*\"				        { yytext = yytext.substr(1,yyleng-2); 	return 'CADENA'; }
\'[^\"]\'				        { yytext = yytext.substr(1,yyleng-2); 	return 'CARACTER'; }
[0-9]+("."[0-9]+)\b             return 'DECIMAL';
[0-9]+\b                        return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*         return 'IDENTIFICADOR';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{
    const Excepcion = require('./exception/Exception');
    const Tipo = require('./tablaSimbolos/Tipo');
    const Arbol = require('./tablaSimbolos/Arbol');
    const Primitiva = require('./expression/Primitiva');
    const Imprimir = require('./instrucciones/Imprimir');
    const Aritmetica = require('./expression/Aritmetica');
    const Relacional = require('./expression/Relacional');
    const Logica = require('./expression/Logica');
%}

// PRECEDENCIA

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALACION' 'DIFERENCIACION' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS' 
%left 'DIVISION' 'MULTIPLICACION' 'MODULO'
%left 'POTENCIA'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION     { $1.push($2); $$ = $1; }
	| INSTRUCCION                   { $$ = [$1]; }
;

INSTRUCCION
	: DEFPRINT           { $$ = $1; }
    | DECLARARVARIABLE   { $$ = $1; }
	| error PTCOMA       { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

DEFPRINT
    : RIMPRIMIR PARIZQ EXPRESION PARDER PTCOMA  { $$ = new Imprimir.default($3, @1.first_line, @1.first_column); }
;

DECLARARVARIABLE
    //: TIPO IDENTIFICADOR PTCOMA                     { $$ = "tipo: " + $1 + " id: " + $2 + "  valor: null"; }
    : TIPO IDENTIFICADOR IGUAL EXPRESION PTCOMA     { $$ = new Imprimir.default($4, @1.first_line, @1.first_column); }
;

TIPO 
    : INT       { $$ = $1; }
    | DOUBLE    { $$ = $1; }
    | BOOLEAN   { $$ = $1; }
    | CHAR      { $$ = $1; }
    | STRING    { $$ = $1; }
;

EXPRESION
    : EXPRESION MAS EXPRESION               { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.SUMA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENOS EXPRESION             { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.RESTA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIVISION EXPRESION          { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.DIVISION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MULTIPLICACION EXPRESION    { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MULTIPLICACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MODULO EXPRESION            { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MODULO, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION POTENCIA EXPRESION          { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.POTENCIA, @1.first_line, @1.first_column, $1, $3); }
    | MENOS EXPRESION                       { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MENOSUNARIO, @1.first_line, @1.first_column, null, $2); }
    | EXPRESION IGUALACION EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.IGUALACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIFERENCIACION EXPRESION    { $$ = new Relacional.default( Relacional.OperadorRelacional.DIFERENCIACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENORQUE EXPRESION          { $$ = new Relacional.default( Relacional.OperadorRelacional.MENORQUE, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENORIGUAL EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.MENORIGUAL, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MAYORQUE EXPRESION          { $$ = new Relacional.default( Relacional.OperadorRelacional.MAYORQUE, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MAYORIGUAL EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.MAYORIGUAL, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION OR EXPRESION                { $$ = new Logica.default( Logica.OperadorLogico.OR, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION AND EXPRESION               { $$ = new Logica.default( Logica.OperadorLogico.AND, @1.first_line, @1.first_column, $1, $3); }
    | NOT EXPRESION                         { $$ = new Logica.default( Logica.OperadorLogico.NOT, @1.first_line, @1.first_column, null, $2); }
    | ENTERO                                { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.ENTERO),$1, @1.first_line, @1.first_column); }
    | DECIMAL                               { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.DECIMAL),$1, @1.first_line, @1.first_column); }
    | CARACTER                              { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.CARACTER),$1, @1.first_line, @1.first_column); }
    | TRUE                                  { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.BOOLEAN),$1, @1.first_line, @1.first_column); }
    | FALSE                                 { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.BOOLEAN),$1, @1.first_line, @1.first_column); }
    | CADENA                                { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.CADENA),$1, @1.first_line, @1.first_column); }
;