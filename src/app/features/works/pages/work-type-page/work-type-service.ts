import { Injectable } from '@angular/core';

export interface TableData {
  position: number;
  workType: string;
  workTypeCode: string;
  isImportant: boolean;
}

@Injectable({ providedIn: 'root' })
export class WorkTypeService {
  private workTypes: TableData[] = [
    { position: 1, workType: 'Bridge', workTypeCode: 'BR01', isImportant: true },
    { position: 2, workType: 'Road', workTypeCode: 'RD02', isImportant: false },
    { position: 3, workType: 'Building', workTypeCode: 'BL03', isImportant: true }
  ];

  getWorkTypes(): TableData[] {
    // return a copy to avoid accidental mutation
    return this.workTypes.map(w => ({ ...w }));
  }

  getNextPosition(): number {
    if (this.workTypes.length === 0) return 1;
    return Math.max(...this.workTypes.map(w => w.position)) + 1;
  }

  addWorkType(newEntry: TableData) {
    this.workTypes.push(newEntry);
  }

  updateWorkType(updated: TableData) {
    const idx = this.workTypes.findIndex(w => w.position === updated.position);
    if (idx !== -1) this.workTypes[idx] = { ...updated };
  }

  deleteWorkType(position: number) {
    this.workTypes = this.workTypes.filter(w => w.position !== position);
  }
}
