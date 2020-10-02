import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncreasingComponent } from './increasing/increasing.component';



@NgModule({
  declarations: [
    IncreasingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IncreasingComponent
  ]
})
export class ComponentsModule { }
