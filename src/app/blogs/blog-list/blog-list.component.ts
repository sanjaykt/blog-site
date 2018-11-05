import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";
import { Blog } from "../blog.model";


@Component({
   selector: 'app-blog-list',
   templateUrl: './blog-list.component.html',
   styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{
   blogs: Blog[] = [];

   constructor(private blogService: BlogService) {}

   ngOnInit() {
      this.blogs = this.blogService.getAllBlogs();
      if(this.blogs) {
         for(let blog of this.blogs) {
            console.log(blog)
         }    
      }
   }
}