<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comments extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_comment';

    protected $fillable = [
        'id_user',
        'id_house',
        'discreption',
    ];
}
