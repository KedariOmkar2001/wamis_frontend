import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DocumentFolder, TestService } from './test-service';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './test-page.html',
  styleUrls: ['./test-page.css']
})
export class TestPage implements OnInit {
  documentFolders: DocumentFolder[] = [];
  expandedFolder: string | null = null;

  constructor(private documentsService: TestService) {}

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

  downloadFile(file: any): void {
    this.documentsService.downloadFile(file.url);
  }
}
