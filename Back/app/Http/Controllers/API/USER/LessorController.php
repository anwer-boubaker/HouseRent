<?php

namespace App\Http\Controllers\API\USER;

use App\Http\Controllers\Controller;
use App\Http\Resources\HouseResource;
use App\Http\Resources\reservationResource;
use App\Models\houseReservation;
use App\Models\Houses;
use App\Models\Notifications;
use Illuminate\Http\Request;

class LessorController extends Controller
{
    public function handelReservation($idRes,Request $request) {
        $reservation = houseReservation::find($idRes);

        $reservation->confirmation = $request->confirmation;

        $reservation->update();
        $data = new reservationResource($reservation);
        if($request->confirmation == 1){
            Notifications::create([
                'id_user_from' => auth()->user()->getAuthIdentifier(),
                'id_user_to' => $data->user->id_user,
                'id_house' => $data->house->id_house,
                'id_reservation' => $reservation->id_reservation,
                'discreption' => 'your reservation is accepted',
                'seen' => 0,
            ]);
        }else{
            Notifications::create([
                'id_user_from' => auth()->user()->getAuthIdentifier(),
                'id_user_to' => $data->user->id_user,
                'id_house' => $data->house->id_house,
                'id_reservation' => $reservation->id_reservation,
                'discreption' => 'your reservation is declined',
                'seen' => 0,
            ]);
        }

        return response($data);
    }

    public function showMyHouses(){
        $house = Houses::where('id_user',auth()->user()->getAuthIdentifier())->get()->sortBy('id_house',true,'true');

        return response(HouseResource::collection($house));
    }

    public function showReservations($idHouse){
        $reservations = houseReservation::where('id_house',$idHouse)->get();
        return response (reservationResource::collection($reservations));
    }


}
