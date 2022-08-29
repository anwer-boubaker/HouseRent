<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id_user' => $this->id_user,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'password' => $this->password,
            'phone_number' => $this->phone_number,
            'city' => $this->city,
            'prefered_place' => $this->prefered_place,
            'block' => $this->block,
            'block_duration' => $this->block_duration,
            'user_type' => $this->user_type
        ];
    }
}
