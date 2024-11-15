<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class FollowUpApiController extends Controller
{
    public function store(Request $request) 
    {
        $validated = $request->validate([
            'lead_id' => 'required|exist:leads',
            'scheduled_at' => 'required',
            'status' => ['required', Rule::enum(['Pending', 'Completed', 'Missed'])]
        ]);

        $follow_up = FollowUp::create($validated);

        return response()->json($follow_up, Response::HTTP_CREATED);
    }
}
