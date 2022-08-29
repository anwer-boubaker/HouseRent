<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Users extends Authenticatable
{
    use HasApiTokens, HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'id_user';

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'city',
        'prefered_place',
        'block'=>0,
        'block_duration',
        'user_type'
    ];

    public function houses(){
        return $this->hasMany(Houses::class, 'id_house');
    }
}
