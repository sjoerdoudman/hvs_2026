<?php

namespace App\Providers;
use Statamic\Facades\Entry;
use Statamic\Http\Resources\API\Resource;
use Statamic\Facades\Collection;
use App\Http\Resources\CustomEntryResource;
use Statamic\Http\Resources\API\EntryResource;
use Illuminate\Support\Facades\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Resource::map([
            EntryResource::class => CustomEntryResource::class,
        ]);

       $this->addComputedFields();
    }


    private function addComputedFields()
    {
        Collection::computed(
            'events',
            'title',
            fn($entry) => Carbon::parse($entry->date)->format('Y-m-d')
        );
    }
}
