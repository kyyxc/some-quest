<?php

use Carbon\Carbon;
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
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->nullable()->default('title');
            $table->date('date')->nullable()->default(Carbon::now());
            $table->string('location', 100)->nullable()->default('location');
            $table->string('duration', 100)->nullable()->default('duration');
            $table->text('notes')->nullable()->default('notes');
            $table->text('followup')->nullable()->default('followup');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
