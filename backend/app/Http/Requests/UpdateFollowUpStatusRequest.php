<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\FollowUp;
use Illuminate\Validation\Rule;

class UpdateFollowUpStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'status' => [
                'required',
                Rule::in([
                    FollowUp::STATUS_PENDING,
                    FollowUp::STATUS_COMPLETED,
                    FollowUp::STATUS_MISSED
                ])
            ]
        ];
    }
}
