<?php

use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\QuestController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('login', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('dashboard', function () {
    return Inertia::render('Panel/Dashboard');
})->name('dashboard');

Route::get('/dashboard/employees', [EmployeeController::class, 'index'])->name('employees');
Route::post('/employees', [EmployeeController::class, 'store'])->name('storeEmployees');
Route::put('/employees/{employee:id}', [EmployeeController::class, 'update'])->name('updateEmployees');
Route::delete('/employees/{employee:id}', [EmployeeController::class, 'destroy'])->name('updateEmployees');


Route::get('/dashboard/quests', [QuestController::class, 'index'])->name('quests');
Route::get('/quests/create', [QuestController::class, 'create'])->name('quests.create');
Route::post('/quests', [QuestController::class, 'store'])->name('quests.store');
Route::get('/quests/{quest}', [QuestController::class, 'show']);
Route::get('/quests/{quest}/edit', [QuestController::class, 'edit']);
Route::put('/quests/{quest}', [QuestController::class, 'update']);
Route::put('/quests/{quest:id}/status', [QuestController::class, 'update_status'])->name('updateQuestsStatus');
Route::delete('/quests/{quest:id}', [QuestController::class, 'destroy'])->name('quests.delete');

Route::get('dashboard/meeting', function () {
    return Inertia::render('Panel/ManageMeeting');
})->name('meeting');

Route::get('dashboard/attendance', function () {
    return Inertia::render('Panel/ManageAttendance');
})->name('attendance');

Route::middleware(['auth', 'verified'])->group(function () {});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
