# Manual Técnico <h1>
  
Descripción de la Solución
-----------------------
  
TYPESTY es una aplicación web que le permitirá a los estudiantes de Introducción a la Programación y Computación 1 realizar sus primeras practicas, con un lenguaje de programación bastante intuitivo y similar a otros lenguajes. La aplicación consta con diferentes funcionalidades del entorno de trabajo, la primera es el editor, en el cual los usuarios pueden escribir sus lineas de código. A la par del editor se encuentra la consola en la cual se mostraran todos los resultados de compilar el código que el editor contenga. Adicional a estos en la parte superior se encuentra la barra de botones. Con las cuales se puede abrir un archivo, guardar, abrir un nueva pestaña, cerrar la pestaña actual, generar el reporte del arbol AST, tabla de simbolos y errors. El ultimo boton disponible es el de compilar.

  
Requerimientos del Entorno de Desarrollo
-----------------------
• IDE utilizada: Visual Studio Code version 1.55

• npm version 6.14.11

• node version v14.16.0

• Angular CLI: 11.2.5

• Espacio en memoria: 520 MB como mínimo

• Versión de Graphviz: graphviz version 2.38.0 (20140413.2041)

• Librerias utilizadas: [codemirror](https://www.npmjs.com/package/@ctrl/ngx-codemirror), [d3 graphviz](https://www.npmjs.com/package/d3-graphviz), [mat tab](https://material.angular.io/components/tabs/api)

Requerimientos Funcionales del Sistema
-----------------------
• Crear, cargar, modificar y guardar archivos .ty

• Análisis léxico, sintáctico y semáticos de archivos .ty

• Generar reporte de arbol AST.

• Generar reporte de Tabla de Símbolos.

• Generar reporte de Errores.

• Las imagenes para ser mostradas en la interfaz requieren tener instalado [graphviz](https://graphviz.org/download/)

Diccionario de Clases 
-----------------------

### Clases de Abstract ###
Clase |  Definición 
------------ | -------------
Instruccion | Clase abstracta que incializa los atributos que debera tener una instrucccion. 
NodoAST | Clase que inicializa los atributos y métodos que permite generar y almacenar los nodos del arbol AST.

### Clases de Exception ###
Clase |  Definición 
------------ | -------------
Exception | Clase con que recibe y arma el mensaje que se muestra el encontrar un error. 

### Clases de Expression ###
Clase |  Definición 
------------ | -------------
Aritmetica | Clase que alberga las operaciones aritmeticas: suma, resta, multiplicacion, division...
Case | Clase con el modelo utilizado para un case del switch case.
Logica | Clase con las operaciones logicas entre booleanos.
MasMas | Clase que realiza el incremento de una expresion.
MenosMenos | Clase que realiza el decremento de una expresion.
Primitiva | Clase con el modelo utilizado para almacenar un valor primitivo.
Relacional | Clase que alberga las operacion con operadores relacioneles: <, >, <=, >=, ==, !=. 
Variable | Clase con el modelo de una variable.

### Clases de Instrucciones ###
Clase |  Definición 
------------ | -------------
AccesoLista | Clase para acceder a la posicion de una lista.
AccesoVetor | Clase para acceder a la posicion de un vector.
AddLista | Clase para añadir elementos a una lista.
Asignacion | Clase para asignarle valor a una variable.
Break | Clase para instancian un break.
Casteo | Clase para realizar un casteo.
Continue | Clase para instancian un continue.
Declaracion | Clase realizar una declaracion.
DeclararLista | Clase declarar una lista.
DeclararVector | Clase declarar un vector.
Decremento | Clase para realizar un decremento.
DoWhile | Clase para hacer un do while.
ElseIf | Clase para efectuar un else if.
Exec | Clase hacer una llamada desde el exec.
For | Clase para realizar un for.
Funciones | Clase para instanciar y guardar funciones en la tabla de simbolos.
IF | Clase para efectuar un if.
IFElse | Clase para efectuar un if else.
Imprimir | Clase para imprimir expresiones.
Incremento | Clase para realizar un incremento.
LlamadaFunciones | Clase para ejecutar funciones.
Metodo | Clase para instanciar y guardar metodos en la tabla de simbolos.
ModificarLista | Clase para modificar los valores de una lista.
ModificarVector | Clase para modificar los valores de un vector.
Nativa | Clase para realizar todas las funciones nativas.
Parametro | Clase para instanciar un parametro para funcion o metodo.
Return | Clase para instanciar un retorno.
Switch | Clase para realizar una sentencia switch case.
Ternario | Clase efectuar un operador ternario.
ToCharArray | Clase hacer la funcion nativa toCharArray.
While | Clase realizar un while.

### Clases de Tabla de Simbolos ###
Clase |  Definición 
------------ | -------------
Arbol | Clase que alberga los atributos y metodos para almacenar y manejar los entornos.
Simbolo | Clase con el modelo de un simbolo.
TablaSimbolos | Clase que crear la tabla de simbolos almacenando en ella todos los simbolos del entorno.
Tipo | Clase con el modelo de un tipo de dato.

