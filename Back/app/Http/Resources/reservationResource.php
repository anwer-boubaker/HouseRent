<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class reservationResource extends JsonResource
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
            'id_reservation' => $this->id_reservation,
            'user' => new UserResource($this->user),
//            'house' => new HouseResource($this->house),
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'confirmation' => $this->confirmation
        ];
    }
}
