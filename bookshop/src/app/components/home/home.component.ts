import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
featuredBooks: any[] = []
  constructor(private crudApi: CrudService) {}

  ngOnInit() {
    this.fetchFeaturedBooks()
  }

  fetchFeaturedBooks() {
    this.crudApi.getFeaturedBooks().subscribe(res => {
      console.log(res);
      this.featuredBooks = res
    })
  }
  delete(id:any){
    console.log(id);
    if(window.confirm("Are you sure you want to delete this book?")){
      this.crudApi.deleteBook(id).subscribe(res=>{
        this.featuredBooks.splice(1, 1);
      })
    }
  }

}
