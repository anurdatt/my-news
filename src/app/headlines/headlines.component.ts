import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit, OnDestroy {

  news:any;
  newsSubscription;

  categories:string[] = [
    "World",
    "India",
    "Business",
    "Technology",
    "Science",
    "Entertainment",
    "Sports"
  ]

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getCategoryData(this.categories[0]);
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  getCategoryData(category) {
    //console.log(category);
    this.news = null;
    this.newsSubscription = this.newsService.getData(`everything?q=${category.toLowerCase()}`).subscribe(data => {
      this.news = data;
    });
  }

}
