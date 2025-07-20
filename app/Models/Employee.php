<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'nickname',
    ];

    public function archetypes(): BelongsToMany
    {
        return $this->belongsToMany(Archetype::class, 'employee_archetypes');
    }

    public function special_abilities(): BelongsToMany
    {
        return $this->belongsToMany(SpecialAbility::class, 'employee_special_abilities');
    }

    public function personalities(): BelongsToMany
    {
        return $this->belongsToMany(Personality::class, 'employee_personalities');
    }

    public function weakness(): BelongsToMany
    {
        return $this->belongsToMany(Weakness::class, 'employee_weakness');
    }

    public function quests(): HasMany
    {
        return $this->hasMany(Quest::class, 'pic_id');
    }


    public function attendees(): BelongsToMany
    {
        return $this->BelongsToMany(Meeting::class, 'meeting_attandance', 'attandance_id', 'meeting_id');
    }
}
