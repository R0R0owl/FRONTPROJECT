<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//サンプルリスト取得
Route::get('list', [ListController::class, 'index']);
//利用者リスト取得
Route::get('customer', [LoginController::class, 'index']);
// GETリクエストを処理するルート例
Route::get('loginlist', [CustomerController::class, 'index']);
// POSTリクエストを処理するルート例
Route::post('login', [AuthController::class, 'login']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
