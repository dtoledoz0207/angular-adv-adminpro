import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../../services/modal-image.service';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { SearchesService } from '../../../services/searches.service';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading:boolean = true;
  public doctors:Doctor[] = [];

  public imgSub:Subscription;

  constructor(private doctorService:DoctorService, private modalImageService: ModalImageService, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSub = this.modalImageService.newImage.pipe(delay(200)).subscribe(img => this.loadDoctors());
  }

  ngOnDestroy() {
    this.imgSub.unsubscribe();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe(doctors => {
      this.loading = false;
      this.doctors = doctors;
    });
  }


  search(term:string) {
    if (term.length === 0) {
      return this.loadDoctors();
    }

    this.searchesService.search('doctors', term).subscribe(results => {
      this.doctors = results;
    });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Delete doctor',
      text: `Do you want to delete at ${doctor.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.id).subscribe(response => {
          Swal.fire(
            'Deleted!',
            `${doctor.name} has been deleted.`,
            'success'
          );

          this.loadDoctors();
        });
      }
    })
  }

  openModal(doctor:Doctor) {
    this.modalImageService.openModal('doctors', doctor.id, doctor.img);
  }

}
