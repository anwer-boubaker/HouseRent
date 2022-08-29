<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHouseReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_reservations', function (Blueprint $table) {
            $table->bigIncrements('id_reservation');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')
                ->references('id_user')
                ->on('users')
                ->onDelete('cascade');
            $table->unsignedBigInteger('id_house');
            $table->foreign('id_house')
                ->references('id_house')
                ->on('houses')
                ->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('confirmation')->default('null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('house_reservations');
    }
}
