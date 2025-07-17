<?php

namespace Database\Seeders;

use App\Models\Meeting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Meeting::create([
            'title' => 'Weekly Team Sync',
            'date' => '2024-02-15',
            'location' => 'Conference Room A',
            'duration' => '1 hour',
            'attendees' => 'Alice, Bob, Charlie',
            'notes' => 'Discussed project updates and next steps.',
            'followup' => 'Send meeting minutes to all attendees.',
        ]);
        
        Meeting::create([
            'title' => 'Project Kickoff',
            'date' => '2024-02-20',
            'location' => 'Zoom',
            'duration' => '2 hours',
            'attendees' => 'Alice, Bob, Charlie, Dave',
            'notes' => 'Introduced project goals and timelines.',
            'followup' => 'Share project documentation with the team.',
        ]);
    }
}
