import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkTypeService, TableData } from './work-type-service';
import { LoggedInUser } from '../../components/logged-in-user/logged-in-user';
import { Header } from '../../../../shared/pages/components/header/header';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type-page.html',
  // If you use separate css - keep it empty or for non-tailwind styles
  styleUrls: ['./work-type-page.css'],
  imports: [
    LoggedInUser,
    Header,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ]
})
export class WorkTypePage implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'workType', 'workTypeCode', 'isImportant', 'edit', 'delete'];
  dataSource = new MatTableDataSource<TableData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // modal state
  editModalOpen = false;
  deleteModalOpen = false;

  // currently selected row for edit/delete
  selectedRow: TableData | null = null;

  // reactive form for edit
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private svc: WorkTypeService) {}

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initForm() {
    this.editForm = this.fb.group({
      position: [{ value: null, disabled: true }],
      workType: ['', Validators.required],
      workTypeCode: ['', Validators.required],
      isImportant: [false]
    });
  }

  loadData() {
    const rows = this.svc.getWorkTypes();
    this.dataSource.data = rows;
  }

  // ---------- EDIT ----------
  openEditModal(row: TableData) {
    this.selectedRow = { ...row }; // copy
    this.editForm.patchValue({
      position: this.selectedRow.position,
      workType: this.selectedRow.workType,
      workTypeCode: this.selectedRow.workTypeCode,
      isImportant: this.selectedRow.isImportant
    });
    this.editModalOpen = true;
    // prevent body scroll while modal open
    document.body.style.overflow = 'hidden';
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.selectedRow = null;
    document.body.style.overflow = '';
  }

  saveEdit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const updated: TableData = {
      position: this.selectedRow!.position,
      workType: this.editForm.get('workType')!.value,
      workTypeCode: this.editForm.get('workTypeCode')!.value,
      isImportant: this.editForm.get('isImportant')!.value,
    };

    // update via service (replace with HTTP call if needed)
    this.svc.updateWorkType(updated);
    this.loadData();
    this.closeEditModal();
  }

  // ---------- DELETE ----------
  openDeleteModal(row: TableData) {
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
    if (!this.selectedRow) return;
    this.svc.deleteWorkType(this.selectedRow.position);
    this.loadData();
    this.closeDeleteModal();
  }
}
