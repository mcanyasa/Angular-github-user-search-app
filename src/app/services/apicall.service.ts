import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users, UserDetails } from './../users';

import * as Rx from "rxjs/Rx";
import { Observable } from 'rxjs';
import { from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor(private httpClient: HttpClient) {}

 getUsersDetail(id :number):Observable<any> {
    return this.httpClient.get('https://api.github.com/user/'+id).
        pipe(
           map((data: UserDetails[]) => {
             return data;
           }), catchError( error => {
             return throwError( "Can not get User Details!!!" );
           })
        )
    } 

    getUsers(event):Observable<any> {
      return this.httpClient.get('https://api.github.com/search/users?q='+event.target.value+'').
          pipe(
             map((data: Users[]) => {
               return data;
             }), catchError( error => {
               return throwError( "Can not get User Details!!!" );
             })
          )
      }
}