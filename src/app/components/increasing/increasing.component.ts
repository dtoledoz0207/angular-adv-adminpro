import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent {

  // @Input('progressValue') progress: number = 80;
  @Input() progress: number = 80;


  changeValue(value: number) {

    if (this.progress >= 100 && value >= 0) {
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      return this.progress = 0;
    }

    this.progress = this.progress + value;
  }

}
