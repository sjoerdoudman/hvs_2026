<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageHelper
{
    public static function generateSrcset($asset)
    {
        // Define image sizes
        $sizes = ['640', '768', '1024', '1280', '1536'];
        $srcset = [];

        // get image relative path
        $url = $asset->path();

        // Get the original file path
        $originalPath = $asset->resolvedPath(); // This gets the full path of the asset in storage
        $originalFilename = pathinfo($originalPath, PATHINFO_FILENAME);
        $originalExtension = pathinfo($originalPath, PATHINFO_EXTENSION);

        // // Define storage path for processed images
        // $storagePath = 'public/resized-images'; // Adjust as needed
        // $baseUrl = config('app.url') . "/storage/resized-images";

        // foreach ($sizes as $size) {
        //     // Create filename for the resized image
        //     $resizedFilename = "{$originalFilename}-{$size}.{$originalExtension}";
        //     $resizedPath = "{$storagePath}/{$resizedFilename}";

        //     // Check if the image already exists, if not, create it
        //     if (!Storage::exists($resizedPath)) {
        //         $image = Image::make($originalPath)
        //             ->resize($size, null, function ($constraint) {
        //                 $constraint->aspectRatio();
        //                 $constraint->upsize();
        //             });

        //         // Save the resized image to storage
        //         Storage::put($resizedPath, (string) $image->encode());
        //     }

        //     // Add to srcset
        //     $srcset[] = "{$baseUrl}/{$resizedFilename} {$size}w";
        // }

        return implode(', ', $srcset);
    }
}