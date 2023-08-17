<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class PeliculasController extends Controller{
    //
    public function pelicula(){
        //peliculas populares 
        $peliculas = Http::get("https://api.themoviedb.org/3/discover/movie?api_key=3ef80627580a089f552f9b9450e3973d")->json()['results'];
        return response()->json($peliculas);
    }
}


