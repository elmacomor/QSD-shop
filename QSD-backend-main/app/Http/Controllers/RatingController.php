<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    //Helpers functions
    private function infoResponse($status, $message, $record = null): JsonResponse {
        return response()->json([
            'message' => $message,
        ],$status);
    }

    private function updateRating(Request $request): void {
        $averageRating = Rating::where('product_id', $request->product_id)->avg('number') ?? 0;
        Product::where('id', $request->product_id)->update(['average_rating' => $averageRating]);

        $total_rating = Rating::where('product_id', $request->product_id)->count();
        Product::where('id', $request->product_id)->update(['total_rating' => $total_rating]);
    }


    //Rating endpoint methods
    public function rateProduct(Request $request): JsonResponse {
        $validator = Validator::make($request->all(),[
            'product_id' => 'required|integer|exists:products,id',
            'number' => 'required|integer|min:1|max:5'
        ]);

        if($validator->fails()){
            return $this->infoResponse(422, $validator->messages());
        }

        $user = Auth::user();
        $existingRating = Rating::where('product_id', $request->product_id)
            ->where('user_id', $user->id);

        if($existingRating->count() > 0){
            $existingRating->update([
               'number' => $request->number,
            ]);

            $this->updateRating($request);
            return $this->infoResponse(200, 'Rating updated successfully.');
        }

        $newRating = Rating::create([
            'number' => $request->number,
            'product_id' => $request->product_id,
            'user_id' => $user->id
        ]);

        $this->updateRating($request);
        return $this->infoResponse(200, 'Rating saved successfully.');
    }
}
