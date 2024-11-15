<?php

namespace App\Jobs;

use App\Models\FollowUp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MarkMissedFollowUps implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
     public function handle()
     {
         FollowUp::where('status', FollowUp::STATUS_PENDING)
             ->where('scheduled_at', '<', now())
             ->update(['status' => FollowUp::STATUS_MISSED]);
     }
}
