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

    const promise = new Promise((resolve, reject) => {

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

    console.log('End of Init function');

  }

}
