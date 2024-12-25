<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Events; 

class EventController extends Controller
{
    public function index()
    {
        $events = Events::all();

        return response()->json(['post' => $events])
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function getEvents(Request $request) {
        $greatId = $request->query('great_id');
        $data = Events::where('great_id', $greatId)->get();

        return response()->json(['post' => $data]);
    }
}
