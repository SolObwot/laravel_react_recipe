<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LeadsApiController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required' 
        ]);

        $lead = Lead::create($validated);

        return response()->json($lead, Response::HTTP_CREATED);
    }
}
