import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = <Book>{};

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    const bookId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.bookService.getBook(bookId).subscribe(book => {
      console.log(book);
      this.book = book;
    }, error => {
      console.log(error);
    });
  }

}
