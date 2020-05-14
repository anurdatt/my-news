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
    "General",
    "Health",
    "Business",
    "Technology",
    "Science",
    "Entertainment",
    "Sports"
  ];
  selectedCategory = "General";

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getCategoryData(this.selectedCategory);
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  getCategoryData(category) {
    //console.log(category);
    this.news = null;
    this.selectedCategory = category;
    this.newsSubscription = this.newsService.getData(`top-headlines?country=us&category=${category.toLowerCase()}`).subscribe(data => {
      this.news = data;
      let flags = {};
      this.news['articles'] = data['articles'].filter((entry) => {
        if (flags[entry['title']]) {
          return false;
        }
        flags[entry['title']] = true;
        return true;
      });
    });
  }

}
