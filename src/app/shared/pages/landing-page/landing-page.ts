import { Component } from '@angular/core';
import {Header} from '../components/header/header';
import {HeroComponent} from '../components/hero/hero';
import {Footer} from '../components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    Header,
    HeroComponent,
    Footer
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
