<?php
require 'php/db.php';

$name = $_POST['customer_name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';
$note = $_POST['note'] ?? '';
$total = $_POST['total'] ?? 0;

$stmt = $pdo->prepare("
    INSERT INTO orders (customer_name, phone, email, address, note, total)
    VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    $name,
    $phone,
    $email,
    $address,
    $note,
    $total
]);

$order_id = $pdo->lastInsertId();

$products = $_POST['products'] ?? [];

foreach ($products as $product) {
    $stmt = $pdo->prepare("
        INSERT INTO order_items (order_id, product_name, quantity, price)
        VALUES (?, ?, ?, ?)
    ");

    $stmt->execute([
        $order_id,
        $product['name'],
        $product['qty'],
        $product['price']
    ]);
}

echo "Поръчката е записана успешно!";
?>