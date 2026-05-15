CREATE DATABASE IF NOT EXISTS sladkarnica CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sladkarnica;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  description TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  weight VARCHAR(40),
  rating DECIMAL(2,1) DEFAULT 4.8,
  emoji VARCHAR(10),
  bestseller TINYINT(1) DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  address VARCHAR(255) NOT NULL,
  note TEXT,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categories (slug, name, icon, description) VALUES
('torti', 'Стандартни торти', '🎂', 'Класически и домашни торти за рожден ден, юбилей и семеен празник.'),
('detski', 'Детски торти', '🧸', 'Цветни предложения за детски рожден ден и тематични партита.'),
('sladkishi', 'Сладкиши', '🍰', 'Индивидуални десерти: еклери, кремове, чийзкейк и плодови изкушения.'),
('parti', 'Парти предложения', '🎁', 'Комплекти от мини десерти, подходящи за гости, офис и училищни събития.'),
('kekscheta', 'Къпкейкове', '🧁', 'Красиви мъфини и къпкейкове с различни кремове и декорации.');

INSERT INTO products (category_id, name, description, price, weight, rating, emoji, bestseller) VALUES
(1, 'Торта „Шоколадова еуфория“', 'Плътни какаови блатове, шоколадов мус и крокан.', 42.00, '8 парчета', 4.9, '🍫', 1),
(1, 'Френска селска торта', 'Медени блатове, млечен крем и орехи.', 39.50, '8 парчета', 4.8, '🍯', 1),
(1, 'Червено кадифе', 'Кадифени блатове с нежен крем от сирене.', 45.00, '10 парчета', 4.9, '❤️', 1),
(1, 'Морковена торта', 'Сочна торта с моркови, канела и крем.', 36.90, '8 парчета', 4.7, '🥕', 0),
(2, 'Торта „Принцеса“', 'Детска торта с розова декорация и ванилов крем.', 58.00, '12 парчета', 4.9, '👑', 1),
(2, 'Торта „Джунгла“', 'Весела торта с животинчета и шоколадов пълнеж.', 62.00, '12 парчета', 4.8, '🦁', 0),
(3, 'Милфьой', 'Хрупкави кори и лек ванилов крем.', 5.70, '1 бр.', 4.7, '🥐', 1),
(3, 'Еклер с ванилов крем', 'Класически еклер с глазура и пухкав крем.', 3.80, '1 бр.', 4.8, '🍮', 1),
(3, 'Чийзкейк с боровинки', 'Кремообразен чийзкейк с боровинков топинг.', 6.80, '1 парче', 4.9, '🫐', 1),
(4, 'Парти сет „Мини сладости“', '24 мини десерта: еклери, тарталети и къпкейкове.', 49.90, '24 бр.', 4.9, '🎉', 1),
(4, 'Кутия меденки', 'Ръчно декорирани меденки за празник.', 18.50, '12 бр.', 4.6, '🍪', 0),
(5, 'Ванилов къпкейк', 'Ванилов къпкейк с маслен крем.', 4.20, '1 бр.', 4.6, '🧁', 0),
(5, 'Шоколадов мъфин', 'Мек мъфин с шоколадови парченца.', 3.90, '1 бр.', 4.7, '🍩', 1);
