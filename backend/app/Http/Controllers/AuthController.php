<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AppToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        } else {
            Log::error('Authentication failed for email: ' . $request->email);
            return response()->json(['error' => '見つかりません'], 401);
        }
    }
}
