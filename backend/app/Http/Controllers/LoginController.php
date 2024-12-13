<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class LoginController extends Controller
{
    public function index() {
        // Customer モデルから全てのデータを取得し、JSON 形式で返す
        return response()->json(
            [
                "post" => Customer::all(),  // データを配列の形式で指定
            ],
            200, [],  // ステータスコード
            JSON_UNESCAPED_UNICODE  // 文字化け防止オプション
        );
       
    }

    public function login(Request $request) {
        $user = Customer::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // 認証成功
            return response()->json(['message' => 'ログイン成功'], 200);
        } else {
            // 認証失敗
            return response()->json(['message' => 'メールアドレスまたはパスワードが違います'], 401);
        }
    }
}
