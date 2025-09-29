
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-hero-component',
  templateUrl: './hero.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  visible: boolean = false;
}
