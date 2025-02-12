<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Prompts;
use Illuminate\Support\Facades\Log;

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

    public function getPrompt(Request $request) {
        $eventId = $request->query('id');
        $data = Prompts::where('id', $eventId)->get();

        Log::info('取得したデータ:', ['data' => $eventId]);

        return response()->json(['post' => $data]);
    }
}
