<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CustomerController;

Route::get('list',[ListController::class, 'index']);
// GETリクエストを処理するルート例
Route::get('customer', [CustomerController::class, 'index']);