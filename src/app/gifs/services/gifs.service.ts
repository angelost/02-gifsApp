import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'MiXCXOn7o44bw9QbN6JdbrpBZ2uvrLYf';
  private _historial: string[] = [];

  public resultados: Gif[]= [];

  get historial() {    
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if ( localStorage.getItem('historial')) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')!);
    // }

  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>( `https://api.giphy.com/v1/gifs/search?api_key=MiXCXOn7o44bw9QbN6JdbrpBZ2uvrLYf&q=${ query }&limit=10` )
      .subscribe( ( resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

    
  } 
}
