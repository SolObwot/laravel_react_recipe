<?php

namespace App\Http\Controllers;

use App\Events\FollowUpStatusChanged;
use App\Http\Requests\UpdateFollowUpStatusRequest;
use App\Models\FollowUp;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class FollowUpApiController extends Controller
{
    public function store(Request $request) 
    {
        $validated = $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'scheduled_at' => 'required|date|after:now',
            'status' => 'required|in:Pending,Completed,Missed'
        ]);

        $follow_up = FollowUp::create($validated);

        return response()->json($follow_up, Response::HTTP_CREATED);
    }


    public function updateStatus(UpdateFollowUpStatusRequest $request, FollowUp $followUp)
{
    $this->authorize('update', $followUp);
    
    $oldStatus = $followUp->status;
    $followUp->update(['status' => $request->status]);
    
    event(new FollowUpStatusChanged($followUp, $oldStatus));
    
    return response()->json($followUp);
}

}
