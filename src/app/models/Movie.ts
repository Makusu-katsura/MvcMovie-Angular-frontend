import { CurrencyPipe, DecimalPipe } from '@angular/common';

export class Movie {
    id?: number;
    title: string;
    releaseDate: Date;
    price: CurrencyPipe;
    genre:string;
    rating:string;
  }