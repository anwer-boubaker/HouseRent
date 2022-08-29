<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->bigIncrements('id_notification');
            $table->unsignedBigInteger('id_user_from')->nullable(true);
            $table->foreign('id_user_from')
                ->references('id_user')
                ->on('users');
            $table->unsignedBigInteger('id_user_to')->nullable(true);
            $table->foreign('id_user_to')
                ->references('id_user')
                ->on('users');
            $table->unsignedBigInteger('id_house')->nullable(true);
            $table->foreign('id_house')
                ->references('id_house')
                ->on('houses')
                ->onDelete('cascade');
            $table->unsignedBigInteger('id_reservation')->nullable(true);
            $table->foreign('id_reservation')
                ->references('id_reservation')
                ->on('house_reservations')
                ->onDelete('cascade');
            $table->string('discreption');
            $table->boolean('seen')->default('0');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
