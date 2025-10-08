import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { WorkSubTypeService, WorkSubTypeDTO, WorkTypeDTO } from './work-sub-type-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {LoggedInUser} from '../../components/logged-in-user/logged-in-user';
import {Header} from '../../../../shared/pages/components/header/header';


@Component({
  selector: 'app-work-sub-type',
  templateUrl: './work-sub-type-page.html',
  styleUrls: ['./work-sub-type-page.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    LoggedInUser,
    Header
  ]
})
export class WorkSubTypePage implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['workSubTypeId', 'workSubType', 'workType', 'edit', 'delete'];
  dataSource = new MatTableDataSource<WorkSubTypeDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Modal state
  editModalOpen = false;
  deleteModalOpen = false;
  isLoading = false;

  // Selected row for edit/delete
  selectedRow: WorkSubTypeDTO | null = null;

  // Reactive forms
  editForm!: FormGroup;
  insertForm!: FormGroup;

  // Work Types for dropdown
  workTypes: WorkTypeDTO[] = [];

  // Filter
  selectedWorkTypeFilter: number | null = null;

  constructor(
    private fb: FormBuilder,
    private workSubTypeService: WorkSubTypeService
  ) {}

  ngOnInit() {
    this.initEditForm();
    this.initInsertForm();
    this.loadWorkTypes();
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initEditForm() {
    this.editForm = this.fb.group({
      workSubTypeId: [{ value: null, disabled: true }],
      workSubType: ['', [Validators.required, Validators.minLength(2)]],
      workTypeId: [null, Validators.required]
    });
  }

  initInsertForm() {
    this.insertForm = this.fb.group({
      workSubType: ['', [Validators.required, Validators.minLength(2)]],
      workTypeId: [null, Validators.required]
    });
  }

  loadWorkTypes() {
    this.workSubTypeService.getAllWorkTypes().subscribe({
      next: (types) => {
        this.workTypes = types;
      },
      error: (error) => {
        console.error('Error loading work types:', error);
        alert('Error loading work types');
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.workSubTypeService.getAllWorkSubTypes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading data:', error);
        alert('Error loading data');
      }
    });
  }

  // Filter by Work Type
  applyWorkTypeFilter() {
    if (this.selectedWorkTypeFilter === null) {
      this.loadData();
    } else {
      this.isLoading = true;
      this.workSubTypeService.getWorkSubTypesByWorkTypeId(this.selectedWorkTypeFilter).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error filtering data:', error);
          alert('Error filtering data');
        }
      });
    }
  }

  clearFilter() {
    this.selectedWorkTypeFilter = null;
    this.loadData();
  }

  // ---------- CREATE ----------
  saveInsert() {
    if (this.insertForm.invalid) {
      this.insertForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const newEntry: WorkSubTypeDTO = {
      workSubType: this.insertForm.get('workSubType')!.value,
      workTypeId: this.insertForm.get('workTypeId')!.value
    };

    this.workSubTypeService.createWorkSubType(newEntry).subscribe({
      next: () => {
        this.loadData();
        this.insertForm.reset({ workSubType: '', workTypeId: null });
        this.isLoading = false;
        alert('Work sub type created successfully');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating work sub type:', error);
        alert('Error creating work sub type');
      }
    });
  }

  cancelInsert() {
    this.insertForm.reset({ workSubType: '', workTypeId: null });
  }

  // ---------- UPDATE ----------
  openEditModal(row: WorkSubTypeDTO) {
    this.selectedRow = { ...row };
    this.editForm.patchValue({
      workSubTypeId: this.selectedRow.workSubTypeId,
      workSubType: this.selectedRow.workSubType,
      workTypeId: this.selectedRow.workTypeId
    });
    this.editModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.selectedRow = null;
    this.editForm.reset();
    document.body.style.overflow = '';
  }

  saveEdit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    if (!this.selectedRow?.workSubTypeId) return;

    this.isLoading = true;
    const updated: WorkSubTypeDTO = {
      workSubTypeId: this.selectedRow.workSubTypeId,
      workSubType: this.editForm.get('workSubType')!.value,
      workTypeId: this.editForm.get('workTypeId')!.value
    };

    this.workSubTypeService.updateWorkSubType(this.selectedRow.workSubTypeId, updated).subscribe({
      next: () => {
        this.loadData();
        this.closeEditModal();
        this.isLoading = false;
        alert('Work sub type updated successfully');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating work sub type:', error);
        alert('Error updating work sub type');
      }
    });
  }

  // ---------- DELETE ----------
  openDeleteModal(row: WorkSubTypeDTO) {
    this.selectedRow = { ...row };
    this.deleteModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
    this.selectedRow = null;
    document.body.style.overflow = '';
  }

  confirmDelete() {
    if (!this.selectedRow?.workSubTypeId) return;

    this.isLoading = true;
    this.workSubTypeService.deleteWorkSubType(this.selectedRow.workSubTypeId).subscribe({
      next: () => {
        this.loadData();
        this.closeDeleteModal();
        this.isLoading = false;
        alert('Work sub type deleted successfully');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error deleting work sub type:', error);
        alert('Error deleting work sub type');
      }
    });
  }

  getWorkTypeName(workTypeId?: number): string {
    if (!workTypeId) return 'N/A';
    const workType = this.workTypes.find(wt => wt.id === workTypeId);
    return workType ? workType.workType : 'Unknown';
  }
}
