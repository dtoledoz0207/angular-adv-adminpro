import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.returnObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs: ', value),
    //   err => console.warn('Error: ', err),
    //   () => console.log('Obs finishsed')
    // );

    this.returnInterval().subscribe(value => {
      console.log(value);
    })

  }


  returnInterval(): Observable<number> {
    const interval$ = interval(1000).pipe(take(5), map(value => value + 1));
    return interval$;
  }


  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i is 2');
        }

      }, 1000);
    });

    return obs$;
  }

}
