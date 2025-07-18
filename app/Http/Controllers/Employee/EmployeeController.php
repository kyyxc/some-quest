<?php


namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
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
    public function index(Request $request)
    {
        $view = $request->query('view', 'card');
        $page = $request->query('page', 1);

        $employees = Employee::with(['archetypes', 'special_abilities', 'personalities', 'weakness'])
            ->latest()->paginate(10, ['*'], 'page', $page);

        return Inertia::render('Panel/employee/ManageEmployees', [
            'employees' => $employees,
            'archetypes' => Archetype::all(),
            'abilities' => SpecialAbility::all(),
            'personalities' => Personality::all(),
            'weakness' => Weakness::all(),
            'view' => $view,
            'page' => $page,
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
            'archetypes' => 'array|required',
            'special_abilities' => 'array|required',
            'personalities' => 'array|required',
            'weakness' => 'array|required',
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
