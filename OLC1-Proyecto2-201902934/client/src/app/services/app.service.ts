import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import json from '../models/json';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  compilar(data : any){
    return this.httpClient.post<json>('http://localhost:3000/run', data);
  }

}
