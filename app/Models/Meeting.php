<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'location',
        'duration',
        'attendees',
        'notes',
        'followup',
    ];

    protected $casts = [
        'attendees' => 'array',
    ];

    public function attendees()
    {
        return $this->BelongsToMany(Employee::class, 'meeting_attandance', 'meeting_id', 'attandance_id');
    }
}
