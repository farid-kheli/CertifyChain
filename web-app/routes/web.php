<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CompanieController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::group(['middleware' => ['auth','verified']],  function(){
    Route::get('admin/dashboard', function () { return Inertia::render('admindashbord'); })->name('admin.dashbord');
    Route::get('admin/new/companie', function () { return Inertia::render('newcompanie'); })->name('admin.dashbord');
    Route::post('admin/new/companie',[AdminController::class,'StorCompanie'] )->name('create.companie');
})->middleware(AdminMiddleware::class);
Route::get('companie/dashbord', function () {
    return Inertia::render('companiedashbord');
})->name('companie.dashbord');
Route::get('companie/issue/cert', function () {return Inertia::render('issuecert');})->name('certificates.issue');
Route::post('companie/issue/cert', [CompanieController::class,'Issue'] )->name('certificates.issue');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
