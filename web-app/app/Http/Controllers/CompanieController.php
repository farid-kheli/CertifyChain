<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\CertificateController;

class CompanieController extends Controller
{
    public function Issue(Request $request){
        $certificateController = new CertificateController();
        $tx = $certificateController->mintCertificate($request);
        dd($tx);
    }
}
