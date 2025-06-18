<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Web3\Web3;
use Web3\Eth;
use Web3\Contract;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Web3p\EthereumTx\Transaction;

class CertificateController extends Controller
{
    public function mintCertificate(Request $request)
    {
        $studentName = $request->input('student_name');
        $walletAddress = $request->input('wallet_address');
        $certificateDate = $request->input('certificate_date');

        $metadata = [
            'name' => "Certificate for $studentName",
            'description' => "Certificate issued on $certificateDate",
            'image' => 'ipfs://bafkreihsiuryn4xd7nbblzh3jejml44heh7detgepwoblvyp4adr2bdz24', 
            'attributes' => [
                ['trait_type' => 'Student Name', 'value' => $studentName],
                ['trait_type' => 'Date', 'value' => $certificateDate],
            ],
        ];

        $metadataJson = json_encode($metadata);
        $tmpFile = storage_path('app/' . Str::random(10) . '_metadata.json');
        file_put_contents($tmpFile, $metadataJson);

        // Upload to IPFS via Pinata
        $pinataApiKey = env('PINATA_API_KEY');
        $pinataSecretApiKey = env('PINATA_SECRET_API_KEY');

        $response = Http::withHeaders([
            'pinata_api_key' => $pinataApiKey,
            'pinata_secret_api_key' => $pinataSecretApiKey,
        ])->attach('file', file_get_contents($tmpFile), 'metadata.json')
          ->post('https://api.pinata.cloud/pinning/pinFileToIPFS');

        unlink($tmpFile); // Clean up

        if (!$response->successful()) {
            return response()->json(['error' => 'IPFS upload failed'], 500);
        }

        $ipfsHash = $response->json()['IpfsHash'];
        $tokenURI = $ipfsHash; // ✅ Remove 'ipfs://' prefix to match Remix behavior

        // Interact with Smart Contract
        $web3 = new Web3(env('WEB3_RPC_URL'));
        $contract = new Contract(
            $web3->provider, 
            json_decode(file_get_contents(storage_path('app/CertificateNFT.json')), true)['abi']
        );

        $data = $contract->at(env('CONTRACT_ADDRESS'))
                         ->getData('mintCertificate','0x70997970C51812dc3A010C7d01b50e0d17dc79C8',$tokenURI);

        $nonce = $this->getTransactionCount(env('WALLET_ADDRESS'));

        $transaction = [
            'nonce' => '0x' . dechex($nonce),
            'from' => env('WALLET_ADDRESS'),
            'to' => env('CONTRACT_ADDRESS'),
            'gas' => '0x2DC6C0',
            'gasPrice' => '0x09184e72a000',
            'value' => '0x0',
            'data' => $data,
            'chainId' => 31337
        ];

        $signedTx = $this->signTransaction($transaction, env('PRIVATE_KEY'));

        $web3->eth->sendRawTransaction('0x' . $signedTx, function ($err, $tx) {
            if ($err !== null) {
                return dd($err);
            }
            return dd($tx);
        });
    }

    private function getTransactionCount($address)
    {
        $web3 = new Web3(env('WEB3_RPC_URL'));
        $nonce = null;

        $web3->eth->getTransactionCount($address, 'latest', function ($err, $count) use (&$nonce) {
            if ($err === null) {
                $nonce = hexdec($count);
            }
        });

        while (is_null($nonce)) {
            usleep(100000);
        }
        return $nonce;
    }

    private function signTransaction($tx, $privateKey)
    {
        $tx = new Transaction($tx);
        return $tx->sign($privateKey);
    }
}
