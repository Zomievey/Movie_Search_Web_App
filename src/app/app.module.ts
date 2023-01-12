import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movie-search/movie-main.component';
import { SearchComponent } from './search/search.component';

import { OmdbService } from './omdb.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [OmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
