<?php

namespace App\Http\Controllers\API\USER;

use App\Http\Controllers\Controller;
use App\Http\Resources\HouseResource;
use App\Http\Resources\UserResource;
use App\Models\houseReservation;
use App\Models\Houses;
use App\Models\Images;
use App\Models\Notifications;
use App\Models\SummerPrice;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;
use Validator;
use DatePeriod;
use DateTime;
use DateInterval;

class HouseController extends Controller
{
    public function addHouse(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required|string',
            'discreption' => 'required|string',
            'location' => 'required|string',
            'price_day' => 'required|integer',
            'price_week' => 'required|integer',
            'price_month' => 'required|integer',
            'sum_price_day' => 'required|integer',
            'sum_price_week' => 'required|integer',
            'sum_price_month' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }


        $house = Houses::create([
            'title' => $request->title,
            'discreption' => $request->discreption,
            'location' => $request->location,
            'price_day' => $request->price_day,
            'price_week' => $request->price_week,
            'price_month' => $request->price_month,
            'id_user' => auth()->user()->getAuthIdentifier()
        ]);

        $sumPrice = SummerPrice::create([
            'price_day' => $request->sum_price_day,
            'price_week' => $request->sum_price_week,
            'price_month' => $request->sum_price_month,
            'id_house' => $house->id_house
        ]);

        foreach($request->file('images') as $image) {

            $filename = time().rand(). '.'.$image->getClientOriginalExtension();
            $image->move('storage/', $filename);


            Images::create([
                'path'=>$filename,
                'id_house'=>$house->id_house
            ]);
        }

        $usersId = Users::where('prefered_place','=',$request->location)->pluck('id_user');

        foreach ($usersId as $item){
            Notifications::create([
                'id_user_from' => auth()->user()->getAuthIdentifier(),
                'id_user_to' => $item,
                'id_house' => $house->id_house,
                'discreption' => 'new house was added in your prefered place',
                'seen' => 0,
            ]);
        }

        return response(['message' => 'house added successfully' ,'data' => new HouseResource($house)]);

    }

    public function updateHouse($idhouse,Request $request){
        $house = Houses::where('id_house',$idhouse)->first();

        if(!empty($request->images)) {
            $imgAll= Images::where('id_house',$idhouse)->delete();
            foreach($request->file('images') as $image) {

                $filename = time().rand(). '.'.$image->getClientOriginalExtension();
                $image->move('storage/', $filename);


                Images::create([
                    'path'=>$filename,
                    'id_house'=>$idhouse
                ]);
            }

        }



        $sumPrice = SummerPrice::where('id_house',$idhouse)->first();

            $house->title = $request->title;
            $house->discreption = $request->discreption;
            $house->location = $request->location;
            $house->price_day = $request->price_day;
            $house->price_week = $request->price_week;
            $house->price_month = $request->price_month;
            $house->update();

            $sumPrice->price_day = $request->sum_price_day;
            $sumPrice->price_week = $request->sum_price_week;
            $sumPrice->price_month = $request->sum_price_month;
            $sumPrice->update();

            return response(new HouseResource($house));
    }

    public function deleteHouse($idHouse){
        $house = Houses::where('id_house',$idHouse)->first();
        if(!Empty($house)){
            $res = houseReservation::where('id_house',$idHouse)->delete();
            $sum = SummerPrice::where('id_house',$idHouse)->delete();

            $house->delete();
            return response('house deleted succesfully');
        }else {
            return response ('house not found');
        }



    }

    public function filterHouses(Request $request){
        $validator = Validator::make($request->all(),[
            'location' => 'required|string',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:today',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $houses = Houses::where('location',$request->location);
        $houses->whereDoesntHave('reservation',function($q)use($request){
            $q->whereBetween('start_date',[$request->start_date,$request->end_date]);
            $q->whereBetween('end_date',[ $request->start_date,$request->end_date]);
        });
        $houses = $houses->get();
        if (count($houses) !=0){
            return response(HouseResource::collection($houses));
        }else{
            return response(['message'=>'no data found for this inputs'],404);
        }
    }

    public function oneHouse ($idHouse) {
        $house = Houses::where('id_house',$idHouse)->first();

        return response(new HouseResource($house));
    }

    function dateDifference($start_date, $end_date)
    {
        // calulating the difference in timestamps
        $diff = strtotime($start_date) - strtotime($end_date);

        // 1 day = 24 hours
        // 24 * 60 * 60 = 86400 seconds
        return ceil(abs($diff / 86400));
    }

    public function getHouseReservations($idHouse){
        $date = [];
        $houseRes = houseReservation::where('id_house',$idHouse)->get();
        foreach ($houseRes as $key=>$item){
            $period = new DatePeriod(
                new DateTime($houseRes[$key]->start_date),
                new DateInterval('P1D'),
                new DateTime($houseRes[$key]->end_date)
            );
            foreach ($period as $key => $value) {
                $date[]=$value->format('m/d/Y');
            }
            $date[]=date_format(new DateTime($item->end_date),'m/d/Y');
        }

//        $dateDiff = $this->dateDifference($houseRes[0]->start_date, $houseRes[0]->end_date);
        return response($date);
    }
}
