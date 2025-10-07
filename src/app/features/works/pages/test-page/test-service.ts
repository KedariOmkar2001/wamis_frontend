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
export class TestService {
  // ✅ Include the full URL with protocol
  private baseUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  // Get all document folders + files
  getDocuments(): Observable<DocumentFolder[]> {
    console.log('Fetching documents from:', this.baseUrl);
    return this.http.get<DocumentFolder[]>(this.baseUrl);
  }

  // Trigger file download
  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    link.click();
  }
}
