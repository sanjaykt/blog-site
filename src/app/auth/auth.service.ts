import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.data";
import { Subject } from "rxjs";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class AuthService {
   private url: string = 'http://localhost:3000/';
   private token: string;
   private authStatusListener = new Subject<boolean>();

   constructor(private http: HttpClient,
      private router: Router) { }

   getAuthStatusListener() {
      return this.authStatusListener.asObservable();
   }

   createUser(email: string, password: string) {
      const authData: AuthData = { email: email, password: password }
      this.http
         .post(this.url + 'signup', authData)
         .subscribe(response => {
            console.log(response)
            this.router.navigate(['/'])
         })
   }

   login(email: string, password: string) {
      const authData: AuthData = { email: email, password: password }
      this.http
         .post<{ token: string, email: string }>(this.url + 'login', authData)
         .subscribe(response => {
            this.token = response.token;
            this.authStatusListener.next(true);
            console.log(response.email);
            this.router.navigate(['/']);
         })
   }

   logout() {
      this.token = null;
      this.authStatusListener.next(false);
      this.router.navigate(['/']);
   }

   getToken() {
      return this.token;
   }
}