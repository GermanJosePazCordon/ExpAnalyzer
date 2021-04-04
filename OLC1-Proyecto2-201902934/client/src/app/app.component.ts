import { Component } from '@angular/core';
import pestaña from './models/pestaña';
import { Interpretar } from './models/interpretar';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'client';
  inicio = 0; //Contador para las pestañas
  tab = new pestaña(this.inicio,"", ""); //Pestaña
  listTabs : pestaña [] = []; //Lista que guarda las pestañas
  tmp : any; //Temporal para crear una pestaña
  index : any; //Variable que guarda el indice del tab actual
  file : File = null; //Variable para guardar el evento del archivo a cargar

  interpretar : Interpretar = {
    entrada : ''
  }

  constructor(private compilador : AppService){
    this.listTabs.push(this.tab);
    
  }

  ngOnInit(){}

  addTab(){
    this.inicio = this.inicio + 1;
    this.tmp = new pestaña(this.inicio,"", "");
    this.listTabs.push(this.tmp);
  }

  defineIndex(){
    if(!this.index){
      this.index = "0";
    }
  }

  deleteTab(){
    this.defineIndex();
    console.log(this.index)
    if(this.listTabs.length > 1){
      for(let i = 0; i < this.listTabs.length; i++){
        if(this.listTabs[i].nombre == this.index){
          console.log("lista: " + this.listTabs[i].nombre + "----- tab: " + this.index);
          var indice = this.listTabs.indexOf(this.listTabs[i]);
          this.listTabs.splice(indice, 1);
        }
      }
    }
  }

  findTab(event){
    this.index = event.tab.textLabel;
  }

  openFile(event){
    console.log("INDEX ANTES: " + this.index);
    this.defineIndex();
    console.log("INDEX DESPUES: " + this.index);
    this.file = <File>event.target.files[0]; 
    var reader:FileReader = new FileReader();
    var tmp : any = this.listTabs;
    var ind = this.index;
    reader.onloadend = function(e){
      console.log(reader.result);
      tmp[ind].content = reader.result;
    }
    reader.readAsText(this.file);
  }

  saveFile(data, filename){
    if(!data) {
        console.error('Console.save: No data')
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
    this.defineIndex();
    this.saveFile(this.listTabs[this.index].content, "tab" + this.listTabs[this.index].nombre + ".ty");
  }

  compile(){
    this.defineIndex();
    this.interpretar.entrada = this.listTabs[this.index].content;
    this.compilador.compilar(this.interpretar).subscribe(
      res=>{
        console.log(res);
        this.listTabs[this.index].console = res.valor;
      },err=>{
        console.log(err);
        this.listTabs[this.index].console = "NO COMPILO NADA 🥺";
      }
    );
  }

}
