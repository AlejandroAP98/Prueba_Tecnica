<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pelicula extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema :: create ( "pelicula" , function ( Blueprint $table ) {
            $table -> id ();
            $table -> string ( "nombre" , 50 );
            $table -> string ( "genero" , 50 );
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
