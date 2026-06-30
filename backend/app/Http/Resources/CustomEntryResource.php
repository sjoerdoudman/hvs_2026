<?php

namespace App\Http\Resources;

use Statamic\Http\Resources\API\EntryResource;
use Statamic\Facades\Asset;
use App\Helpers\ImageHelper;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class CustomEntryResource extends EntryResource
{
    public function toArray($request)
    {
        // Get the default augmented data from the parent
        $entryData = parent::toArray($request);

        // Convert to array to make it fully mutable
        $entryData = json_decode(json_encode($entryData), true);

        // Check if 'blocks' exists and process it
        if (!empty($entryData['blocks'])) {
            $entryData['blocks'] = $this->processBlocks($entryData['blocks']);
        }

        // Recursively process any field that might contain text with assets
        $entryData = $this->processContentRecursive($entryData);

        return $entryData;
    }

    private function processBlocks($blocks) {
        foreach ($blocks as $blockKey => $block) {
            if ($block['type'] == 'makers') {
                $newItems = [];
                foreach ($block['items'] as $itemKey => $item) {
                    $newItems[] = $this->generateMakerOverride($item);
                }
                $blocks[$blockKey]['items'] = $newItems;
            }
            if ($block['type'] == 'slideshow') {
                $slides = [];
                foreach ($block['slides'] as $slideKey => $slide) {
                    $image = $this->generateImageOverride($slide['image']);
                    $slideObject = (object) array(
                        'image' => $image,
                        'caption' => $slide['caption'],
                        'id' => $slide['id']
                    );
                    $slides[] = $slideObject;
                }
                $blocks[$blockKey]['slides'] = $slides;
            }
            // Add automatic content processing for text blocks if needed
            if (isset($block['text'])) {
                $blocks[$blockKey]['text'] = $this->ensureAbsoluteUrls($block['text']);
            }
        }
        return $blocks;
    }

    private function processContentRecursive($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                if (is_string($value) && ($key === 'text' || $key === 'description')) {
                    $data[$key] = $this->ensureAbsoluteUrls($value);
                } else {
                    $data[$key] = $this->processContentRecursive($value);
                }
            }
        }
        return $data;
    }

    private function ensureAbsoluteUrls($content) {
        $baseUrl = config('app.url');
        // Replace src="/assets/..." or href="/assets/..." with src="https://domain.com/assets/..."
        return preg_replace('/(src|href)=["\'](\/assets\/[^"\']+)["\']/i', '$1="' . $baseUrl . '$2"', $content);
    }

    private function generateImageOverride($image) {
        try {
            $asset = Asset::find($image['id']);
            $srcset = ImageHelper::generateSrcset($asset);

            // Get original dimensions and metadata from asset
            $width = $asset['width'] ?? null;
            $height = $asset['height'] ?? null;
            $ratio = $width && $height ? $width / $height : null;

            $image = (object) array(
                'id' => $image['id'],
                'alt' => $image['alt'],
                'srcset' => $srcset,
                'url' => config('app.url') . $asset->manipulate(['w' => 1536, 'fit' => 'max']),
                'original' => [
                    'url' => config('app.url') . $asset->url(),
                    'width' => $width,
                    'height' => $height,
                    'ratio' => $ratio,
                    'orientation' => $ratio > 1 ? 'landscape' : ($ratio < 1 ? 'portrait' : 'square'),
                    'size' => $asset['size'] ?? null,
                    'mime' => $asset['mime'] ?? null,
                ],
                'preload' => config('app.url') . $asset->manipulate(['w' => 100, 'blur' => 100, 'px' => 16, 'fit' => 'crop', 'crop' => 'entropy', 'auto' => 'format, compress 100w']),
            );
            return $image;
        } catch (\Exception $e) {
            Log::error('Error generating image override: ' . $e->getMessage());
            return $image; // Return original if error occurs
        }
    }

    private function generateMakerOverride($maker) {
        // Get the full maker entry
        $makerEntry = \Statamic\Facades\Entry::find($maker['id']);

        if (!$makerEntry) {
            return $maker; // Return original if not found
        }

        // Access data as array since Entry implements ArrayAccess
        $makerObj = (object) array(
            'id' => $maker['id'],
            'image' => $makerEntry['image'] ?? null,
            'title' => $makerEntry['title'] ?? '',
            'function' => $makerEntry['function'] ?? '',
            'description' => $makerEntry['description'] ?? '',
            'slug' => $makerEntry['slug'] ?? '',
            'url' => $makerEntry['uri'] ?? '',
            'permalink' => '/' . ($makerEntry['uri'] ?? ''),
        );

        return $makerObj;
    }

    private function getVimeoId($url) {
        // Regular expression to match Vimeo video ID from both types of URLs
        preg_match('/(?:vimeo\.com\/|video\/)(\d+)/', $url, $matches);

        // If a match is found, return the video ID
        return $matches[1] ?? null;
    }
}