<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wishlist extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_wishlist';

    protected $fillable = [
        'id_user',
        'id_house',
    ];

    public function user(){
        return $this->belongsTo(Users::class , 'id_user');
    }

    public function house(){
        return $this->belongsTo(Houses::class , 'id_house');
    }
}
