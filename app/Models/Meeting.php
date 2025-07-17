<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function quests(): HasMany
    {
        return $this->hasMany(Quest::class, 'meeting_id');
    }
}
