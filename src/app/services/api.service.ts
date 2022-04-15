import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/deviceList/"

  getDevice(){
    return this.http.get<any>(this.url);
  }

  postDevice(data: any){
    return this.http.post<any>(this.url, data);
  }

  updateDevice(data:any, id: number){
    return this.http.put<any>(this.url+id, data);
  }

  deleteDevice(id: number){
    return this.http.delete<any>(this.url+id);
  }
}