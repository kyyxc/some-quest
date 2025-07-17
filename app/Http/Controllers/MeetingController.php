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

        Meeting::create($data);

        return redirect()->back()->with('success', 'Meeting created successfully.');
    }

    public function show($id)
    {
        $meeting = Meeting::findOrFail($id);

        return Inertia::render('MoM/ViewMeeting', [
            'meeting' => $meeting,
        ]);
    }

    public function edit($id)
    {
        $meeting = Meeting::findOrFail($id);

        return Inertia::render('MoM/AddMeeting', [
            'meeting' => $meeting,
        ]);
    }

    public function update(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

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

        $meeting->update($data);

        return redirect()->back()->with('success', 'Meeting updated successfully.');
    }

    public function destroy($id)
    {
        $meeting = Meeting::findOrFail($id);
        $meeting->delete();

        return redirect()->route('meeting')->with('success', 'Meeting deleted successfully.');
    }
}
