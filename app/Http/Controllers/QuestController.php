<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Meeting;
use App\Models\Quest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quests = Quest::with(['meeting_minutes', 'pic:id,full_name,nickname'])
            ->orderBy('updated_at', 'asc')
            ->get();


        return Inertia::render('Panel/quest/ManageQuest', [
            'quests' => $quests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Panel/quest/CreateQuest', [
            'pics' => Employee::get(),
            'moms' => Meeting::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'pic_id' => 'required|exists:person_in_charges,id',
            'status' => 'required|string',
            'meeting_id' => 'nullable|exists:meetings,id'
        ]);

        $quest = Quest::create($validated);

        return redirect('/dashboard/quests');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quest $quest)
    {
        return inertia('Panel/quest/EditQuest', [
            'quest' => $quest->load('pic'),
            'pics' => Employee::select('id', 'full_name', 'nickname')->get(),
            'moms' => Meeting::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quest $quest)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|string',
            'pic_id' => 'required|exists:person_in_charges,id',
            'meeting_id' => 'nullable|exists:meetings,id'
        ]);

        $quest->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'pic_id' => $validated['pic_id'],
            'status' => $validated['status'],
            'meeting_id' => $validated['meeting_id'],
            'updated_at' => Carbon::now(),
        ]);

        return redirect('/dashboard/quests');
    }

    public function update_status(Request $request, Quest $quest)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,ready,on_progress,done'
        ]);

        $quest->update([
            'status' => $validated['status'],
            'updated_at' => Carbon::now(),
        ]);

        return redirect()->back()->with('success', 'Employee updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quest $quest)
    {
        $quest->delete();
        return redirect()->back()->with('success', 'Employee deleted successfully');
    }
}
