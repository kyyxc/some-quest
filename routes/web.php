<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\MeetingController;

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/', fn() => redirect()->route('dashboard'));
    Route::get('/dashboard', fn() => Inertia::render('Panel/Dashboard'))->name('dashboard');
    Route::get('/dashboard/employees', fn() => Inertia::render('Panel/ManageEmployees'))->name('employees');
    Route::get('/dashboard/meeting', [MeetingController::class, 'index'])->name('meeting');
    Route::get('/dashboard/quest', fn() => Inertia::render('Panel/ManageQuest'))->name('quest');
    Route::get('/dashboard/attendance', fn() => Inertia::render('Panel/ManageAttendance'))->name('attendance');

    // Meeting 
    Route::get('/dashboard/meeting/create', fn() => Inertia::render('MoM/AddMeeting'))->name('meeting.create');
    Route::post('/dashboard/meeting', [MeetingController::class, 'store'])->name('meeting.store');
    Route::get('/dashboard/meeting/view/{id}', [MeetingController::class, 'show'])->name('meeting.view');
    Route::get('/dashboard/meeting/edit/{id}', [MeetingController::class, 'edit'])->name('meeting.edit');
    Route::put('/dashboard/meeting/{id}', [MeetingController::class, 'update'])->name('meeting.update');
    Route::delete('/dashboard/meeting/{id}', [MeetingController::class, 'destroy'])->name('meeting.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
