import { Component, OnInit, OnDestroy } from "@angular/core";
import { BlogService } from "../blog.service";
import { Blog } from "../blog.model";
import { Subscription } from 'rxjs'
import { Router } from "@angular/router";


@Component({
   selector: 'app-blog-list',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy{
   blogs: Blog[] = [];
   blogSubscription: Subscription;

   constructor(private blogService: BlogService, private router: Router) {}

   ngOnInit() {
      this.blogService.getAllBlogs()
      
      this.blogSubscription = this.blogService.getBlogUpdate()
         .subscribe(blogs => {
            this.blogs = blogs;
      })
   }
   
   editBlog(blogId) {
      this.router.navigate(['/create-edit', blogId])
   }
   
   ngOnDestroy() {
      this.blogSubscription.unsubscribe();
   }
}