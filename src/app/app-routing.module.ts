import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { BlogListComponent } from "./blogs/blog-list/blog-list.component";
import { BlogCreateEditComponent } from "./blogs/blog-create-edit/blog-create-edit.component";


const routes: Routes = [
   {path: '', component: BlogListComponent},
   {path: 'create-edit', component: BlogCreateEditComponent},
   {path: 'create-edit/:id', component: BlogCreateEditComponent}
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})

export class AppRoutingModule {}
