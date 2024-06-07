<?php

namespace App;

use stdClass;
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class JWT
{
    /**
     * @var string Firebase Secret Key
     */
    private $secretKey;

    /**
     * Token Expires Time
     */
    private const EXPIRES_TIME = 3600;

    public function __construct($secretKey)
    {
        $this->secretKey = $secretKey;
    }

    /**
     * Generate JWT Token
     *
     * @param array $data
     * @return string Token
     */
    public function generateToken(array $data)
    {
        $now = time();
        $payload = [
            'iat' => $now,
            'iss' => 'http://example.com',
            'nbf' => $now,
            'exp' => $now + self::EXPIRES_TIME,
            'data' => $data,
        ];

        return FirebaseJWT::encode($payload, $this->secretKey, 'HS256');
    }

    /**
     * Validate JWT Token
     * @param string $token
     * @return stdClass Token Data
     */
    public function validateToken($token)
    {
        try {
            return FirebaseJWT::decode($token, new Key($this->secretKey, 'HS256'))->data;
        } catch (\Exception $ex) {
            return new stdClass();
        }
    }
}
