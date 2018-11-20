import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
   public userIsAuthenticated: boolean;
   private authStatusSubs: Subscription;

   constructor(private authService: AuthService) {}

   ngOnInit() {
      this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(status => {
         this.userIsAuthenticated = status;
      })
   }

   onLogout() {
      this.authService.logout();
   }

   ngOnDestroy() {
      this.authStatusSubs.unsubscribe();
   }
}