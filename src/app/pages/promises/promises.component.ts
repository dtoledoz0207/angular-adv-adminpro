import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then(users => {
      console.log(users);
    });

    /*const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Finish promise');
      } else {
        reject('Error in promise');
      }
    });

    promise.then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
    console.log('End of Init function'); */

  }

  getUsers() {

    const promise = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then(body => resolve(body.data));
    });

    return promise;
  }

}
