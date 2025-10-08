import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from "@angular/router";
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-work-modules',
  imports: [AccordionModule, RouterLink, ButtonModule, NgForOf],
  templateUrl: './work-modules.html',
  styleUrl: './work-modules.css'
})
export class WorkModules {
  activeIndex: number | undefined = 0;
  active: string | undefined;

  activeIndexChange(index : number){
    this.activeIndex = index
  }


  modulesall:any[] = [
    {title:"Work Type",link:"/work-type"},
    {title:"Work Sub Type",link:"/work-sub-sub-type"},
    {title:"Authority",link:"/authority"},
  ];

  modules = [
    {
      title: "Work",
      link: "/work",
      children: [
        { title: "Work Type", link: "/worktype" },
        { title: "Work Sub Type", link: "/worksubtype" }
      ]
    },
    {
      title: "Administration",
      link: "/admin",
      children: [
        { title: "Authority", link: "/authority" },
        { title: "Departments", link: "/departments" }
      ]
    }
  ];




}
