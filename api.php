<?php

header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$words = $_GET['words'];
$language = $_GET['language'];

$prompt = "Згенери ідеї стартапів для " . $words;
if ($language == 'en') {
    $prompt = "Generate startup ideas for " . $words;
}

$apiKey = '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';

$url = 'https://api.openai.com/v1/chat/completions';
$method = 'POST';

$template = '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "' . $prompt . '"}]}';

// Set up cURL options
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $template);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($template),
    'Authorization: Bearer ' . $apiKey
));

// Execute the cURL session
$result = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
}

// Close the cURL session
curl_close($ch);

// Handle the response
if ($result) {
    $response = json_decode($result, true);
    $content = $response['choices'][0]['message']['content']; //[0]['message']['content'];
    
    echo $content; 
 
    //var_dump($response);
} else {
    echo 'Failed to send the POST request.';
}

// echo $response;

?>  