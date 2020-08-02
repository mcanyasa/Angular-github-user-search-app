import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from '../../services/apicall.service';
import { Users } from '../../users';
import { Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  isFavorite:boolean =true
  users : Users[] = [];
  favoriteArray = [];

  constructor( private storage:LocalStorageService,public httpClient: HttpClient,private apiService: ApicallService,private router : Router) { }

  ngOnInit(): void {
    this.favoriteArray = this.storage.retrieve('userInfos');
    //console.log("this.favoriteArray",this.favoriteArray );
  }

  getUserList() {
    this.apiService
    .getUsers(event)
    .subscribe((data:any) => {
      this.users = data.items;
    });
    this.isFavorite = false;
  }

  clkToRmvBtn(user_id:any):void{
    this.favoriteArray = this.favoriteArray.filter(function(fav){
      return fav != user_id;
    });
  }

}
