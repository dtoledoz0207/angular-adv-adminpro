import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuOptions: any[];

  constructor(private sidebarService: SidebarService) {
    this.menuOptions = this.sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
