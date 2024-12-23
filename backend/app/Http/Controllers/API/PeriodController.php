<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Periods;

class PeriodController extends Controller
{
    public function index()
    {
        $periods = Periods::all();

        return response()->json(['post' => $periods], 200, [], JSON_UNESCAPED_UNICODE);
    }
}
