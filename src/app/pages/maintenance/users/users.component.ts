import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public totalUsers:number = 0;
  public users:User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadUsers(0).subscribe(({total, users}) => {
      this.totalUsers = total;
      this.users = users;
    });
  }

}
