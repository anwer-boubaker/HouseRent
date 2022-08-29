<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HouseResource extends JsonResource
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
            'id_house' => $this->id_house,
            'title' => $this->title,
            'discreption' => $this->discreption,
            'location' => $this->location,
            'price_day' => $this->price_day,
            'price_week' => $this->price_week,
            'price_month' => $this->price_month,
            'user' => new UserResource($this->user),
            'summer_price' => new SummerPriceResource($this->sumPrice),
            'images' => imageResource::collection($this->images),
            'reservation' => reservationResource::collection($this->reservation)
        ];
    }
}
