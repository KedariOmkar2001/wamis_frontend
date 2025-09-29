import {NgModule} from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import {LandingPage} from './shared/pages/landing-page/landing-page';
import {WorksPage} from './features/works/pages/works-page/works-page';
import {WorkTypePage} from './features/works/pages/work-type-page/work-type-page';

export const routes: Routes = [
  {path:'',component:LandingPage},
  {path:'works',component:WorksPage},
  {path:'worktype',component:WorkTypePage}
]


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
