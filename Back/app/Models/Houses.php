<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Attribute;

class Houses extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_house';

    protected $fillable = [
        'title',
        'discreption',
        'location',
        'price_day',
        'price_week',
        'price_month',
        'id_user',
    ];

    public function user(){
        return $this->belongsTo(Users::class , 'id_user');
    }

    public function sumPrice(){
        return $this->hasOne(SummerPrice::class , 'id_house');
    }

    public function reservation(){
        return $this->hasMany(houseReservation::class , 'id_house');
    }
    public function images(){
        return $this->hasMany(Images::class , 'id_house');
    }


}
