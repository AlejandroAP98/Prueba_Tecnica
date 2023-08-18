<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CompraModel;

use App\Models\CineModel;
use App\Models\PeliculaModel;


class CompraController extends Controller
{
    //
    public function index(){
        $compra = CompraModel::all();
        return response()->json($compra);
    }

    public function store(Request $request){
        $compra = new CompraModel();
        $compra->entradas = $request->entradas;
        $compra->monto = $request->monto;
        $compra->nombre = $request->nombre;
        $compra->ubicacion = $request->ubicacion;
        $compra->pelicula = $request->pelicula;

        $compra->save();

        return response()->json($compra);

    }

    public function show($id){
        $compra = CompraModel::find($id);
        return response()->json($compra);
    }

    public function update(Request $request, $id){
        $compra = CompraModel::find($id);
        $compra->entradas = $request->entradas;
        $compra->monto = $request->monto;
        $compra->nombre = $request->nombre;
        $compra->ubicacion = $request->ubicacion;
        $compra->pelicula = $request->pelicula;

        $compra->save();
        
        
        return response()->json($compra);

    }

    public function destroy($id){
        $compra = CompraModel::find($id);
        $compra->delete();
        return response()->json($compra);
    }
    
}
