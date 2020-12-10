import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { HospitalService } from '../../../services/hospital.service';
import { SearchesService } from 'src/app/services/searches.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean =  true;

  public imgSub:Subscription;

  constructor(private hospitalService:HospitalService, private modalImageService: ModalImageService, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSub = this.modalImageService.newImage.pipe(delay(200)).subscribe(img => this.loadHospitals());
  }

  search(term:string) {

    if (term.length === 0) {
      return this.loadHospitals();
    }

    this.searchesService.search('hospitals', term).subscribe(results => {
      this.hospitals = results;
    });
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe(hospitals => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveChanges(hospital:Hospital) {
    this.hospitalService.updateHospital(hospital.id, hospital.name).subscribe(() => {
      Swal.fire('Updated', hospital.name, 'success');
    });
  }

  deleteHospital(hospital:Hospital) {
    this.hospitalService.deleteHospital(hospital.id).subscribe(() => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }

  async openSweetAlertModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      input: 'text',
      inputLabel: 'Hospital name',
      inputPlaceholder: 'Enter hospital name',
      showCancelButton: true
    });

   if (value.trim().length > 0) {
     this.hospitalService.createHospital(value).subscribe((response:any) => {
       this.hospitals.push(response.hospital);
     });
   }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital.id, hospital.img);
  }

}
