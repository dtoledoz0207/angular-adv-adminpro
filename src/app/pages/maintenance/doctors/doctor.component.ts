import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: ['Hector', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {
    console.log(this.doctorForm.value);
  }

}
