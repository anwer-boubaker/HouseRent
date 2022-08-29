<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SummerPrice extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_price';

    protected $fillable = [
        'price_day',
        'price_week',
        'price_month',
        'id_house'
    ];
}
