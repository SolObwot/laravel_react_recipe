<?php

namespace App\Listeners;

use App\Events\FollowUpStatusChanged;
use App\Models\FollowUp;
use App\Models\User;
use App\Notifications\FollowUpMissed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendMissedFollowUpNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FollowUpStatusChanged $event)
    {
        if ($event->followUp->status === FollowUp::STATUS_MISSED) {
            $users = User::whereIn('role', [
                User::ROLE_ADMIN,
                User::ROLE_SALES_MANAGER
            ])->get();

            foreach ($users as $user) {
                $user->notify(new FollowUpMissed($event->followUp));
            }
        }
    }
}
