<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;

Route::get('login', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('dashboard', function () {
    return Inertia::render('Panel/Dashboard');
})->name('dashboard');

Route::get('dashboard/employees', function () {
    return Inertia::render('Panel/ManageEmployees');
})->name('employees');

Route::get('dashboard/meeting', function () {
    return Inertia::render('Panel/ManageMeeting');
})->name('meeting');

Route::get('dashboard/quest', function () {
    return Inertia::render('Panel/ManageQuest');
})->name('quest');

Route::get('dashboard/attendance', function () {
    return Inertia::render('Panel/ManageAttendance');
})->name('attendance');

Route::middleware(['auth', 'verified'])->group(function () {});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
