import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router'
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
  ) {
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: [''],
      price: [''],
      imageurl: [''],
      featured: ['']
    })
  }

  ngOnInit() {}

  onSubmit(): any {
    const updatedBookData = this.bookForm.value
    if (updatedBookData.featured === false) {
      updatedBookData.featured = null
    }
    this.crudService.AddBook(this.bookForm.value)
      .subscribe(() => {
        console.log("Data Added Successfully")
        this.ngZone.run(() => this.router.navigateByUrl('/all-book'))
      }, (err) => {
        console.log(err);
      });

  }
}
