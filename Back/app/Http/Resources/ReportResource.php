<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id_report' => $this->id_report,
            'user' => new UserResource($this->user),
            'user_reported' => new UserResource($this->userReported),
            'discreption' => $this->discreption,
        ];
    }
}
