import { Component } from '@angular/core';
import pestaña from './pestaña';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'client';
  inicio = 0;
  tab = new pestaña(this.inicio,"", "");
  listTabs : pestaña [] = [];
  tmp : any;
  index : any;
  file : File = null;


  constructor(private http : HttpClient){
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
    this.defineIndex();
    this.file = <File>event.target.files[0]; 
    var reader:FileReader = new FileReader();
    var tmp : any = this.listTabs;
    var ind = this.index;
    reader.onloadend = function(e){
      console.log(reader.result);
      tmp[ind].console = reader.result;
    }
    reader.readAsText(this.file);
  }

  saveTextAsFile (data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
    // FOR IE:

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


    expFile() {
      this.defineIndex();
      this.saveTextAsFile(this.listTabs[this.index].content, this.listTabs[this.index].nombre);
    }


}
