<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSummerPricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('summer_prices', function (Blueprint $table) {
            $table->bigIncrements('id_price');
            $table->integer('price_day');
            $table->integer('price_week');
            $table->integer('price_month');
            $table->unsignedBigInteger('id_house');
            $table->foreign('id_house')
                ->references('id_house')
                ->on('houses')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('summer_prices');
    }
}
