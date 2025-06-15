<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'logo',
        'websit_url',
        'address',
        'discription',
    ];
}
