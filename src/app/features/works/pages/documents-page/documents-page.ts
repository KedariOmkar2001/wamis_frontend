import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DocumentFolder, DocumentService } from './documents-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, RouterLink],
  templateUrl: './documents-page.html',
  styleUrls: ['./documents-page.css']
})
export class DocumentsPage implements OnInit {
  documentFolders: DocumentFolder[] = [];
  expandedFolder: string | null = null;

  constructor(private documentsService: DocumentService) {}

  ngOnInit(): void {
    this.documentsService.getDocuments().subscribe({
      next: (data) => {
        console.log('Documents received:', data);
        this.documentFolders = data;
      },
      error: (err) => console.error('Error fetching documents:', err)
    });
  }

  toggleFolder(folderName: string): void {
    this.expandedFolder = this.expandedFolder === folderName ? null : folderName;
  }

  viewFile(file: any): void {
    window.open(file.url, '_blank');
  }

  downloadFile(file: any, folderName: string): void {
    this.documentsService.downloadFile(folderName, file.fileName);
  }
}
