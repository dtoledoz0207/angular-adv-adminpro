import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { SearchesService } from '../../../services/searches.service';
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
  public usersTemp:User[] = [];
  public from:number = 0;
  public loading:boolean = true;

  constructor(private userService: UserService, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.loadUsers(this.from).subscribe(({total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;

      this.loading = false;
    });
  }

  changePage(value:number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }

  search(term:string) {

    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.searchesService.search('users', term).subscribe(results => {
      this.users = results;
    });
  }

  deleteUser(user:User) {
    Swal.fire({
      title: 'Delete user',
      text: `Do you want to delete at ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(response => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );

          this.loadUsers();
        });
      }
    })
  }

}
