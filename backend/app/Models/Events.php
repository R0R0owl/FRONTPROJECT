<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Events extends Model
{
    use HasApiTokens, HasFactory;

    // テーブル名を指定
    protected $event = 'events';

    protected $fillable = [
        'id',
        'great_id',
        'year',
        'name',
        'description',
        'location',
        'lat',
        'lon'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
