<?php
header('Content-Type: application/json');

$transactionId = trim($_GET['id'] ?? '');

if (empty($transactionId)) {
    echo json_encode(['success' => false, 'pago' => false, 'message' => 'ID não fornecido']);
    exit;
}

// Normaliza o ID (remove caracteres especiais) — mesmo que o webhook faz
$idNormalizado = preg_replace('/[^a-zA-Z0-9_-]/', '', $transactionId);

// Verifica se o arquivo de pagamento existe
$pastaPagetos = __DIR__ . '/pagamentos';
$caminhoArquivo = $pastaPagetos . '/' . $idNormalizado . '.txt';

$pago = false;
$status = 'PENDING';
$arquivoExiste = file_exists($caminhoArquivo);

if ($arquivoExiste) {
    $conteudo = trim(file_get_contents($caminhoArquivo));
    if ($conteudo === 'PAID') {
        $pago = true;
        $status = 'PAID';
    }
}

echo json_encode([
    'success'          => true,
    'pago'             => $pago,
    'status'           => $status,
    'transactionId'    => $transactionId,
    'idNormalizado'    => $idNormalizado,
    'arquivoExiste'    => $arquivoExiste,
    'caminhoArquivo'   => $caminhoArquivo,
]);
