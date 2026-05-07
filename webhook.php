<?php
header('Content-Type: application/json');

// Recebe o JSON enviado pela ZuckPay
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log de debug
file_put_contents(__DIR__ . '/webhook_log.txt', date('Y-m-d H:i:s') . " - WEBHOOK RECEBIDO: " . $json . PHP_EOL, FILE_APPEND);

if (isset($data['transaction'])) {
    $trans = $data['transaction'];
    $status = $trans['status'] ?? '';
    $evento = $data['event'] ?? '';
    $id = $trans['id'] ?? '';

    if (!empty($id)) {
        // Quando o PIX é pago
        if ($status === 'PAID' || $evento === 'payment_approved') {
            $pasta = __DIR__ . '/pagamentos';
            if (!is_dir($pasta)) {
                mkdir($pasta, 0777, true);
            }

            // Cria arquivo marcando como pago
            $caminhoArquivo = $pasta . '/' . preg_replace('/[^a-zA-Z0-9_-]/', '', $id) . '.txt';
            file_put_contents($caminhoArquivo, "PAID");

            file_put_contents(__DIR__ . '/webhook_log.txt', date('Y-m-d H:i:s') . " - ✅ PAGAMENTO CONFIRMADO: " . $id . PHP_EOL, FILE_APPEND);

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Pagamento registrado"]);
            exit;
        }
    }
}

http_response_code(400);
echo json_encode(["success" => false, "message" => "Evento ignorado"]);
