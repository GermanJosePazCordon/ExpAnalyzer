import { Component } from '@angular/core';
import pestaña from './models/pestaña';
import {FormControl} from '@angular/forms';
import { Interpretar } from './models/interpretar';
import { AppService } from './services/app.service';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'client';
  inicio = 0; //Contador para las pestañas
  tab = new pestaña(this.inicio,"", ""); //Pestaña
  index  = new FormControl(0); //Variable que guarda el indice del tab actual
  listTabs : pestaña [] = []; //Lista que guarda las pestañas
  file : File = null; //Variable para guardar el evento del archivo a cargar
  dot : String = ""; //Variable para guardar el contido del dot del ast
  dotTable : String = ""; //Variable para guardar el contido del dot de la tabla
  dotErr : String = ""; //Variable para guardar el contido del dot de los errores


  interpretar : Interpretar = {
    entrada : ''
  }

  constructor(private compilador : AppService){
    this.listTabs.push(this.tab);
    
  }

  ngOnInit(){}

  addTab(){
    this.inicio = this.inicio + 1;
    var tmp = new pestaña(this.inicio,"", "");
    this.listTabs.push(tmp);
  }


  deleteTab(){
    console.log("tab a eliminar: " + this.index.value);
    this.listTabs.splice(this.index.value, 1);
  }

  openFile(event){
    this.file = <File>event.target.files[0]; 
    var reader:FileReader = new FileReader();
    var tmp : any = this.listTabs;
    var ind = this.index.value;
    reader.onloadend = function(e){
      console.log(reader.result);
      tmp[ind].content = reader.result;
    }
    reader.readAsText(this.file);
    //this.file = null;
  }

  saveFile(data, filename){
    if(!data) {
        console.error('No hay archivo para guardar')
        return;
    }
    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
      var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        e.initEvent('click', true, false);
        a.dispatchEvent(e);
      }
  }

  exportFile() {
    this.saveFile(this.listTabs[this.index.value].content, "tab" + this.listTabs[this.index.value].nombre + ".ty");
  }

  compile(){
    this.interpretar.entrada = this.listTabs[this.index.value].content;
    this.compilador.compilar(this.interpretar).subscribe(
      res=>{
        console.log(res);
        this.listTabs[this.index.value].console = res.valor;
        this.dot = res.dot;
        this.dotTable = res.table;
        this.dotErr = res.err;
      },err=>{
        console.log(err);
        this.listTabs[this.index.value].console = "NO COMPILO NADA 🥺";
      }
    );
  }
  
  graphAST(){
    graphviz("#graphAST").renderDot(this.dot);
  }

  graphTable(){
    graphviz("#graphTab").renderDot(this.dotTable);
  }

  graphErr(){
    graphviz("#graphErr").renderDot(this.dotErr);
  }

}
