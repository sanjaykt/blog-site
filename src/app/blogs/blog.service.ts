import { Injectable } from "@angular/core";
import { Blog } from "./blog.model";

@Injectable({providedIn: 'root'})
export class BlogService {
   private blogs: Blog[] = [];

   saveBlog(title:string, subtitle:string, content: string) {
      let id: string = this.generateSlug(title);
      this.blogs.push({
         id: id,
         title: title,
         subtitle: subtitle,
         content: content
       });
   }

   getAllBlogs(): Blog[] {
      return this.blogs;
   }

   getBlog(id: string) {
      // this.blogs.find(blog => blog.id === id)
      return this.blogs.find(blog => blog.id === id)
   }

   generateSlug (title): string {
      // clean the title of the any white space
      let count = 0;
      let slug: string = title.toLowerCase().replace(/\s+/g, '-');
       // returns array of all the same titles
       for(let blog of this.blogs) {
          if(blog.id.substring(0, slug.length) === slug) {
            count++;
          }
       }
        
       // checking the lenght of the array and add increameting number to slug
      // title + number
      if (count > 0) {
        slug = slug + count;
      }
       return slug;
    }
}