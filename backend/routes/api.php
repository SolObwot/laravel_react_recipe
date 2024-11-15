<?php

use App\Http\Controllers\FollowUpApiController;
use App\Http\Controllers\LeadsApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::prefix('api')->group(function() {
    Route::post('/leads', [LeadsApiController::class, 'store']);
    
    Route::post('/followups', [FollowUpApiController::class, 'store']);
    
    Route::put('/followups/{id}/status', function() {
    
    });
});






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
