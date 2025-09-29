import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'edit-work-type-dialog',
  templateUrl: './edit-work-type-dialog.html',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule]
})
export class DialogBasicDemo {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
