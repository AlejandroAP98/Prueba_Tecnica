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
            $table -> date ( "fecha");
            $table -> time ( "hora");
            $table -> string ( "entradas" , 50 );
            $table -> string ( "monto" , 50 );
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
