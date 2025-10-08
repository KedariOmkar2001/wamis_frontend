import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface WorkTypeDTO {
  id?: number;
  workType: string;
  workTypeCode: string;
  isImportant: boolean;
}

export interface WorkSubTypeDTO {
  workSubTypeId?: number;
  workSubType: string;
  workTypeId: number;
  workType?: WorkTypeDTO;
}

@Injectable({
  providedIn: 'root'
})
export class WorkSubTypeService {
  private baseUrl = 'http://localhost:8080/api/work-sub-types';
  private workTypeUrl = 'http://localhost:8080/api/work-types';

  constructor(private http: HttpClient) {}

  // Work Sub Type CRUD Operations
  getAllWorkSubTypes(): Observable<WorkSubTypeDTO[]> {
    return this.http.get<WorkSubTypeDTO[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getWorkSubTypeById(id: number): Observable<WorkSubTypeDTO> {
    return this.http.get<WorkSubTypeDTO>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getWorkSubTypesByWorkTypeId(workTypeId: number): Observable<WorkSubTypeDTO[]> {
    return this.http.get<WorkSubTypeDTO[]>(`${this.baseUrl}/by-work-type/${workTypeId}`)
      .pipe(catchError(this.handleError));
  }

  createWorkSubType(workSubType: WorkSubTypeDTO): Observable<WorkSubTypeDTO> {
    return this.http.post<WorkSubTypeDTO>(this.baseUrl, workSubType)
      .pipe(catchError(this.handleError));
  }

  updateWorkSubType(id: number, workSubType: WorkSubTypeDTO): Observable<WorkSubTypeDTO> {
    return this.http.put<WorkSubTypeDTO>(`${this.baseUrl}/${id}`, workSubType)
      .pipe(catchError(this.handleError));
  }

  deleteWorkSubType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get all Work Types for dropdown
  getAllWorkTypes(): Observable<WorkTypeDTO[]> {
    return this.http.get<WorkTypeDTO[]>(this.workTypeUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
