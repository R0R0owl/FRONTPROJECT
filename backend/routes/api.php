<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CustomerController;

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
Route::get('list', [ListController::class, 'index']);
Route::get('customer', [LoginController::class, 'index']);
// GETリクエストを処理するルート例
Route::get('/customerlogin', [CustomerController::class, 'index']);
// POSTリクエストを処理するルート例
Route::post('/login', [CustomerController::class, 'login']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
