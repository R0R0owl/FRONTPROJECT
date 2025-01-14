<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Prompts extends Model
{
    use HasApiTokens, HasFactory;

    // テーブル名の指定
    protected $table = 'promptsv2';

    // 一括代入可能な属性
    protected $fillable = [
        'id',
        'prompt',
        'negative_prompt',
        'step'
    ];

    // 隠す属性（JSONシリアル化時）
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
