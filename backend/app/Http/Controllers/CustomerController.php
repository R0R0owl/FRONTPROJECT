<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all(); // 全ての顧客情報を取得
        return response()->json(['post' => $customers], 200, [], JSON_UNESCAPED_UNICODE); // JSON形式で返却
        
        return response()->json(['message' => 'Customer data retrieved successfully']);
    }
}
