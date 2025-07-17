<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quest extends Model
{
    /** @use HasFactory<\Database\Factories\QuestFactory> */
    use HasFactory;

    protected $fillable = ['title', 'description', 'pic_id', 'status', 'meeting_id'];

    public function pic(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'pic_id');
    }

    public function meeting_minutes(): BelongsTo
    {
        return $this->belongsTo(Meeting::class, 'meeting_id');
    }
}
