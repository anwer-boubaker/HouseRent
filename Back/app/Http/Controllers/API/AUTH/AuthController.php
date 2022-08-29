<?php
namespace App\Http\Controllers\API\AUTH;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\Users;

class AuthController extends Controller
{

    public function register(Request $request)
    {


        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|integer',
            'city' => 'required|string',
            'prefered_place' => 'required|string',
            'user_type' => 'required|in:user,lessor',
        ]);

        if($validator->fails()){
            return response()->json(['massage' => $validator->errors()], 500);
        }

        $user = Users::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'city' => $request->city,
            'prefered_place' => $request->prefered_place,
            'user_type' => $request->user_type,

        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['data' => $user,'access_token' => $token, 'token_type' => 'Bearer', ]);
    }

    public function login(Request $request)
    {

        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        $user = Users::where('email', $request['email'])->firstOrFail();

        if($user->block != 0 ){
            return response('user is blocked');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['user' => $user,'access_token' => $token]);
    }

    // method for user logout and delete token
    public function logout()
    {

        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    public function whoAmI()
    {
        if (auth()->check()) {
            return response(['iAm' => auth()->user()]);
        } else {
            return response(['statue' => 'user dose not exist or token is expired'], 422);
        }
    }
}
