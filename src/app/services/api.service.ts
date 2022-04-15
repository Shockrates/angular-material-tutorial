import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/deviceList/"

  getAllDevices():Observable<Device[]>{
    return this.http.get<Device[]>(this.url);
  }

  postDevice(data: Device):Observable<Device>{
    return this.http.post<Device>(this.url, data);
  }

  updateDevice(data:any, id: number){
    return this.http.put<any>(this.url+id, data);
  }

  deleteDevice(id: number){
    return this.http.delete<any>(this.url+id);
  }
}
