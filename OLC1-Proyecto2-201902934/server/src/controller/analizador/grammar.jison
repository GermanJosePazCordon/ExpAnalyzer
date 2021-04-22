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

"if"                return 'RIF';
"else"              return 'RELSE';

"switch"            return 'SWITCH';
"case"              return 'CASE';
"break"             return 'BREAK';
"default"           return 'DEFAULT';

"while"             return 'WHILE';
"do"                return 'DO';
"for"               return 'FOR';

";"                 return 'PTCOMA';
":"                 return 'DBPUNTO';
"("                 return 'PARIZQ';
")"                 return 'PARDER';

"++"                return 'INCREMENTAR';
"--"                return 'DECREMENTAR';


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

"{"                 return 'LLAIZQ';
"}"                 return 'LLADER';


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
    const Declaracion = require('./instrucciones/Declaracion');
    const Asignacion = require('./instrucciones/Asignacion');
    const Castear = require('./instrucciones/Casteo');
    const Variable = require('./expression/Variable');
    const If = require('./instrucciones/IF');
    const IfElse = require('./instrucciones/IFElse');
    const ElseIF = require('./instrucciones/ElseIF');
    const Switch = require('./instrucciones/Switch');
    const Case = require('./expression/Case');
    const Break = require('./instrucciones/Break');
    const Incremento = require('./instrucciones/Incremento');
    const Decremento = require('./instrucciones/Decremento');
    const MasMas = require('./expression/MasMas');
    const MenosMenos = require('./expression/MenosMenos');
    const While = require('./instrucciones/While');
    const DoWhile = require('./instrucciones/DoWhile');
    const For = require('./instrucciones/For');
%}

// PRECEDENCIA

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUALACION' 'DIFERENCIACION' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS' 
%left 'INCREMENTAR' 'DECREMENTAR'
%left 'DIVISION' 'MULTIPLICACION' 'MODULO'
%left 'POTENCIA'
%right 'UNARIO'
 'PARIZQ' 'PARDER'

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
    | ASIGNARVARIABLE    { $$ = $1; }
    | SENTENCIAIF        { $$ = $1; }
    | SENTENCIASWITCH    { $$ = $1; }
    | INSTRUCCIONBREAK   { $$ = $1; }
    | SENTENCIAWHILE     { $$ = $1; }
    | INCREMENTO         { $$ = $1; }
    | SENTENCIADOWHILE   { $$ = $1; }
    | SENTENCIAFOR       { $$ = $1; }
	| error              { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

DEFPRINT
    : RIMPRIMIR PARIZQ EXPRESION PARDER PTCOMA      { $$ = new Imprimir.default($3, @1.first_line, @1.first_column); }
;

DECLARARVARIABLE
    : TIPO IDENTIFICADOR PTCOMA                     { $$ = new Declaracion.default(@1.first_line, @1.first_column, $1, $2, null); }
    | TIPO IDENTIFICADOR IGUAL EXPRESION PTCOMA     { $$ = new Declaracion.default(@1.first_line, @1.first_column, $1, $2, $4); }
;

ASIGNARVARIABLE
    : IDENTIFICADOR IGUAL EXPRESION PTCOMA          { $$ = new Asignacion.default(@1.first_line, @1.first_column, $1, $3); }
;

SENTENCIAIF
    : RIF PARIZQ EXPRESION PARDER LLAIZQ INSTRUCCIONES LLADER                                       { $$ = new If.default(@1.first_line, @1.first_column, $3, $6, "IF"); }
    | RIF PARIZQ EXPRESION PARDER LLAIZQ INSTRUCCIONES LLADER RELSE LLAIZQ INSTRUCCIONES LLADER     { $$ = new IfElse.default(@1.first_line, @1.first_column, $3, $6, $10, "IFELSE"); }
    | RIF PARIZQ EXPRESION PARDER LLAIZQ INSTRUCCIONES LLADER RELSE SENTENCIAIF                     { $$ = new ElseIF.default(@1.first_line, @1.first_column, $3, $6, $9, "ELSEIF"); }
;

SENTENCIASWITCH
    : SWITCH PARIZQ EXPRESION PARDER LLAIZQ CASELIST DEFAULTLIST LLADER         { $$ = new Switch.default(@1.first_line, @1.first_column, $3, $6, $7); }
    | SWITCH PARIZQ EXPRESION PARDER LLAIZQ CASELIST LLADER                     { $$ = new Switch.default(@1.first_line, @1.first_column, $3, $6, null); }
    | SWITCH PARIZQ EXPRESION PARDER LLAIZQ DEFAULTLIST LLADER                  { $$ = new Switch.default(@1.first_line, @1.first_column, $3, null, $6); }
;

CASELIST
    : CASELIST LISTACASE    { $1.push($2); $$ = $1; }
    | LISTACASE             { $$ = [$1]; }
;

LISTACASE
    : CASE EXPRESION DBPUNTO INSTRUCCIONES { $$ = new Case.default(@1.first_line, @1.first_column, $2, $4); }
;

DEFAULTLIST
    : DEFAULT DBPUNTO INSTRUCCIONES        { $$ = $3; }
;

INSTRUCCIONBREAK
    : BREAK PTCOMA                         { $$ = new Break.default(@1.first_line, @1.first_column, $1); }
;

SENTENCIAWHILE
    : WHILE PARIZQ EXPRESION PARDER LLAIZQ INSTRUCCIONES LLADER  { $$ = new While.default(@1.first_line, @1.first_column, $3, $6); }
;

INCREMENTO
    : EXPRESION INCREMENTAR PTCOMA      { $$ = new MasMas.default(@1.first_line, @1.first_column, $1); }
    | EXPRESION DECREMENTAR PTCOMA      { $$ = new MenosMenos.default(@1.first_line, @1.first_column, $1); }
;

SENTENCIADOWHILE
    : DO LLAIZQ INSTRUCCIONES LLADER WHILE PARIZQ EXPRESION PARDER PTCOMA   { $$ = new DoWhile.default(@1.first_line, @1.first_column, $3, $7); }
;

SENTENCIAFOR
    : FOR PARIZQ DECLARAFOR EXPRESION PTCOMA ACTUALIZACION PARDER LLAIZQ INSTRUCCIONES LLADER    { $$ = new For.default(@1.first_line, @1.first_column, $3, $4, $6, $9); }
;

DECLARAFOR
    : DECLARARVARIABLE  { $$ = $1; }
    | ASIGNARVARIABLE   { $$ = $1; } 
;


ACTUALIZACION
    : IDENTIFICADOR INCREMENTAR         { $$ = new Incremento.default(@1.first_line, @1.first_column, $1); }
    | IDENTIFICADOR DECREMENTAR         { $$ = new Decremento.default(@1.first_line, @1.first_column, $1, Aritmetica.OperadorAritmetico.MENOS); }
    | IDENTIFICADOR IGUAL EXPRESION     { $$ = new Asignacion.default(@1.first_line, @1.first_column, $1, $3); }
;

EXPRESION
    : EXPRESION MAS EXPRESION               { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.SUMA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENOS EXPRESION             { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.RESTA, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIVISION EXPRESION          { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.DIVISION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MULTIPLICACION EXPRESION    { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MULTIPLICACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MODULO EXPRESION            { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MODULO, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION POTENCIA EXPRESION          { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.POTENCIA, @1.first_line, @1.first_column, $1, $3); }
    | MENOS EXPRESION %prec UNARIO          { $$ = new Aritmetica.default( Aritmetica.OperadorAritmetico.MENOSUNARIO, @1.first_line, @1.first_column, $2, null); }
    | EXPRESION IGUALACION EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.IGUALACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION DIFERENCIACION EXPRESION    { $$ = new Relacional.default( Relacional.OperadorRelacional.DIFERENCIACION, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENORQUE EXPRESION          { $$ = new Relacional.default( Relacional.OperadorRelacional.MENORQUE, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MENORIGUAL EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.MENORIGUAL, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MAYORQUE EXPRESION          { $$ = new Relacional.default( Relacional.OperadorRelacional.MAYORQUE, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION MAYORIGUAL EXPRESION        { $$ = new Relacional.default( Relacional.OperadorRelacional.MAYORIGUAL, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION OR EXPRESION                { $$ = new Logica.default( Logica.OperadorLogico.OR, @1.first_line, @1.first_column, $1, $3); }
    | EXPRESION AND EXPRESION               { $$ = new Logica.default( Logica.OperadorLogico.AND, @1.first_line, @1.first_column, $1, $3); }
    | NOT EXPRESION                         { $$ = new Logica.default( Logica.OperadorLogico.NOT, @1.first_line, @1.first_column, $2, null); }
    | PARIZQ EXPRESION PARDER               { $$ = $2; }
    | PARIZQ TIPO PARDER EXPRESION          { $$ = new Castear.default(@1.first_line, @1.first_column, $2, $4); }
    | ENTERO                                { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.ENTERO),$1, @1.first_line, @1.first_column); }
    | DECIMAL                               { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.DECIMAL),$1, @1.first_line, @1.first_column); }
    | CARACTER                              { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.CARACTER),$1, @1.first_line, @1.first_column); }
    | TRUE                                  { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.BOOLEAN),$1, @1.first_line, @1.first_column); }
    | FALSE                                 { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.BOOLEAN),$1, @1.first_line, @1.first_column); }
    | CADENA                                { $$ = new Primitiva.default( new Tipo.default(Tipo.tipos.CADENA),$1, @1.first_line, @1.first_column); }
    | IDENTIFICADOR                         { $$ = new Variable.default(@1.first_line, @1.first_column, $1); }
    | EXPRESION INCREMENTAR                 { $$ = new MasMas.default(@1.first_line, @1.first_column, $1); }
    | EXPRESION DECREMENTAR                 { $$ = new MenosMenos.default(@1.first_line, @1.first_column, $1); }
;

TIPO 
    : INT       { $$ = Tipo.tipos.ENTERO; }
    | DOUBLE    { $$ = Tipo.tipos.DECIMAL; }
    | BOOLEAN   { $$ = Tipo.tipos.BOOLEAN; }
    | CHAR      { $$ = Tipo.tipos.CARACTER; }
    | STRING    { $$ = Tipo.tipos.CADENA; }
;