import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BlogService } from "../blog.service";
import { Blog } from "../blog.model"
import { Route, Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
   selector: 'app-blog-create-edit',
   templateUrl: './blog-create-edit.component.html',
   styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent implements OnInit{
   isLoading: boolean
   blogForm: FormGroup;
   blogs: Blog[] = [];
   blogId: any = null;

   constructor(public blogService: BlogService, 
               private router: Router,
               private route: ActivatedRoute) {
      // blogService.getAllBlogs();
   }

   ngOnInit () {
      this.blogService.getAllBlogs();
      this.isLoading = false;
      this.blogForm = new FormGroup({
         'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
         'subtitle': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
         'content': new FormControl(null, {validators: [Validators.required]})
      })
      // this.blogs = this.blogService.getAllBlogs();
      this.blogId = this.route.snapshot.paramMap.get('id');
      if(this.blogId) {
         this.blogService.getBlog(this.blogId)
            .subscribe(data => {
               this.blogForm.setValue({
                  title: data.blog.title, 
                  subtitle: data.blog.subtitle,
                  content: data.blog.content
               })
            })
      }
   }

   onSaveBlog() {
      if(this.blogForm.invalid) {
         return;
      }
      if(!this.blogId) {
         this.blogService.saveBlog( 
            this.blogForm.value.title, 
            this.blogForm.value.subtitle,
            this.blogForm.value.content
         )
      }

      if(this.blogId) {
         this.blogService.updateBlog(this.blogId, {
            id: this.blogId,
            title: this.blogForm.value.title,
            subtitle: this.blogForm.value.subtitle,
            content: this.blogForm.value.content 
         })
      }
      this.router.navigate(['/'])
   }
}