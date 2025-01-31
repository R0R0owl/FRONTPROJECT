<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // API に関連するルートを指定
    'allowed_methods' => ['*'], // 許可するHTTPメソッド
    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:5174',
    ],// フロントエンドのオリジンを指定
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // 許可するヘッダー
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // 必ず true に設定
];
