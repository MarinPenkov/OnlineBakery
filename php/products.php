<?php
require 'db.php';
$category = $_GET['category'] ?? null;

if ($category) {
    $stmt = $pdo->prepare('SELECT p.* FROM products p JOIN categories c ON p.category_id = c.id WHERE c.slug = ?');
    $stmt->execute([$category]);
} else {
    $stmt = $pdo->query('SELECT * FROM products');
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);
?>
