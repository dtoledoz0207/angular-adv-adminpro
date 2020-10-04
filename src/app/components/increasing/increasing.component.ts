import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent {

  // @Input('progressValue') progress: number = 80;
  @Input() progress: number = 80;

  @Output() outputValue: EventEmitter<number> = new EventEmitter();


  changeValue(value: number) {

    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

}
