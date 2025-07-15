<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/', fn() => redirect()->route('dashboard'));
    Route::get('/dashboard', fn() => Inertia::render('Panel/Dashboard'))->name('dashboard');
    Route::get('/dashboard/employees', fn() => Inertia::render('Panel/ManageEmployees'))->name('employees');
    Route::get('/dashboard/meeting', fn() => Inertia::render('Panel/ManageMeeting'))->name('meeting');
    Route::get('/dashboard/quest', fn() => Inertia::render('Panel/ManageQuest'))->name('quest');
    Route::get('/dashboard/attendance', fn() => Inertia::render('Panel/ManageAttendance'))->name('attendance');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
