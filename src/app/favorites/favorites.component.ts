import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  articles = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFavoritesData();
  }

  getFavoritesData() {
    const value = localStorage.getItem('items');
    if (value != null) {
      this.articles = JSON.parse(value);
    }
  }

  onUnFavorite(article) {
    const index = this.articles.indexOf(article);
    this.articles.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.articles));
    //console.log(article);
    this.snackBar.open("Favorite removed!", "OK", {
      duration: 3000
    });
  }

}
