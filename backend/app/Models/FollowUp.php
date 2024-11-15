<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FollowUp extends Model
{
    use HasFactory;

    protected $fillable = ['lead_id', 'scheduled_at', 'status'];

    const STATUS_PENDING = 'Pending';
    const STATUS_COMPLETED = 'Completed';
    const STATUS_MISSED = 'Missed';

    protected $casts = [
        'scheduled_at' => 'datetime'
    ];

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }
}
