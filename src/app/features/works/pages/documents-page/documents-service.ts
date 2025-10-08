import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentFile {
  fileName: string;
  displayName: string;
  url: string;
}

export interface DocumentFolder {
  folder: string;
  files: DocumentFile[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  // Get all document folders + files
  getDocuments(): Observable<DocumentFolder[]> {
    console.log('Fetching documents from:', this.baseUrl);
    return this.http.get<DocumentFolder[]>(this.baseUrl);
  }

  downloadFile(folder: string, fileName: string): void {
    // base url for backend
    const url = `http://localhost:8080/api/documents/${folder}/${fileName}`;

    // gets the response as blob
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => console.error('Error downloading file', err)
    });
  }

}
