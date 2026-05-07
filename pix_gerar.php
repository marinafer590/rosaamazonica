<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$client_id     = 'boazenrique16_3750276116';
$client_secret = '596a1b423017f1605d30f9291968f61cd7f26f611979a544dc430acef6d29432';

$nome     = trim($_POST['nome']     ?? '');
$email    = trim($_POST['email']    ?? '');
$cpf      = preg_replace('/\D/', '', $_POST['cpf']      ?? '');
$telefone = preg_replace('/\D/', '', $_POST['telefone'] ?? '');
$valor    = floatval($_POST['valor'] ?? 0);

if (!$nome || !$email || strlen($cpf) < 11 || strlen($telefone) < 10 || $valor <= 0) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

// ── Tentativa 1: body JSON sem Authorization header ──────────
$payload_json = json_encode([
    'client_id'     => $client_id,
    'client_secret' => $client_secret,
    'nome'          => $nome,
    'email'         => $email,
    'cpf'           => $cpf,
    'telefone'      => $telefone,
    'valor'         => $valor,
    'descricao'     => 'Pedido Rosa Selvagem',
]);

$ch = curl_init('https://zuckpay.com.br/conta/v3/pix/qrcode');
curl_setopt($ch, CURLOPT_IPRESOLVE,      CURL_IPRESOLVE_V4);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     $payload_json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT,        30);
curl_setopt($ch, CURLOPT_HTTPHEADER,    ['Content-Type: application/json']);

$raw  = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

$res = json_decode($raw, true);

// Debug Log
file_put_contents('debug_pix.txt', date('Y-m-d H:i:s') . " - URL: https://zuckpay.com.br/conta/v3/pix/qrcode - CODE: $code - RAW: $raw\n", FILE_APPEND);

// ── Se ainda der 401, tenta via form-urlencoded ──────────────
if ($code === 401) {
    $payload_form = http_build_query([
        'client_id'     => $client_id,
        'client_secret' => $client_secret,
        'nome'          => $nome,
        'email'         => $email,
        'cpf'           => $cpf,
        'telefone'      => $telefone,
        'valor'         => $valor,
        'descricao'     => 'Pedido Rosa Selvagem',
    ]);

    $ch2 = curl_init('https://zuckpay.com.br/conta/v3/pix/qrcode');
    curl_setopt($ch2, CURLOPT_IPRESOLVE,      CURL_IPRESOLVE_V4);
    curl_setopt($ch2, CURLOPT_POST,           true);
    curl_setopt($ch2, CURLOPT_POSTFIELDS,     $payload_form);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_TIMEOUT,        30);
    curl_setopt($ch2, CURLOPT_HTTPHEADER,    ['Content-Type: application/x-www-form-urlencoded']);

    $raw  = curl_exec($ch2);
    $code = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch2);
    curl_close($ch2);

    $res = json_decode($raw, true);
}

if ($err) {
    echo json_encode(['success' => false, 'message' => "Erro de conexão: $err"]);
    exit;
}

if (($code === 200 || $code === 201) && isset($res['transactionId'])) {
    echo json_encode([
        'success'       => true,
        'transactionId' => $res['transactionId'],
        'pix_code'      => $res['pix_code'] ?? $res['qrcode'] ?? '',
        'qrcode_image'  => $res['qrcode_image'] ?? '',
    ]);
} else {
    echo json_encode([
        'success'   => false,
        'message'   => $res['message'] ?? $res['error'] ?? 'Erro ao gerar PIX.',
        'http_code' => $code,
        'debug'     => $res,
    ]);
}
