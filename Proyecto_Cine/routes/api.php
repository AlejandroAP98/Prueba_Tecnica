<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\PeliculasController;
use App\Http\Controllers\DatosController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\CineController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/peliculas', [PeliculasController::class, 'pelicula'])->name('peliculas');
Route::get('/datos', 'DatosController@index');
Route::resource('clientes', ClienteController::class);
Route::resource('compras', CompraController::class);
Route::resource('cines', CineController::class);







