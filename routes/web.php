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

// Route::middleware('auth')->group(function () {
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// Dashboard routes
Route::get('/', fn() => redirect()->route('dashboard'));
Route::get('/dashboard', fn() => Inertia::render('Panel/dashboard/ManageDashboard'))->name('dashboard');

// Employee routes
Route::get('/dashboard/employees', [EmployeeController::class, 'index'])->name('employees');
Route::post('/employees', [EmployeeController::class, 'store'])->name('storeEmployees');
Route::put('/employees/{employee:id}', [EmployeeController::class, 'update'])->name('updateEmployees');
Route::delete('/employees/{employee:id}', [EmployeeController::class, 'destroy'])->name('deleteEmployees');

// Quest routes
Route::get('/dashboard/quests', [QuestController::class, 'index'])->name('quests.index');
Route::get('/quests/create', [QuestController::class, 'create'])->name('quests.create');
Route::post('/quests', [QuestController::class, 'store'])->name('quests.store');
Route::get('/quests/{quest}', [QuestController::class, 'show']);
Route::get('/quests/{quest}/edit', [QuestController::class, 'edit']);
Route::put('/quests/{quest}', [QuestController::class, 'update']);
Route::put('/quests/{quest:id}/status', [QuestController::class, 'update_status'])->name('updateQuestsStatus');
Route::delete('/quests/{quest:id}', [QuestController::class, 'destroy'])->name('quests.delete');

// Meeting routes
Route::get('/dashboard/meeting', [MeetingController::class, 'index'])->name('meeting');
Route::get('/dashboard/meeting/create', [MeetingController::class, 'create'])->name('meeting.create');
Route::post('/dashboard/meeting', [MeetingController::class, 'store'])->name('meeting.store');
Route::get('/dashboard/meeting/view/{id}', [MeetingController::class, 'show'])->name('meeting.view');
Route::get('/dashboard/meeting/edit/{id}', [MeetingController::class, 'edit'])->name('meeting.edit');
Route::put('/dashboard/meeting/{id}', [MeetingController::class, 'update'])->name('meeting.update');
Route::delete('/dashboard/meeting/{id}', [MeetingController::class, 'destroy'])->name('meeting.destroy');

// Attendance routes
Route::get('/dashboard/attendance', fn() => Inertia::render('Panel/ManageAttendance'))->name('attendance');

// Additional verified group if needed
Route::middleware(['verified'])->group(function () {
    // Verified-only routes go here
});
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
