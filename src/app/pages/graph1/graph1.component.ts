import { Component } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {

  public chartLabels1:string[] = ['Download', 'In-Store', 'Mail-Order'];
  public chartData1 = [
    [350, 450, 100]
  ];

}
