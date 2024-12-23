<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Greatmanaged;

class GreatmanagedController extends Controller
{
    public function index()
    {
        $greatmanaged = Greatmanaged::all();

        return response()->json(['post' => $greatmanaged], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getGreatManaged(Request $request) {
        $periodId = $request->query('period_id');
        $data = GreatManaged::where('period_id', $periodId)->get();
    
        return response()->json(['post' => $data]);
    }
    
}
