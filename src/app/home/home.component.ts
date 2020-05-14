import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  news:any;
  newsSubscription;
  length;
  pageSize=8;
  page=1;

  constructor( private newsService: NewsService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  getData() {
    this.newsSubscription = this.newsService
    .getData(`top-headlines?country=us&pageSize=${this.pageSize}&page=${this.page}`)
      .subscribe(data => {
        this.news = data;
        this.length = data['totalResults'];
      });

  }

  onFavorite(article) {
    //console.log(article);
    let items = [];

    const value = localStorage.getItem('items');
    if (value != null) {
      items = JSON.parse(value);
    }
    items.push(article);

    localStorage.setItem('items', JSON.stringify(items));

    this.snackBar.open("Favorite added!", "OK", {
      duration: 3000
    });
  }

  onPageEvent($event) {
    const evt:PageEvent = $event;
    this.page = evt.pageIndex + 1;
    this.getData();
  }

}
