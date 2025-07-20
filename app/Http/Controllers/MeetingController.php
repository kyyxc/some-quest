<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingController extends Controller
{
    public function index(Request $request)
    {
        $view = $request->query('view', 'card');
        $page = $request->query('page', 1);

        $meetings = Meeting::with(['attendees'])->latest()->paginate(6, ['*'], 'page', $page);

        return Inertia::render('Panel/meeting-minutes/ManageMeeting', [
            'meetings' => $meetings,
            'view' => $view,
            'page' => $page,
        ]);
    }

    public function create()
    {
        return Inertia::render('Panel/meeting-minutes/FormMeeting', [
            'employees' => Employee::all(),
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
            'attendees.*' => 'numeric',
            'notes' => 'required|string',
            'followup' => 'nullable|string',
        ]);

        $meeting = Meeting::create([
            'title' => $data['title'],
            'date' => $data['date'],
            'location' => $data['location'],
            'duration' => $data['duration'],
            'notes' => $data['notes'],
            'followup' => $data['followup'],
        ]);

        $meeting->attendees()->attach($data['attendees']);

        return redirect()->back()->with('success', 'Meeting created successfully.');
    }

    public function show($id)
    {
        $meeting = Meeting::with('attendees')->findOrFail($id);

        return Inertia::render('Panel/meeting-minutes/ViewMeeting', [
            'meeting' => $meeting,
        ]);
    }

    public function edit($id)
    {
        $meeting = Meeting::with('attendees')->findOrFail($id);

        return Inertia::render('Panel/meeting-minutes/FormMeeting', [
            'meeting' => $meeting,
            'employees' => Employee::all(),
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
            'attendees.*' => 'numeric',
            'notes' => 'required|string',
            'followup' => 'nullable|string',
        ]);

        $meeting->update([
            'title' => $data['title'],
            'date' => $data['date'],
            'location' => $data['location'],
            'duration' => $data['duration'],
            'notes' => $data['notes'],
            'followup' => $data['followup'],
        ]);

        $meeting->attendees()->sync($data['attendees']);

        return redirect()->back()->with('success', 'Meeting updated successfully.');
    }

    public function destroy($id)
    {
        $meeting = Meeting::findOrFail($id);
        $meeting->delete();

        return redirect()->route('meeting')->with('success', 'Meeting deleted successfully.');
    }
}
