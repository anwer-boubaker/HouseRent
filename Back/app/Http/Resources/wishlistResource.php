<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class wishlistResource extends JsonResource
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
            'house' => new HouseResource($this->house) ,
            'user' => new UserResource($this->user),
        ];
    }
}
