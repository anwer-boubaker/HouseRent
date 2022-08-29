<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_report';

    protected $fillable = [
        'id_user',
        'id_user_reported',
        'discreption',
    ];

    public function user(){
        return $this->belongsTo(Users::class , 'id_user');
    }
    public function userReported(){
        return $this->belongsTo(Users::class , 'id_user_reported');
    }
}
