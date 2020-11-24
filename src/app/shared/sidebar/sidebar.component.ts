import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuOptions: any[];

  public user:User;

  constructor(private sidebarService: SidebarService, private userService: UserService) {
    this.menuOptions = this.sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
