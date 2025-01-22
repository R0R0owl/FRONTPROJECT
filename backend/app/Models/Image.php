<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model
{
    use HasFactory, HasApiTokens;

    protected $image = 'images';

    protected $fillable = [
        'id',
        'image_base'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
