import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  addBook(book: Book) {
    return this.http.post<Book>(this.baseUrl + 'books', book);
  }
  
  updateBook(book: Book) {
    return this.http.put(this.baseUrl + 'books/'+book.id, book);
  }

  getBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'books');
  }

  getBook(bookId: number) {
    return this.http.get<Book>(this.baseUrl + 'books/'+bookId);
  }

  deleteBook(bookId: number) {
    return this.http.delete(this.baseUrl + 'books/'+bookId);
  }

}
