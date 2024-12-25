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

        return response()->json(['events' => $events], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getevents(Request $request) {
        $greatID = $request->query('great_id');
        $data = Events::where('great_id', $greatID)->get();

        return response()->json(['post' => $data]);
    }
}
