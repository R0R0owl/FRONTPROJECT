<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image;
use Validator;

class ImageController extends Controller
{
    public function index()
    {
        $image = Image::all();

        return response()->json(['post' => $image])
            ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function create(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'image_base' => 'required|max:4000',
        ]);

        $validated = $request->validate([
            'image_base' => 'required|max:4000',
        ]);

        foreach ($validated['image_base'] as $base64Image) {
            $imageData = base64_decode($base64Image);
        }
    }
}
