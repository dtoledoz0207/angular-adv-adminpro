import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  constructor(private hospitalService:HospitalService) { }

  ngOnInit(): void {
    this.hospitalService.loadHospitals().subscribe(hospitals => {
      console.log(hospitals);
    })
  }

}
