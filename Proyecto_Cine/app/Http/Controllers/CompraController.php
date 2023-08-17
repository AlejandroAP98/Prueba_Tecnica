<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CompraModel;


class CompraController extends Controller
{
    //
    public function index(){
        $compra = CompraModel::all();
        return response()->json($compra);
    }

    public function store(Request $request){
        $compra = new CompraModel();
        $compra->fecha = $request->fecha;
        $compra->hora = $request->hora;
        $compra->entradas = $request->entradas;
        $compra->monto = $request->monto;
        $compra->save();
                
        return response()->json($compra);

    }

    public function show($id){
        $compra = CompraModel::find($id);
        return response()->json($compra);
    }

    public function update(Request $request, $id){
        $compra = CompraModel::find($id);
        $compra->fecha = $request->fecha;
        $compra->hora = $request->hora;
        $compra->entradas = $request->entradas;
        $compra->monto = $request->monto;
        $compra->save();
                
        return response()->json($compra);

    }

    public function destroy($id){
        $compra = CompraModel::find($id);
        $compra->delete();
        return response()->json($compra);
    }
    
}
