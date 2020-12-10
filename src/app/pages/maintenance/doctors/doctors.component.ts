import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  openModal(doctor:Doctor) {
    this.modalImageService.openModal('doctors', doctor.id, doctor.img);
  }

}
