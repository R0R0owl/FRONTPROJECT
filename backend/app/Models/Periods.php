<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Periods extends Model
{
    use HasApiTokens,HasFactory;

    protected $period = 'periods';

    protected $fillable = [
        'id',
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
