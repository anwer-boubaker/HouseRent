<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [\App\Http\Controllers\API\AUTH\AuthController::class, 'register']);

Route::post('/login', [App\Http\Controllers\API\AUTH\AuthController::class, 'login']);

Route::get('/showall', [App\Http\Controllers\API\USER\UserController::class, 'showAll']);

Route::post('/filterhouse',[App\Http\Controllers\API\USER\HouseController::class,'filterHouses']);

Route::get('/onehouse/{idHouse}',[App\Http\Controllers\API\USER\HouseController::class,'oneHouse']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [App\Http\Controllers\API\AUTH\AuthController::class, 'whoAmI']);

    Route::post('/logout', [App\Http\Controllers\API\AUTH\AuthController::class, 'logout']);

    Route::post('/update', [App\Http\Controllers\API\USER\UserController::class, 'updateUser']);

    Route::post('/comment/{idHouse}', [App\Http\Controllers\API\USER\UserController::class, 'comment']);

    Route::post('/report/{idReported}', [App\Http\Controllers\API\USER\UserController::class, 'report']);

    Route::post('/wishlist/{idHouse}', [App\Http\Controllers\API\USER\UserController::class, 'addWishlist']);

    Route::get('/allwishlist', [App\Http\Controllers\API\USER\UserController::class, 'allWishlist']);

    Route::post('/reservation/{idHouse}', [App\Http\Controllers\API\USER\UserController::class, 'reservation']);

    Route::get('/getreservation/{idHouse}', [App\Http\Controllers\API\USER\HouseController::class, 'getHouseReservations']);


});

//Route::group(['middleware' => ['auth:sanctum','lessor']], function () {
//    Route::post('/addhouse',[App\Http\Controllers\API\USER\HouseController::class,'addHouse']);
//});

Route::prefix('lessor')->middleware(['auth:sanctum','lessor'])->group(function (){
    Route::post('/addhouse',[App\Http\Controllers\API\USER\HouseController::class,'addHouse']);

    Route::post('/updatehouse/{idHouse}',[App\Http\Controllers\API\USER\HouseController::class,'updateHouse']);

    Route::post('/deletehouse/{idHouse}',[App\Http\Controllers\API\USER\HouseController::class,'deleteHouse']);

    Route::get('/myhouse',[App\Http\Controllers\API\USER\LessorController::class,'showMyHouses']);

    Route::get('/reservations/{id}',[App\Http\Controllers\API\USER\LessorController::class,'showReservations']);

    Route::post('/handelReservation/{idReservation}',[App\Http\Controllers\API\USER\LessorController::class,'handelReservation']);


});

Route::prefix('admin')->middleware(['auth:sanctum','admin'])->group(function (){
    Route::get('/allusers',[App\Http\Controllers\API\ADMIN\AdminController::class,'allUsers']);
    Route::post('/block/{idUser}',[App\Http\Controllers\API\ADMIN\AdminController::class,'blockUser']);
    Route::get('/report',[App\Http\Controllers\API\ADMIN\AdminController::class,'allReports']);
    Route::post('/delete/{idhouse}',[App\Http\Controllers\API\ADMIN\AdminController::class,'deletPost']);

});

