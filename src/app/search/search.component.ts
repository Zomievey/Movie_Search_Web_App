import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../omdb.service';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(0)'
      })),
      state('inactive', style({
        transform: 'rotateY(179deg)'
      })),
      transition('active => inactive', animate('800ms ease-out')),
      transition('inactive => active', animate('800ms ease-in'))
    ])
  ]
})

export class SearchComponent implements OnInit {

  title: string = '';
  results: any = [];
  summary: any = [];
  currentPlot = true;
  flip: string = 'inactive';
  currentMovie: string = '';
  getStarted = true;


  constructor(private omdbService: OmdbService) { }
  ngOnInit(): void {
  }

  searchMovies(title: string) {
    this.omdbService.getMovies(title).subscribe((data: any) => {
      this.results = data.Search;
      this.results.forEach((result: {
        summary: any; flip: string; currentPlot: boolean; hasSummary: boolean; isFlipped: boolean;
      }) => {
        result.flip = 'inactive';
        result.currentPlot = true;
        result.hasSummary = !!result.summary 
        result.isFlipped = false;
      });
    });
  }

  getSummary(title: string) {
    let movie = this.results.filter((result: { Title: string; }) => result.Title === title)[0];
    if (!movie.summary) {
      this.omdbService.getMoviePlot(title).subscribe((data: any) => {
        movie.summary = data;
        this.results.forEach((result: { Title: string; currentPlot: boolean; }) => {
          if (result.Title === title) {
            result.currentPlot = !result.currentPlot;
          } else {
            result.currentPlot = true;
          }
        });
      });
    } else {
      this.results.forEach((result: { Title: string; currentPlot: boolean; }) => {
        if (result.Title === title) {
          result.currentPlot = !result.currentPlot;
        } else {
          result.currentPlot = true;
        }
      });
    }
  }

  toggleFlip(title: string) {
    let movie = this.results.filter((result: { Title: string; }) => result.Title === title)[0];
    if(!movie.hasSummary || movie.isFlipped){
    return;
    }
    movie.isFlipped = true;
    this.currentPlot = !this.currentPlot;
    movie.flip = (movie.flip == 'inactive') ? 'active' : 'inactive';
    if (movie) {
    this.getSummary(movie.Title);
    }
    }

}


