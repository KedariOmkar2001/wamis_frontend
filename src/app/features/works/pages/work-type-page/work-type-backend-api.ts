import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TableData} from './work-type-service';


export interface TableDate{
  position:number;
  workType:string;
  workTypeCode:string;
  isImportant:boolean;
}


@Injectable({
  providedIn: 'root'
})


export class WorkTypeBackendApi {

  private baseUrl = "http://localhost:8080/api/v1/worktypes";

  constructor(private http: HttpClient) { }

  getWorkTypes(): Observable<TableData[]>{
    return this.http.get<TableData[]>(this.baseUrl);
  }

  addWorkType(entry: TableData): Observable<TableData>{
    return this.http.post<TableData>(this.baseUrl,entry);
  }

  updateWorkType(entry: TableData): Observable<TableData>{
    return this.http.put<TableData>(`${this.baseUrl}/${entry.position}`,entry);
  }

  deleteWorkType(id:number):Observable<void>{
    return this.http.delete<void>(`$this.baseUrl}/${id}`);
  }

}
