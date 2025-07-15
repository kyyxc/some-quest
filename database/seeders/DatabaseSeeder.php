<?php

namespace Database\Seeders;

use App\Models\Archetype;
use App\Models\Employee;
use App\Models\Personality;
use App\Models\SpecialAbility;
use App\Models\Weakness;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $employee = Employee::factory()->create([
            'full_name' => 'Ali',
            'nickname' => 'muhammad ali'
        ]);

        // Archetype
        Archetype::insert(collect([
            'Developer',
            'Designer',
            'QA',
            'Analyst',
            'Support',
            'Product Manager',
            'DevOps',
        ])->map(fn($name) => ['name' => $name])->toArray());


        // Special Ability
        SpecialAbility::insert(collect([
            'Problem Solving',
            'Communication',
            'Leadership',
            'Technical Expertise',
            'Project Management',
            'Mentoring',
            'Innovation',
        ])->map(fn($name) => ['name' => $name])->toArray());

        // Personalities
        Personality::insert(collect([
            'Analytical',
            'Creative',
            'Detail-Oriented',
            'Team Player',
            'Independent',
            'Adaptable',
            'Proactive',
        ])->map(fn($name) => ['name' => $name])->toArray());

        // Weakness
        Weakness::insert(collect([
            'Procrastination',
            'Lack of Focus',
            'Poor Time Management',
            'Perfectionism',
            'Difficulty with Deadlines',
            'Communication Issues',
            'Micromanagement',
        ])->map(fn($name) => ['name' => $name])->toArray());

        $employee->archetypes()->attach([1, 2, 3]);
        $employee->special_abilities()->attach([1, 2, 3]);
        $employee->personalities()->attach([1, 2, 3]);
        $employee->weakness()->attach([1, 2, 3]);
    }
}
