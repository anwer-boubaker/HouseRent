<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class houseReservation extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_reservation';

    protected $fillable = [
        'id_user',
        'id_house',
        'start_date',
        'end_date',
        'confirmation',
    ];

    public function user(){
        return $this->belongsTo(Users::class , 'id_user');
    }

    public function house(){
        return $this->belongsTo(Houses::class , 'id_house');
    }
}
