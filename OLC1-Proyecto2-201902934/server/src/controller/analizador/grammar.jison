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
"return"            return 'RETURN';
"continue"          return 'CONTINUE';

"void"              return 'VOID';

"tolower"           return 'TOLOWER';
"toupper"           return 'TOUPPER';
"length"            return 'LENGTH';
"truncate"          return 'TRUNCATE';
"round"             return 'ROUND';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';

"while"             return 'WHILE';
"do"                return 'DO';
"for"               return 'FOR';

"list"              return 'LIST';
"new"               return 'NEW';
"add"               return 'ADD';

"exec"              return 'EXEC';


";"                 return 'PTCOMA';
":"                 return 'DBPUNTO';
","                 return 'COMA';
"."                 return 'PUNTO';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';

"++"                return 'INCREMENTAR';
"--"                return 'DECREMENTAR';


"+"					return 'MAS';
"-"					return 'MENOS';
"/"                 return 'DIVISION';
"*"					return 'MULTIPLICACION';
"%"					return 'MODULO';
"^"					return 'POTENCIA';
"?"                 return 'INTERROGACION';

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


\"(\\\"|\\n|\\t|\\r|\\\\|[^\"])*\"                { yytext = escapes(yytext.substr(1,yyleng-2)); 	return 'CADENA'; }
[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t))?[\']  { yytext = escapes(yytext.substr(1,yyleng-2)); 	return 'CARACTER'; }
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
    const Return = require('./instrucciones/Return');
    const Incremento = require('./instrucciones/Incremento');
    const Decremento = require('./instrucciones/Decremento');
    const MasMas = require('./expression/MasMas');
    const MenosMenos = require('./expression/MenosMenos');
    const While = require('./instrucciones/While');
    const DoWhile = require('./instrucciones/DoWhile');
    const For = require('./instrucciones/For');
    const Funciones = require('./instrucciones/Funciones');
    const Parametros = require('./instrucciones/Parametros');
    const Llamada = require('./instrucciones/LlamadaFunciones');
    const Continue = require('./instrucciones/Continue');
    const Metodos = require('./instrucciones/Metodos');
    const Nativas = require('./instrucciones/Nativas');
    const Ternario = require('./instrucciones/Ternario');
    const DVector = require('./instrucciones/DeclararVector');
    const AVector = require('./instrucciones/AccesoVector');
    const MVector = require('./instrucciones/ModificarVector');
    const DLista = require('./instrucciones/DeclararLista');
    const ALista = require('./instrucciones/AddLista');
    const AcLista = require('./instrucciones/AccesoLista');
    const MLista = require('./instrucciones/ModificarLista');
    const ToCharArray = require('./instrucciones/ToCharArray');
    const Exect = require('./instrucciones/Exec');

    function escapes(sec){
        sec = sec.replace(/\\n/g, '\n');
        sec = sec.replace(/\\\\/g, '\\');
        sec = sec.replace(/\\\"/g, '\"');
        sec = sec.replace(/\\t/g, '\t');
        sec = sec.replace(/\\\'/g, '\'');
        return sec;
    }


%}

// PRECEDENCIA

%left 'DBPUNTO'
%left 'INTERROGACION'
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
	: DEFPRINT              { $$ = $1; }
    | DECLARARVARIABLE      { $$ = $1; }
    | ASIGNARVARIABLE       { $$ = $1; }
    | SENTENCIAIF           { $$ = $1; }
    | SENTENCIASWITCH       { $$ = $1; }
    | INSTRUCCIONBREAK      { $$ = $1; }
    | INSTRUCCIONRETURN     { $$ = $1; }
    | INSTRUCCIONCONTINUE   { $$ = $1; }
    | SENTENCIAWHILE        { $$ = $1; }
    | INCREMENTO            { $$ = $1; }
    | SENTENCIADOWHILE      { $$ = $1; }
    | SENTENCIAFOR          { $$ = $1; }
    | FUNCIONES             { $$ = $1; }
    | METODOS               { $$ = $1; }
    | LLAMADA               { $$ = $1; }
    | DECLARARVECTOR        { $$ = $1; }
    | MODIFICARVECTOR       { $$ = $1; }
    | DLISTA                { $$ = $1; }
    | ALISTA                { $$ = $1; }
    | MLISTA                { $$ = $1; }
    | LLAMADAEXEC           { $$ = $1; }
	| error                 { $$ = new Excepcion.default('Sintactico','No se esperaba: ' + yytext, this._$.first_line, this._$.first_column); }
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

INSTRUCCIONCONTINUE
    : CONTINUE PTCOMA                         { $$ = new Continue.default(@1.first_line, @1.first_column, $1); }
;

INSTRUCCIONRETURN
    : RETURN PTCOMA                         { $$ = new Return.default(@1.first_line, @1.first_column, null); }
    | RETURN EXPRESION PTCOMA               { $$ = new Return.default(@1.first_line, @1.first_column, $2); }
;

SENTENCIAWHILE
    : WHILE PARIZQ EXPRESION PARDER LLAIZQ INSTRUCCIONES LLADER  { $$ = new While.default(@1.first_line, @1.first_column, $3, $6); }
;

INCREMENTO
    : IDENTIFICADOR INCREMENTAR PTCOMA      { $$ = new Incremento.default(@1.first_line, @1.first_column, $1); }
    | IDENTIFICADOR DECREMENTAR PTCOMA      { $$ = new Decremento.default(@1.first_line, @1.first_column, $1); }
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
    | IDENTIFICADOR DECREMENTAR         { $$ = new Decremento.default(@1.first_line, @1.first_column, $1); }
    | IDENTIFICADOR IGUAL EXPRESION     { $$ = new Asignacion.default(@1.first_line, @1.first_column, $1, $3); }
;

FUNCIONES
    : TIPO IDENTIFICADOR PARIZQ PARAMETROS PARDER LLAIZQ INSTRUCCIONES LLADER   { $$ = new Funciones.default(@1.first_line, @1.first_column, $1, $2, $7, $4); }
    | TIPO IDENTIFICADOR PARIZQ PARDER LLAIZQ INSTRUCCIONES LLADER              { $$ = new Funciones.default(@1.first_line, @1.first_column, $1, $2, $6, null); }
;

METODOS
    : VOID IDENTIFICADOR PARIZQ PARAMETROS PARDER LLAIZQ INSTRUCCIONES LLADER   { $$ = new Metodos.default(@1.first_line, @1.first_column, $2, $7, $4); }
    | VOID IDENTIFICADOR PARIZQ PARDER LLAIZQ INSTRUCCIONES LLADER              { $$ = new Metodos.default(@1.first_line, @1.first_column, $2, $6, null); }
;

PARAMETROS
    : PARAMETROS COMA TIPO IDENTIFICADOR    { $1.push(new Parametros.default(@1.first_line, @1.first_column, $3, $4)); $$ = $1; }
    | TIPO IDENTIFICADOR                    { $$ = [new Parametros.default(@1.first_line, @1.first_column, $1, $2)]; }
;

LLAMADA
    : IDENTIFICADOR PARIZQ PARAMETROS_LLAMADA PARDER PTCOMA    { $$ = new Llamada.default(@1.first_line, @1.first_column, $1, $3); }
    | IDENTIFICADOR PARIZQ PARDER PTCOMA                       { $$ = new Llamada.default(@1.first_line, @1.first_column, $1, null); }
;

PARAMETROS_LLAMADA
    : PARAMETROS_LLAMADA COMA EXPRESION    { $1.push($3); $$ = $1; }
    | EXPRESION                            { $$ = [$1]; }
;

DECLARARVECTOR
    : TIPO CORIZQ CORDER IDENTIFICADOR IGUAL NEW TIPO CORIZQ EXPRESION CORDER PTCOMA    { $$ = new DVector.default(@1.first_line, @1.first_column, $1, $4, $7, $9, null); }
    | TIPO CORIZQ CORDER IDENTIFICADOR IGUAL LLAIZQ LISTAVALORES LLADER PTCOMA          { $$ = new DVector.default(@1.first_line, @1.first_column, $1, $4, null, null, $7); }
;

LISTAVALORES
    : LISTAVALORES COMA EXPRESION    { $1.push($3); $$ = $1; }
    | EXPRESION                      { $$ = [$1]; }
;

MODIFICARVECTOR
    : IDENTIFICADOR CORIZQ EXPRESION CORDER IGUAL EXPRESION PTCOMA  { $$ = new MVector.default(@1.first_line, @1.first_column, $1, $3, $6); }
;

DLISTA
    : LIST MENORQUE TIPO MAYORQUE IDENTIFICADOR IGUAL NEW LIST MENORQUE TIPO MAYORQUE PTCOMA       { $$ = new DLista.default(@1.first_line, @1.first_column, $3, $5, $10); }
    | LIST MENORQUE TIPO MAYORQUE IDENTIFICADOR IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PTCOMA   { $$ = new ToCharArray.default(@1.first_line, @1.first_column, $3, $5, $9); }
;

ALISTA
    : IDENTIFICADOR PUNTO ADD PARIZQ EXPRESION PARDER PTCOMA    { $$ = new ALista.default(@1.first_line, @1.first_column, $1, $5); }
;

MLISTA
    : IDENTIFICADOR CORIZQ CORIZQ EXPRESION CORDER CORDER IGUAL EXPRESION PTCOMA  { $$ = new MLista.default(@1.first_line, @1.first_column, $1, $4, $8); }
;

LLAMADAEXEC
    : EXEC IDENTIFICADOR PARIZQ PARAMETROS_LLAMADA PARDER PTCOMA    { $$ = new Exect.default(@1.first_line, @1.first_column, $2, $4); }
    | EXEC IDENTIFICADOR PARIZQ PARDER PTCOMA                       { $$ = new Exect.default(@1.first_line, @1.first_column, $2, null); }
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
    | IDENTIFICADOR PARIZQ PARAMETROS_LLAMADA PARDER    { $$ = new Llamada.default(@1.first_line, @1.first_column, $1, $3); }
    | IDENTIFICADOR PARIZQ PARDER                       { $$ = new Llamada.default(@1.first_line, @1.first_column, $1, null); }
    | TOLOWER PARIZQ EXPRESION PARDER        { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.TOLOWER, $3); }
    | TOUPPER PARIZQ EXPRESION PARDER        { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.TOUPPER, $3); }
    | LENGTH PARIZQ EXPRESION PARDER         { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.LENGTH, $3); }
    | TRUNCATE PARIZQ EXPRESION PARDER       { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.TRUNCATE, $3); }
    | ROUND PARIZQ EXPRESION PARDER          { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.ROUND, $3); }
    | TYPEOF PARIZQ EXPRESION PARDER         { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.TYPEOF, $3); }
    | TOSTRING PARIZQ EXPRESION PARDER       { $$ = new Nativas.default(@1.first_line, @1.first_column, Nativas.OperadorNativas.TOSTRING, $3); }
    | EXPRESION INTERROGACION EXPRESION DBPUNTO EXPRESION    { $$ = new Ternario.default(@1.first_line, @1.first_column, $1, $3, $5); }
    | IDENTIFICADOR CORIZQ EXPRESION CORDER                  { $$ = new AVector.default(@1.first_line, @1.first_column, $1, $3); }
    | IDENTIFICADOR CORIZQ CORIZQ EXPRESION CORDER CORDER    { $$ = new AcLista.default(@1.first_line, @1.first_column, $1, $4); }
;

TIPO 
    : INT       { $$ = Tipo.tipos.ENTERO; }
    | DOUBLE    { $$ = Tipo.tipos.DECIMAL; }
    | BOOLEAN   { $$ = Tipo.tipos.BOOLEAN; }
    | CHAR      { $$ = Tipo.tipos.CARACTER; }
    | STRING    { $$ = Tipo.tipos.CADENA; }
;