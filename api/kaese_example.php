<?php
// kaese.php - Proxy to Actix Backend (Pass-through)

// ENABLE DEBUGGING
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// CHECK EXTENSIONS
if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => 'PHP cURL extension is missing on this server. Please install php-curl.']);
    exit();
}

// CONFIGURATION - ENTER YOUR VALUES HERE
$ACTIX_BASE_URL = 'YOUR-ACTIX-BACKEND-URL';
$API_KEY = 'YOUR-API-KEY';

function callActix($method, $url, $data = null) {
    global $API_KEY;
    $ch = curl_init($url);
    
    $headers = [
        'Content-Type: application/json',
        'x-api-key: ' . $API_KEY
    ];

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    // IMPORTANT: Disable SSL verification to rule out certificate issues
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    
    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        throw new Exception('Curl Error (' . curl_errno($ch) . '): ' . curl_error($ch));
    }
    
    curl_close($ch);
    
    return ['code' => $httpCode, 'body' => $response];
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $result = callActix('GET', $ACTIX_BASE_URL);
            if ($result['code'] >= 200 && $result['code'] < 300) {
                echo $result['body'];
            } else {
                http_response_code($result['code']);
                echo $result['body'] ?: json_encode(['error' => 'Upstream returned empty body']);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            $result = callActix('POST', $ACTIX_BASE_URL, $input);
            http_response_code($result['code']);
            echo $result['body'];
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            if (!isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID is required']);
                exit();
            }

            $id = $input['id'];
            
            // Logic for partial rating updates
            if (isset($input['user']) && isset($input['rating'])) {
                $getRes = callActix('GET', "$ACTIX_BASE_URL/$id");
                if ($getRes['code'] !== 200) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Cheese not found for rating update']);
                    exit();
                }
                $current = json_decode($getRes['body'], true);
                
                $ratings = $current['ratings'] ?? []; 
                if (!is_array($ratings)) $ratings = []; 
                
                $ratings[$input['user']] = floatval($input['rating']);
                
                $updatePayload = [
                    'name' => $current['name'],
                    'beschrieb' => $current['beschrieb'],
                    'art' => $current['art'],
                    'lieferant' => $current['lieferant'],
                    'ratings' => $ratings
                ];
                
                $putRes = callActix('PUT', "$ACTIX_BASE_URL/$id", $updatePayload);
                http_response_code($putRes['code']);
                echo $putRes['body'];

            } else {
                $result = callActix('PUT', "$ACTIX_BASE_URL/$id", $input);
                http_response_code($result['code']);
                echo $result['body'];
            }
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'ID is required']);
                exit();
            }

            $result = callActix('DELETE', "$ACTIX_BASE_URL/$id");
            http_response_code($result['code']);
            echo $result['body'];
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy Error: ' . $e->getMessage()]);
}
?>
