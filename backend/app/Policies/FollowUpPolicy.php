<?php

namespace App\Policies;

use App\Models\FollowUp;
use App\Models\User;

class FollowUpPolicy
{
    /**
     * Create a new policy instance.
     */
    public function update(User $user, FollowUp $followUp)
    {
        return in_array($user->role, [
            User::ROLE_ADMIN,
            User::ROLE_SALES_MANAGER
        ]);
    }
}
