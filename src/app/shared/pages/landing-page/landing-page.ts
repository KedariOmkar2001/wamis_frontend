import { Component } from '@angular/core';
import {Header} from '../components/header/header';
import {HeroComponent} from '../components/hero/hero';
import {Footer} from '../components/footer/footer';
import {WorkModules} from '../../../features/works/components/work-modules/work-modules';
import {Modules} from '../components/modules/modules';

@Component({
  selector: 'app-landing-page',
  imports: [
    Header,
    HeroComponent,
    Footer,
    WorkModules,
    Modules
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
