import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../../services/modal-image.service';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public loading:boolean = true;
  public doctors:Doctor[] = [];

  constructor(private doctorService:DoctorService, private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe(doctors => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  openModal(doctor:Doctor) {
    this.modalImageService.openModal('doctors', doctor.id, doctor.img);
  }

}
