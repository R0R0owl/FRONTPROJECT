<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Greatmanaged extends Model
{
    use HasApiTokens,HasFactory;

    protected $greatmanaged = 'greatmanageds';

    protected $fillable = [
        'id',
        'period_id',
        'name',
        'year',
        'lastyear'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
