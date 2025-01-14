<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Prompts;

class PromptsController extends Controller
{
    public function index()
    {
        // すべてのデータを取得
        $prompts = Prompts::all();

        // JSON 応答を返す
        return response()->json(['prompts' => $prompts])
            ->header('Content-Type', 'application/json; charset=utf-8');
    }
}
