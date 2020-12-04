import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from './increasing/increasing.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncreasingComponent,
    DoughnutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncreasingComponent,
    DoughnutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
