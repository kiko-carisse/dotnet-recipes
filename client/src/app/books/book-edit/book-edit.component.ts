import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  book: Book = <Book>{};
  updateBookForm: FormGroup = <FormGroup>{};

  constructor(private bookService: BookService, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getBook();
  }

  initializeForm() {

    this.updateBookForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  getBook() {
    const bookId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.bookService.getBook(bookId).subscribe(book => {
      console.log(book);
      this.book = book;
      this.updateBookForm.patchValue({
        id: this.book.id,
        title: this.book.title,
        author: this.book.author
      });
    }, error => {
      console.log(error);
    });

  }

  updateBook() {
    console.log(this.updateBookForm.value);
    this.bookService.updateBook(this.updateBookForm.value).subscribe(response => {
      console.log(response);
      this.updateBookForm.markAsPristine()
    }, error => {
      console.log(error);
    })
  }

}
