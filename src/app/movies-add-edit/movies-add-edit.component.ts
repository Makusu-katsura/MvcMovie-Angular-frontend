import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movies-add-edit',
  templateUrl: './movies-add-edit.component.html',
  styleUrls: ['./movies-add-edit.component.css']
})
export class MoviesAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formReleaseDate: string;
  formPrice: string;
  formGenre: string;
  formRating: string;
  id: number;
  errorMessage: any;
  existingMovie: Movie;


  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formReleaseDate='releaseDate';
    this.formPrice='price'
    this.formGenre = 'genre';
    this.formRating='rating';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        releaseDate: ['', [Validators.required]],
        price: ['', [Validators.required]],
        genre: ['', [Validators.required]],
        rating: ['', [Validators.required]],
        
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.moviesService.getMovie(this.id)
        .subscribe(data => (
          this.existingMovie = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formReleaseDate].setValue(data.releaseDate),
          this.form.controls[this.formPrice].setValue(data.price),
          this.form.controls[this.formGenre].setValue(data.genre),
          this.form.controls[this.formRating].setValue(data.rating)
        ));
    }
  }
  save() {
    if (!this.form.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let Movie: Movie = {
        title: this.form.get(this.formTitle).value,
        releaseDate: this.form.get(this.formReleaseDate).value,
        price:this.form.get(this.formPrice).value,
        genre: this.form.get(this.formGenre).value,
        rating: this.form.get(this.formRating).value
      };
      this.moviesService.saveMovie(Movie)
        .subscribe((data) => {
          this.router.navigate(['/Movies', data.id]);
        });
    }

  
     if (this.actionType === 'Edit') {
      let movie: Movie = {
        id: this.existingMovie.id,
        title: this.form.get(this.formTitle).value,
        releaseDate: this.form.get(this.formReleaseDate).value,
        price: this.form.get(this.formPrice).value,
        genre:this.form.get(this.formGenre).value,
        rating:this.form.get(this.formRating).value
       
      };
      this.moviesService.updateMovie(movie.id, movie)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }
  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get releaseDate() { return this.form.get(this.formReleaseDate); }
  get price() { return this.form.get(this.formPrice); }
  get genre() { return this.form.get(this.formGenre); }
  get rating() { return this.form.get(this.formRating); }
}