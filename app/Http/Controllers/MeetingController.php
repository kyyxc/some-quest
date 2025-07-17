<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingController extends Controller
{
    public function index()
    {
        $meetings = Meeting::latest()->paginate(6);

        return Inertia::render('Panel/ManageMeeting', [
            'meetings' => $meetings,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date',
            'location' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:100',
            'attendees' => 'required|array',
            'attendees.*' => 'string|max:100',
            'notes' => 'required|string',
            'followup' => 'nullable|string',
        ]);
        $meeting = Meeting::create($data);
    }
}
