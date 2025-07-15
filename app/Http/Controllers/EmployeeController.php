<?php

namespace App\Http\Controllers;

use App\Models\Archetype;
use App\Models\Employee;
use App\Models\Personality;
use App\Models\SpecialAbility;
use App\Models\Weakness;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with(['archetypes', 'special_abilities', 'personalities', 'weakness'])->latest()
            ->get();

        return Inertia::render('Panel/ManageEmployees', [
            'employees' => $employees,
            'archetypes' => Archetype::select('id', 'name')->get(),
            'abilities' => SpecialAbility::select('id', 'name')->get(),
            'personalities' => Personality::select('id', 'name')->get(),
            'weakness' => Weakness::select('id', 'name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'archetypes' => 'array',
            'special_abilities' => 'array',
            'personalities' => 'array',
            'weakness' => 'array',
        ]);

        $employee = Employee::create([
            'full_name' => $validated['full_name'],
            'nickname' => $validated['nickname']
        ]);

        $employee->archetypes()->attach($validated['archetypes']);
        $employee->special_abilities()->attach($validated['special_abilities']);
        $employee->personalities()->attach($validated['personalities']);
        $employee->weakness()->attach($validated['weakness']);

        return redirect()->back()->with('success', 'Employee added successfully');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'archetypes' => 'array',
            'special_abilities' => 'array',
            'personalities' => 'array',
            'weakness' => 'array',
        ]);

        $employee->update([
            'full_name' => $validated['full_name'],
            'nickname' => $validated['nickname'],
        ]);

        $employee->archetypes()->sync($validated['archetypes'] ?? []);
        $employee->special_abilities()->sync($validated['special_abilities'] ?? []);
        $employee->personalities()->sync($validated['personalities'] ?? []);
        $employee->weakness()->sync($validated['weakness'] ?? []);

        return redirect()->back()->with('success', 'Employee added successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->back()->with('success', 'Employee deleted successfully');
    }
}
