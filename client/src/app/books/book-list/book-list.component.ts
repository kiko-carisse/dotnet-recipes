import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  addBookForm: FormGroup = <FormGroup>{};

  constructor(private bookService: BookService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBooks();
  }

  initializeForm() {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    })
  }

  addBook() {
    console.log(this.addBookForm.value);
    this.bookService.addBook(this.addBookForm.value).subscribe(book => {
      console.log(book);
      this.books.push(book);
      this.addBookForm.reset();
    }, error => {
      console.log(error);
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      console.log(books);
      this.books = books;
    }, error => {
      console.log(error);
    })
  }
  
  deleteBook(bookId: number) {
    
    this.bookService.deleteBook(bookId).subscribe(repsonse => {
      console.log(repsonse);
      this.books = this.books.filter(book => book.id !== bookId);
    }, error => {
      console.log(error);
    });
  }

}
