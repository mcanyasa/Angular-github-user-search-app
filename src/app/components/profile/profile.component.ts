import { Component, OnInit , Input, EventEmitter, Output } from '@angular/core';
import { Router, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { Users, UserDetails } from 'src/app/users';
import { ApicallService } from '../../services/apicall.service';
import {  Injectable, NgZone ,Injector } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


@Injectable()
export class ProfileComponent implements OnInit {
  favoriteArray = [];
  isInFavorite:boolean = false;
  userInfos: [];
  users :Users;
  userDetail: UserDetails;
  usrList: Array<UserDetails> = [];

  @Input('pUser') user_id: any; 
  @Output() valueChange = new EventEmitter();
  
  constructor( private storage:LocalStorageService,private injector: Injector,private router : Router, private apiService: ApicallService,private route: ActivatedRoute, public  zone: NgZone) {
   
  }

  ngOnInit(): void {
   
    this.favoriteArray = this.storage.retrieve('userInfos');

    if(this.favoriteArray===null || this.favoriteArray.length === 0){
      this.favoriteArray = [];
    }

    if(this.favoriteArray.includes(this.user_id)){
      this.isInFavorite = true;
    }else{
      this.isInFavorite = false;
    }

    this.apiService
    .getUsersDetail(this.user_id)
    .subscribe((data:UserDetails) => {
    this.userDetail = data;
    });
    this.navigateToDetail;
  }

  removeFavoriteList(){
    const kk = this.user_id;
    this.favoriteArray = this.favoriteArray.filter(function(fav){
     
      return fav != kk;
    });
    this.userInfos = this.storage.store('userInfos', this.favoriteArray);
    this.valueChange.emit(this.user_id);
    this.isInFavorite = false;
  }

  addFavoriteList(){
      if(!this.favoriteArray.includes(this.user_id) && this.favoriteArray.length < 5 ){
        this.favoriteArray.push(this.user_id);
        this.userInfos = this.storage.store('userInfos', this.favoriteArray);
        this.isInFavorite = true;
      }
  }

  navigateToDetail():void{
    const routerService = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);
    ngZone.run(() => { routerService.navigate(['/user', this.userDetail.id]) });
  }

}