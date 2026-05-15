<?php
$host = 'localhost';
$dbname = 'online_sladkarnica';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Грешка при връзка с базата данни: ' . $e->getMessage());
}
?>
