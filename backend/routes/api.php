<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PeriodController;
use App\Http\Controllers\API\GreatmanagedController;

//ログインに必要なapi => register login logout
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('list',[ListController::class, 'index']);
// GETリクエストを処理するルート例
Route::get('customer', [CustomerController::class, 'index']);

Route::get('/periods', [PeriodController::class, 'index']);
Route::get('/greatmanaged', [GreatmanagedController::class, 'index']);
Route::get('/greatmanaged', [GreatManagedController::class, 'getGreatManaged']);