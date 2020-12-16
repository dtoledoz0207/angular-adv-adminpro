import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

import { Hospital } from '../../../models/hospital.model';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  public doctorSelected: Doctor;
  public hospitalSelected: Hospital;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService, private doctorService: DoctorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
      this.loadDoctor(id);
    });

    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSelected = this.hospitals.find(h => h.id === hospitalId);
    });
  }

  loadDoctor(idDoctor:string) {
    this.doctorService.getDoctorById(idDoctor).subscribe(doctor => {
      console.log(doctor);
      this.doctorSelected = doctor;
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {
    const {name} = this.doctorForm.value;
    this.doctorService.createDoctor(this.doctorForm.value).subscribe((response:any) => {
      Swal.fire('Doctor created', `${name} created successfully`, 'success');
      this.router.navigateByUrl(`/dashboard/doctor/${response.doctor.id}`);
    });
  }

}
