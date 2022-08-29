<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_image';

    protected $fillable = [
        'id_house',
        'path',
    ];
}
