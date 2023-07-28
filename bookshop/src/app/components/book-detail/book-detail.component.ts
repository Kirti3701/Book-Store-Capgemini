import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit  {
  getID : any;
  updateForm! : FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudApi: CrudService) {
      this.getID = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudApi.getBook(this.getID).subscribe(res=> {
        this.updateForm.setValue({
          title: res['title'],
          author: res['author'],
          imageurl: res['imageurl'],
          price: res['price'],
          featured: res['featured']
        })

      });
      this.updateForm = this.formBuilder.group({
        title:[''],
        author:[''],
        imageurl:[''],
        price:[''],
        featured:['']
      })
     }

  ngOnInit(): void {  }
  onUpdate(){
    const updatedBookData = this.updateForm.value
    if (updatedBookData.featured === false) {
      updatedBookData.featured = null
    }
    this.crudApi.UpdateBook(this.getID, this.updateForm.value).subscribe(res => {
      console.log("Data updated successfully")
      this.ngZone.run(() => this.router.navigateByUrl('/all-book'))
      }, (err) => {
        console.log(err);
      });
    }
}
