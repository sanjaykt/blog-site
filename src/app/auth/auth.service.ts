import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.data";


@Injectable({providedIn: 'root'})
export class AuthService {
   private url: string = 'http://localhost:3000/';
   private userEmail: string;
   private token: string;

   constructor(private http: HttpClient) {}

   createUser(email: string, password: string) {
      const authData: AuthData = {email: email, password: password}
      this.http
         .post(this.url + 'signup', authData)
         .subscribe(response => {
            console.log(response)
         })
   }

   login(email: string, password: string) {
      const authData: AuthData = {email: email, password: password}
      this.http
         .post<{token: string, email: string}>(this.url + 'login', authData)
         .subscribe(response => {
            this.userEmail = response.email;
            this.token = response.token;
         })
   }

   getToken() {
      return this.token;
   }

   getUserEmail() {
      return this.userEmail;
   }
}