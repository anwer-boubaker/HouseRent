<?php

namespace App\Http\Controllers\API\USER;

use App\Http\Controllers\Controller;
use App\Http\Resources\HouseResource;
use App\Http\Resources\wishlistResource;
use App\Models\comments;
use App\Models\houseReservation;
use App\Models\Houses;
use App\Models\Notifications;
use App\Models\Reports;
use App\Models\Users;
use App\Models\wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{
    //
    public function updateUser(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|integer',
            'city' => 'required|string',
            'prefered_place' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $data= $request->all();
        $user = Users::find(auth()->user()->getAuthIdentifier())->first();
        $data['password'] = Hash::make($request->password);
        $user->update($data);
        return 'update succes';

    }

    public function showAll() {
        $house = Houses::all()->sortBy('id_house',true,'true');
        return response(HouseResource::collection($house));
    }

    public function comment($idHouse , Request $request){
        $validator = Validator::make($request->all(),[
            'discreption' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $comment = comments::create([
            'id_user' => auth()->user()->getAuthIdentifier(),
            'id_house' => $idHouse,
            'discreption' => $request->discreption,
        ]);

        return response(['comment'=>$comment]);
    }

    public function report($idReported, Request $request){
        $validator = Validator::make($request->all(),[
            'discreption' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $report = Reports::create([
            'id_user' => auth()->user()->getAuthIdentifier(),
            'id_user_reported' => $idReported,
            'discreption' => $request->discreption
        ]);

        return response(['report' => $report]);
    }

    public function addWishlist($idHouse,Request $request){
        $wishlist = wishlist::create([
            'id_user' => auth()->user()->getAuthIdentifier(),
            'id_house' => $idHouse
        ]);

        return response(new wishlistResource($wishlist));

    }

    public function allWishlist(){
        $wishlist = wishlist::where('id_user','=',auth()->user()->getAuthIdentifier())->get();

        return response(wishlistResource::collection($wishlist));
    }

    public function reservation($idHouse,Request $request){
         $validator = Validator::make($request->all(),[
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:today',
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()],404);
        }


        $house = Houses::where('id_house',$idHouse)->first();
//        \DB::listen(function ($sql) { dd($sql);});
//        $req = DB::select('SELECT * FROM house_reservations WHERE  id_house = '. $idHouse .' and '. $request->start_date .' not BETWEEN start_date and end_date or '. $request->end_date .' not BETWEEN start_date and end_date');
//        dd($req);

        $house_reservation = houseReservation::where('id_house', $idHouse);

        $house_reservation->where(function($q)use($request){
            $q->whereBetween('start_date',[$request->start_date,$request->end_date]);
            $q->whereBetween('end_date',[ $request->start_date,$request->end_date]);
        });

        $house_reservation =  $house_reservation->get();

        if(count($house_reservation) != 0){
            return response(['message'=>'this date already taking'],404);

        } else {
            $reservation = houseReservation::create([
                'id_user' => auth()->user()->getAuthIdentifier(),
                'id_house' => $idHouse,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            Notifications::create([
                'id_user_from' => auth()->user()->getAuthIdentifier(),
                'id_user_to' => $house->id_user,
                'id_house' => $idHouse,
                'id_reservation' => $reservation->id_reservation,
                'discreption' => 'new reservation was added',
                'seen' => 0,
            ]);
        }

        return response($reservation);
    }

}
