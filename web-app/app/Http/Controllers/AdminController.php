<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Companie;
use Illuminate\Support\Facades\Storage;
class AdminController extends Controller
{
    public function StorCompanie(Request $request)
    {
        //dd($request->all());


        $logoPath = $request->file('logoFile')->store('logos', 'public');
        $logoPath = Storage::url($logoPath);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'company',
        ]);

        Companie::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'logo' => $logoPath,
            'websit_url' => $request->websit_url,
            'address' => $request->address,
            'discription' => $request->discription,
        ]);

        return redirect()->route('admin.dashbord')->with('success', 'Company created successfully.');
    }
    
}
