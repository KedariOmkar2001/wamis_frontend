import {NgModule} from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import {LandingPage} from './shared/pages/landing-page/landing-page';
import {WorksPage} from './features/works/pages/works-page/works-page';
import {WorkTypePage} from './features/works/pages/work-type-page/work-type-page';
import {WorkSubTypePage} from './features/works/pages/work-sub-type-page/work-sub-type-page';
import {WorkTypePageBackendComponent} from './features/works/pages/work-type-page-backend/work-type-page-backend';
import {DocumentsPage} from './features/works/pages/documents-page/documents-page';
import {TestPage} from './features/works/pages/test-page/test-page';

export const routes: Routes = [
  {path:'',component:LandingPage},
  {path:'works',component:WorksPage},
  {path:'worktype',component:WorkTypePage},
  {path:'worksubtype',component:WorkSubTypePage},
  {path:'system',component:WorkTypePageBackendComponent},
  {path:'document',component:DocumentsPage},
  {path:'test',component:TestPage}
]


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
