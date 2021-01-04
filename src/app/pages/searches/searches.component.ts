import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';

import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({term}) => this.globalSearches(term));
  }

  globalSearches(term:string) {
    this.searchesService.globalSearches(term).subscribe((response: any) => {
      this.users = response.users;
      this.doctors = response.doctors;
      this.hospitals = response.hospitals;
    });
  }

}
