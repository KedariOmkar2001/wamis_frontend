import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkType } from './work-type.model';

@Injectable({
  providedIn: 'root'
})
export class WorkTypeService {
  private apiUrl = 'http://localhost:8080/api/work-types';

  constructor(private http: HttpClient) { }

  getAllWorkTypes(): Observable<WorkType[]> {
    return this.http.get<WorkType[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getWorkTypeById(id: number): Observable<WorkType> {
    return this.http.get<WorkType>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createWorkType(workType: WorkType): Observable<WorkType> {
    return this.http.post<WorkType>(this.apiUrl, workType)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateWorkType(id: number, workType: WorkType): Observable<WorkType> {
    return this.http.put<WorkType>(`${this.apiUrl}/${id}`, workType)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteWorkType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
