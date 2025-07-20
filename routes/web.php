<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\MeetingController;

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// Dashboard routes
Route::get('/', fn() => redirect()->route('dashboard'));
Route::get('/dashboard', fn() => Inertia::render('Panel/dashboard/ManageDashboard'))->name('dashboard');

// Employee routes
Route::get('/dashboard/employees', [EmployeeController::class, 'index'])->name('employees');
Route::post('/dashboard/employees', [EmployeeController::class, 'store'])->name('employees.store');
Route::put('/dashboard/employees/{employee:id}', [EmployeeController::class, 'update'])->name('employees.update');
Route::delete('/dashboard/employees/{employee:id}', [EmployeeController::class, 'destroy'])->name('employees.delete');

// Quest routes
Route::get('/dashboard/quests', [QuestController::class, 'index'])->name('quests.index');
Route::get('/dashboard/quests/create', [QuestController::class, 'create'])->name('quests.create');
Route::post('/dashboard/quests', [QuestController::class, 'store'])->name('quests.store');
Route::get('/dashboard/quests/{quest}', [QuestController::class, 'show'])->name('quests.view');
Route::get('/dashboard/quests/{quest}/edit', [QuestController::class, 'edit'])->name('quests.edit');
Route::put('/dashboard/quests/{quest}', [QuestController::class, 'update'])->name('quests.update');
Route::put('/dashboard/quests/{quest:id}/status', [QuestController::class, 'update_status'])->name('quests.updateStatus');
Route::delete('/dashboard/quests/{quest:id}', [QuestController::class, 'destroy'])->name('quests.delete');

// Meeting routes
Route::get('/dashboard/meeting', [MeetingController::class, 'index'])->name('meeting');
Route::get('/dashboard/meeting/create', [MeetingController::class, 'create'])->name('meeting.create');
Route::post('/dashboard/meeting', [MeetingController::class, 'store'])->name('meeting.store');
Route::get('/dashboard/meeting/view/{id}', [MeetingController::class, 'show'])->name('meeting.view');
Route::get('/dashboard/meeting/edit/{id}', [MeetingController::class, 'edit'])->name('meeting.edit');
Route::put('/dashboard/meeting/{id}', [MeetingController::class, 'update'])->name('meeting.update');
Route::delete('/dashboard/meeting/{id}', [MeetingController::class, 'destroy'])->name('meeting.destroy');

// Attendance routes
Route::get('/dashboard/attendance', fn() => Inertia::render('Panel/attendance/ManageAttendance'))->name('attendance');

// Additional verified group if needed
Route::middleware(['verified'])->group(function () {
    // Verified-only routes go here
});
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
