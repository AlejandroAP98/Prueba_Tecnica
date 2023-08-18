<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class  Compra extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema :: create ( "compra" , function ( Blueprint $table ) {
            $table -> id ();
            $table -> string ( "entradas" , 50 );
            $table -> string ( "monto" , 50 );
            $table -> string ( "ubicacion", 50 );
            $table -> string ( "nombre", 50 );
            $table -> unsignedBigInteger ( "pelicula_id" );
            $table -> timestamps ();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
