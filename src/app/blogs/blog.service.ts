import { Injectable } from "@angular/core";
import { Blog } from "./blog.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class BlogService {
  private blogs: Blog[] = [];
  private url: string = 'http://localhost:3000/';
  private blogUpdate = new Subject<Blog[]>();

  constructor(private http: HttpClient) { }

  getBlogUpdate() {
    return this.blogUpdate.asObservable();
  }

  saveBlog(title: string, subtitle: string, content: string) {
    this.http
      .post<{ message: string }>(this.url + '/create', { title: title, subtitle: subtitle, content: content })
      .subscribe((response) => {
        console.log(response.message);
      })
  }

  getAllBlogs() {
    this.http
      .get<{ blogs: any, message: string }>(this.url)
      .pipe(map(data => {
        console.log(data.message);
        return data.blogs.map(blog => {
          return {
            id: blog.id,
            title: blog.title,
            subtitle: blog.subtitle,
            content: blog.content,
          }
        })
      }))
      .subscribe(transformedData => {
        this.blogs = transformedData;
        this.blogUpdate.next([...this.blogs]);
      })
  }

  getBlog(blogId) {
    return this.http.get<{blog: Blog}>(this.url + blogId)
  }

  updateBlog(blogId, blog: Blog) {
    this.http
      .put(this.url + blogId, blog)
      .subscribe(result => {
        console.log(result);
      })
  }
}