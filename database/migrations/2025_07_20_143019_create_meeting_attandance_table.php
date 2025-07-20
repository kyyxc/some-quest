<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meeting_attandance', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(App\Models\Meeting::class, 'meeting_id');
            $table->foreignIdFor(App\Models\Employee::class, 'attandance_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_attandance');
    }
};
