import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeadlinesModule } from './headlines/headlines.module';
import { SourcesModule } from './sources/sources.module';
import { FavoritesModule } from './favorites/favorites.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'headlines',
    loadChildren: './headlines/headlines.module#HeadlinesModule'
  },
  {
    path: 'sources',
    loadChildren: './sources/sources.module#SourcesModule'
  },
  {
    path: 'favorites',
    loadChildren: './favorites/favorites.module#FavoritesModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
