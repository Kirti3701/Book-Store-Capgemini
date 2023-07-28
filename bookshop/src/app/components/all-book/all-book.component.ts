import { Component, NgModule, OnInit} from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})

export class AllBookComponent implements OnInit{
Books:any = []
  constructor(private crudApi : CrudService) {}
  ngOnInit(): void {
    this.crudApi.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }
  delete(id:any, i:any){
    console.log(id);
    if(window.confirm("Are you sure you want to delete this book?")){
      this.crudApi.deleteBook(id).subscribe(res=>{
        this.Books.splice(i, 1)       
      })
    }
  }
}

