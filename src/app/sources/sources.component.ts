import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit, OnDestroy {

  newsSubscription;
  news:any;
  sources = [];
  selectedSourceId:String;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getSourcesData();
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

  getSourcesData() {
   this.newsSubscription = this.newsService.getData('sources?').subscribe(
      (data) => {
        const sourceList = data['sources'];
        for (let index = 0; index < sourceList.length; index++) {
          const source = sourceList[index];
          this.sources.push({id: source['id'], name: source['name']});
        }

        this.selectedSourceId = this.sources != null && this.sources.length > 0
        ? this.sources[0]['id'] : 0;
        console.log(this.sources.length);
        console.log(this.selectedSourceId);
        this.getData();
      }
    );
  }

  getData() {
    this.newsSubscription = this.newsService.getData(`top-headlines?sources=${this.selectedSourceId}`)
    .subscribe(
      (data) => {
        this.news = data;
      }
    )
  }

  onSelectionChange($event) {
    const matSelectChange: MatSelectChange = $event;
    this.selectedSourceId = matSelectChange.value;
    this.getData();
  }
}
