import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBookComponent } from './components/all-book/all-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'all-book', component: AllBookComponent
  },
  {
    path: 'add-book', component: AddBookComponent
  },
  {
    path: 'featured', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'edit-book/:id', component: BookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
