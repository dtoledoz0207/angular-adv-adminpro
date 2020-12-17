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
      this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId);
    });
  }

  loadDoctor(idDoctor:string) {

    if (idDoctor === 'new') {
      return;
    }

    this.doctorService.getDoctorById(idDoctor).subscribe(doctor => {
      //console.log(doctor);
      if (!doctor) {
        return this.router.navigateByUrl('/dashboard/doctors');
      }
      const { name, hospital: {_id} } = doctor;
      this.doctorSelected = doctor;
      this.doctorForm.setValue({name, hospital: _id});
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {

    if (this.doctorSelected) {

      const data = {
        ...this.doctorForm.value,
        id: this.doctorSelected.id
      }

      this.doctorService.updateDoctor(data).subscribe(response => {
        console.log(response);
        Swal.fire('Success', 'Doctor updated successfully', 'success');
      });

    } else {
      const {name} = this.doctorForm.value;
      this.doctorService.createDoctor(this.doctorForm.value).subscribe((response:any) => {
        Swal.fire('Doctor created', `${name} created successfully`, 'success');
        this.router.navigateByUrl(`/dashboard/doctor/${response.doctor.id}`);
      });
    }
  }

}
