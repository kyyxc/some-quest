<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => [
                'user' => fn() => Auth::user(),
            ],
            'totalEmployees' => fn () => \App\Models\Employee::count(),
            'totalQuests' => fn () => \App\Models\Quest::count(),
            'totalMeetings' => fn () => \App\Models\Meeting::count(),
        ]);
    }
}
