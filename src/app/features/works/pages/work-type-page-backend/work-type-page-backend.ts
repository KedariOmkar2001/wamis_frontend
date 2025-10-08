import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { WorkTypeService } from './work-type-page-backend-service'; // Note: Fixed the import name
import { WorkType } from './work-type.model';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatTable} from '@angular/material/table'

import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-type-page-backend',
  templateUrl: './work-type-page-backend.html',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    ReactiveFormsModule,
    MatCardTitle,
    MatFormField,
    MatCardContent,
    MatTable,
    MatError,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ],
  styleUrls: ['./work-type-page-backend.css']
})
export class WorkTypePageBackendComponent implements OnInit {
  workTypeForm: FormGroup;

  workTypes: WorkType[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  editMode: boolean = false;
  editingId: number | null = null; // Fix: Changed type from 'null' to 'number | null'

  constructor(
    private fb: FormBuilder,
    private workTypeService: WorkTypeService
  ) {
    this.workTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadWorkTypes();
  }

  loadWorkTypes(): void {
    this.workTypeService.getAllWorkTypes().subscribe({
      next: (workTypes) => {
        this.workTypes = workTypes;
      },
      error: (error) => {
        console.error('Error loading work types:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.workTypeForm.valid) {
      const workType: WorkType = this.workTypeForm.value;

      if (this.editMode && this.editingId !== null) { // Fix: Added null check for safety
        this.workTypeService.updateWorkType(this.editingId, workType).subscribe({
          next: () => {
            this.loadWorkTypes();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating work type:', error);
          }
        });
      } else {
        this.workTypeService.createWorkType(workType).subscribe({
          next: () => {
            this.loadWorkTypes();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating work type:', error);
          }
        });
      }
    }
  }

  editWorkType(workType: WorkType): void {
    this.editMode = true;
    this.editingId = workType.id ?? null; // Fix: Handle undefined id by assigning null
    this.workTypeForm.patchValue({
      name: workType.name,
      description: workType.description
    });
  }

  deleteWorkType(id: number): void {
    if (confirm('Are you sure you want to delete this work type?')) {
      this.workTypeService.deleteWorkType(id).subscribe({
        next: () => {
          this.loadWorkTypes();
        },
        error: (error) => {
          console.error('Error deleting work type:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.workTypeForm.reset();
    this.editMode = false;
    this.editingId = null;
  }
}
