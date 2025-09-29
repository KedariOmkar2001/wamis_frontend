import { Component } from '@angular/core';
import {NavMenu} from '../../components/nav-menu/nav-menu';
import {Header} from '../../../../shared/pages/components/header/header';
import {LoggedInUser} from '../../components/logged-in-user/logged-in-user';
import {WorkModules} from '../../components/work-modules/work-modules';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-works-page',
  imports: [
    NavMenu,
    Header,
    LoggedInUser,
    WorkModules,
    RouterLink
  ],
  templateUrl: './works-page.html',
  styleUrl: './works-page.css'
})
export class WorksPage {

}
