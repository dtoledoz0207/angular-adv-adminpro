import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreasingComponent } from './increasing/increasing.component';



@NgModule({
  declarations: [
    IncreasingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    IncreasingComponent
  ]
})
export class ComponentsModule { }
