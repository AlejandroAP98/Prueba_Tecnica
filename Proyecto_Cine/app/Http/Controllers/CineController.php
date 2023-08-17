<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CineModel;

class CineController extends Controller
{
    //
    public function index(){
        $cine = CineModel::all();
        return response()->json($cine);
    }

    public function store(Request $request){
        $cine = new CineModel();
        $cine->ubicacion = $request->ubicacion;
        $cine->save();
                
        return response()->json($cine);

    }

    public function show($id){
        $cine = CineModel::find($id);
        return response()->json($cine);
    }

    public function update(Request $request, $id){
        $cine = CineModel::find($id);
        $cine->ubicacion = $request->ubicacion;
        $cine->save();
                
        return response()->json($cine);

    }

    public function destroy($id){
        $cine = CineModel::find($id);
        $cine->delete();
        return response()->json($cine);
    }
    
}
