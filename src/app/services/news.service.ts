import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiurl = environment.apiUrl;

const params = new HttpParams().set('apiKey', apiKey);

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) {
    //console.log(apiKey);
  }

  getData(url: string) {

    return this.http.get(`${apiurl}/${url}`, {params}).pipe(
      tap(value => {
        console.log(value);
      })
    )

  }

}
