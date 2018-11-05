import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlogService } from "../blog.service";
import { Blog } from "../blog.model"
import { Route, Router } from "@angular/router";

@Component({
   selector: 'app-blog-create-edit',
   templateUrl: './blog-create-edit.component.html',
   styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent implements OnInit{
   isLoading: boolean
   blogForm: FormGroup;
   blogs: Blog[] = [];

   constructor(public blogService: BlogService, private router: Router) {
      blogService.getAllBlogs();
   }

   ngOnInit () {
      this.isLoading = false;
      this.blogForm = new FormGroup({
         'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
         'subtitle': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
         'content': new FormControl(null, {validators: [Validators.required]})
      })
      this.blogs = this.blogService.getAllBlogs();
   }

   onSaveBlog() {
      if(this.blogForm.invalid) {
         return;
      }
      this.blogService.saveBlog( 
         this.blogForm.value.title, 
         this.blogForm.value.subtitle,
         this.blogForm.value.content
      )
      this.router.navigate(['/'])
   }
}