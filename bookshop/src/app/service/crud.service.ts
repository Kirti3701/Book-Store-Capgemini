import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError, from} from 'rxjs';
import { Book } from './book';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  Books:any = [];
  //Nodejs API
  REST_API : String = "http://localhost:8000/api";
  //Set http headers
  httpHeaders = new HttpHeaders().set("Content-Type", 'application/json')
  constructor(private httpClient:HttpClient) { }
  //Add Records
  AddBook(data:Book): Observable<any>{
    let API_URL = `${this.REST_API}`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }
  //Get All Books
  /*getBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }*/
  getBooks(): Observable<any[]> {
  return this.httpClient.get(`${this.REST_API}`).pipe(
    map((books: any[]) => {
      // Separate featured and regular books
      const featuredBooks = books.filter((book: any) => book.featured === 'true');
      const regularBooks = books.filter((book: any) => book.featured !== 'true');

      // Concatenate the arrays with featured books first
      const sortedBooks = featuredBooks.concat(regularBooks);

      return sortedBooks;
    }),
    catchError((error: any) => {
      return throwError(error);
    })
  );
}

  //Get book by id
  getBook(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {} 
    }),
    catchError(this.handleError))
  }

  //featured
  getFeaturedBooks(): Observable<any[]> {
    return this.getBooks().pipe(
      map((books: any[]) => Object.values(books).filter((book: any) => book.featured === 'true')),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  
 
  //Update Book
  UpdateBook(id:any , data:any ):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }
  //Delete Book
  deleteBook(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }
  //Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //handle client error
      errorMessage = error.error.message;
    } else {
      //handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
