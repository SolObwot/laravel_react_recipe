<?php

namespace App\Notifications;

use App\Models\FollowUp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FollowUpMissed extends Notification
{
    use Queueable;

    protected $followUp;

    /**
     * Create a new notification instance.
     */
    public function __construct(FollowUp $followUp)
    {
        $this->followUp = $followUp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Follow-up Missed')
            ->line('A follow-up has been marked as missed:')
            ->line('Lead: ' . $this->followUp->lead->name)
            ->line('Scheduled: ' . $this->followUp->scheduled_at->format('Y-m-d H:i'))
            ->action('View Leads', url('/leads'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
