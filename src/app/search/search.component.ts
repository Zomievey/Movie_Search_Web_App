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
    this.getStarted = false;
    this.omdbService.getMovies(title).subscribe((data: any) => {
      this.results = data.Search;
      this.results.forEach((result: { flip: string; currentPlot: boolean; }) => {
        result.flip = 'inactive';
        result.currentPlot = true;
      });
    });
  }

  getMovieById(title: string) {
    return this.results.filter((result: { Title: string; }) => result.Title === title)[0];
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
    this.currentPlot = !this.currentPlot;
    let movie = this.results.filter((result: { Title: string; }) => result.Title === title)[0];
    movie.flip = (movie.flip == 'inactive') ? 'active' : 'inactive';
    if (movie) {
      this.getSummary(movie.Title);
    }
  }
}

// i want to only flip the current plot maybe by setting a boolean? current plot?

//when flipped then get the plot

//call out API IMDBid as the paramter 

//make call before flip


