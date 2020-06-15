import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  Movie$: Observable<Movie>;
  id: number;

  constructor(private MoviesService: MoviesService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(){
    this.Movie$=this.MoviesService.getMovie(this.id)
  }

}
