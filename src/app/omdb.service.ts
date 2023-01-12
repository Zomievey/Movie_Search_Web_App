import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private url = 'https://www.omdbapi.com/';
  private apiKey = '926b1c08'; //api key goes here

  constructor(private http: HttpClient) { }

  // search(query: string, page: number) {
  //   return this.http.get(`${this.url}?apikey=${this.apiKey}&s=${query}&page=${page}`);
  // }


  getMovies(title: string) {
    return this.http.get(`${this.url}?s=${title}&apikey=${this.apiKey}`);
  }

 getMoviePlot(title: string) {
    return this.http.get(`${this.url}?t=${title}&plot=full&apikey=${this.apiKey}`);
  }
}
