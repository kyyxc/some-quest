<?php

use App\Models\Meeting;
use App\Models\PersonInCharge;
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
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignIdFor(PersonInCharge::class, 'pic_id');
            $table->enum('status', ['new', 'ready', 'on_progress', 'done'])->default('new');
            $table->foreignIdFor(Meeting::class, 'meeting_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
