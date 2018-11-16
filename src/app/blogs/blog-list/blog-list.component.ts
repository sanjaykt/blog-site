import { Component, OnInit, OnDestroy } from "@angular/core";
import { BlogService } from "../blog.service";
import { Blog } from "../blog.model";
import { Subscription } from 'rxjs'
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";


@Component({
   selector: 'app-blog-list',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy{
   blogs: Blog[] = [];
   blogSubscription: Subscription;
   userEmail: string;

   constructor(private blogService: BlogService, 
               private router: Router,
               private authService: AuthService) {}

   ngOnInit() {
      this.blogService.getAllBlogs()
      
      this.blogSubscription = this.blogService.getBlogUpdate()
         .subscribe(blogs => {
            this.blogs = blogs;
      })
      this.userEmail = 'No one is logged in...'
      let email =  this.authService.getUserEmail();
      if(email) {
            this.userEmail = email;
      }
      console.log(this.userEmail);
   }
   
   editBlog(blogId) {
      this.router.navigate(['/create-edit', blogId])
   }
   
   ngOnDestroy() {
      this.blogSubscription.unsubscribe();
   }
}