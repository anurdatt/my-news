import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  news:any;
  newsSubscription;

  constructor( private newsService: NewsService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  getData() {
    this.newsSubscription = this.newsService.getData('top-headlines?country=us')
      .subscribe(data => this.news = data);

  }

}
