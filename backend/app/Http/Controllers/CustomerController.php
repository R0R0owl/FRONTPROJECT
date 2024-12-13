<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash; // パスワードをハッシュ化するために必要

class CustomerController extends Controller
{
    // 顧客情報を取得する
    public function index()
    {
        $customers = Customer::all(); // 全ての顧客情報を取得
        return response()->json(['post' => $customers], 200, [], JSON_UNESCAPED_UNICODE); // JSON形式で返却
    }

    // ログイン認証処理
    public function login(Request $request)
    {
        // 入力されたメールアドレスとパスワードを使って認証
        $customer = Customer::where('email', $request->email)->first(); // メールアドレスで顧客を検索

        if ($customer && Hash::check($request->password, $customer->password)) {
            // パスワードが一致すれば認証成功
            return response()->json(['message' => 'ログイン成功'], 200);
        } else {
            // メールアドレスまたはパスワードが違う場合
            return response()->json(['message' => 'メールアドレスまたはパスワードが違います'], 401);
        }
    }
}
