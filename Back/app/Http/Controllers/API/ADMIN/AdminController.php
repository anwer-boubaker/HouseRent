<?php

namespace App\Http\Controllers\API\ADMIN;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Http\Resources\UserResource;
use App\Models\Houses;
use App\Models\Reports;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function allUsers(){
        $user = Users::whereIn('user_type',['user','lessor'])->get();
        return response(UserResource::collection($user));
    }

    public function blockUser($idUser,Request $request){

        $user = Users::where('id_user',$idUser)->first();

        $user->block = 1;
        $user->block_duration = $request->block_duration;
        $user->update();

        $str=rand();
        $result = md5($str);

        $data = DB::statement('CREATE EVENT myeventss'.$result.$idUser.'
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL '. $request->block_duration .' DAY
        ENABLE
        DO
        UPDATE users SET block = 1 , block_duration = 0 WHERE id_user=3;');

        return response(new UserResource($user));

    }

    public function allReports(){
        $req= DB::select('SELECT count(*) as number,id_user_reported FROM reports group by id_user_reported');

            foreach ($req as $item){
                if($item->number > 2) {

                    $report = Reports::where('id_user_reported', $item->id_user_reported)->get();
                }
            }

        return response(ReportResource::collection($report) );
    }

    public function deletPost($idHouse){
        $house = Houses::find($idHouse);
        $house->delete();

        return response('house deleted succesfully');
    }
}
