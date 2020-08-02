import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserDetails } from 'src/app/users';
import { ApicallService } from '../../services/apicall.service';
import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css']
})

@Injectable()
export class ProfilDetailComponent implements OnInit {
 
  userDetail: UserDetails;

  constructor(private router : Router, private apiService: ApicallService,private route: ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.apiService
      .getUsersDetail(params.id)
      .subscribe((data:UserDetails) => {
       this.userDetail = data;
      });
     
    });
    
  }

  bckToNavigate():void{
    this._location.back();
  }

}
