import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  MoviesList$: Observable<Movie[]>;
  constructor(private MoviesService: MoviesService) { }

  ngOnInit(){
    this.loadMoviesList();

  }

  loadMoviesList() {
    this.MoviesList$ = this.MoviesService.getMovielist();
  }

  delete(id) {
    const ans = confirm('Do you want to delete movie with id: ' + id);
    if (ans) {
      this.MoviesService.deleteMovie(id).subscribe((data) => {
        this.loadMoviesList();
      });
    }
  }

}
