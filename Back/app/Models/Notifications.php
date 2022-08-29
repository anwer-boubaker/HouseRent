<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_notification';

    protected $fillable = [
        'id_user_from',
        'id_user_to',
        'id_house',
        'id_reservation',
        'discreption',
        'seen',
    ];
}
