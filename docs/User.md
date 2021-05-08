# Manual de Usuario <h1>
  
  
Descripción general del programa
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


Descripción de los Pasos para su Uso
-----------------------

#### Archivos de Entrada ####
Se puede cargar o crear un archivo de entrada. Para ello se debe presionar el boton open con el cual se le abrira un selector de archivos. Para abrir solo se debe seleccionar el archivo y presionar abrir, cabe destacar que solamente se podran ejecutar correctamente archivos de texto plano.

#### Guardar Archivo ####
Para guardar archivos se debera presionar el boton de save, esto funciona de tal manera que guarda el texto que se encuentr en el editor y crea un archivo de texto plano con extension .ty. El archivo se encontrara en sus descargas.

#### Pestañas ####
La seccion de pestañas cuenta con dos botones. El primero de ellos es para crear una nueva, al presionar new tab en la barra de pestañas aparecera una nueva pestaña con un editor y consola nuevos. El segundo boton es el de eliminar, este elimina la pestaña en la que se encuentre actualmente. Cabe destacar que el boton de eliminar pestaña estara inhabilitado si solamente existe una pestaña.

#### Editor y Consola ####
El editor en el cuadro que aparece al lado izquierdo, en el se pueden escribir y editar todas las lineas de codigo que se deseen. Por el contrario, la consola es el cuadro de la derecha, en el solamente se prodrá visualizar los resultados de compilar el codigo del editor, por lo que no perimite su edicion ni modificacion. Para ejecutar el codigo escritro en el editor se debe presionar el boton compile.

#### Reportes ####
Existe tres tipos de reportes. El primero es el reporte AST, para ello se debe presionar el boton AST, al hacer esto debajo del editor y consola aparecera la imagen del arbol AST correspondiente. El segundo reporte es el de la tabla de simbolos, para ello se debe presionar el boton Table y presionar justo a la par de la barra roja que se encuentra debajo del editor, con esto se podrá visualizar la tabla de simbolos. Este proceso debe repetirse si se quiere el reporte de errores con la modificacion de que el boton a presionar es el de Error. Cabe destacar que solamente se generan reportes si antes se ha presionado el boton compile.

Glosario de Términos 
-----------------------
Término |  Definición 
------------ | -------------
Consola | Espacio donde se muestran los resultados obtenidos luego de la interpretación o compilación de un codigo de programación.
Editor | Espacio para escribir todas las lineas de código de un programa.
Exec | Palabra reservada utilizada para poder ejecutar todo el código generado dentro del lenguaje.
Expresion regular | Son patrones utilizados para encontrar una determinada combinación de caracteres dentro de una cadena de texto.
Gramatica | Es el conjunto de reglas que deben seguirse al escribir el código fuente de los programas para considerarse como correctos para ese lenguaje de programación.
IDE | Entorno de desarrollo integrado, es aplicación informática que proporciona herramientas que facilitan el desarrollo se software.
Interfaz | Se utiliza en informática para nombrar a la conexión funcional entre dos sistemas, programas, dispositivos o componentes de cualquier tipo.


