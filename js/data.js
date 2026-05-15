const categories = [
  { id: 'torti', name: 'Стандартни торти', icon: '🎂', description: 'Класически и домашни торти за рожден ден, юбилей и семеен празник.' },
  { id: 'detski', name: 'Детски торти', icon: '🧸', description: 'Цветни предложения за детски рожден ден и тематични партита.' },
  { id: 'sladkishi', name: 'Сладкиши', icon: '🍰', description: 'Индивидуални десерти: еклери, кремове, чийзкейк и плодови изкушения.' },
  { id: 'parti', name: 'Парти предложения', icon: '🎁', description: 'Комплекти от мини десерти, подходящи за гости, офис и училищни събития.' },
  { id: 'kekscheta', name: 'Къпкейкове', icon: '🧁', description: 'Красиви мъфини и къпкейкове с различни кремове и декорации.' }
];

const products = [
  { id: 1, category: 'torti', name: 'Торта „Шоколадова еуфория“', price: 42.00, bestseller: true, emoji: '🍫', description: 'Плътни какаови блатове, шоколадов мус и крокан.', weight: '8 парчета', rating: 4.9 },
  { id: 2, category: 'torti', name: 'Френска селска торта', price: 39.50, bestseller: true, emoji: '🍯', description: 'Медени блатове, млечен крем и орехи.', weight: '8 парчета', rating: 4.8 },
  { id: 3, category: 'torti', name: 'Червено кадифе', price: 45.00, bestseller: true, emoji: '❤️', description: 'Кадифени блатове с нежен крем от сирене.', weight: '10 парчета', rating: 4.9 },
  { id: 4, category: 'torti', name: 'Морковена торта', price: 36.90, bestseller: false, emoji: '🥕', description: 'Сочна торта с моркови, канела и крем.', weight: '8 парчета', rating: 4.7 },
  { id: 5, category: 'detski', name: 'Торта „Принцеса“', price: 58.00, bestseller: true, emoji: '👑', description: 'Детска торта с розова декорация и ванилов крем.', weight: '12 парчета', rating: 4.9 },
  { id: 6, category: 'detski', name: 'Торта „Джунгла“', price: 62.00, bestseller: false, emoji: '🦁', description: 'Весела торта с животинчета и шоколадов пълнеж.', weight: '12 парчета', rating: 4.8 },
  { id: 7, category: 'sladkishi', name: 'Милфьой', price: 5.70, bestseller: true, emoji: '🥐', description: 'Хрупкави кори и лек ванилов крем.', weight: '1 бр.', rating: 4.7 },
  { id: 8, category: 'sladkishi', name: 'Еклер с ванилов крем', price: 3.80, bestseller: true, emoji: '🍮', description: 'Класически еклер с глазура и пухкав крем.', weight: '1 бр.', rating: 4.8 },
  { id: 9, category: 'sladkishi', name: 'Чийзкейк с боровинки', price: 6.80, bestseller: true, emoji: '🫐', description: 'Кремообразен чийзкейк с боровинков топинг.', weight: '1 парче', rating: 4.9 },
  { id: 10, category: 'parti', name: 'Парти сет „Мини сладости“', price: 49.90, bestseller: true, emoji: '🎉', description: '24 мини десерта: еклери, тарталети и къпкейкове.', weight: '24 бр.', rating: 4.9 },
  { id: 11, category: 'parti', name: 'Кутия меденки', price: 18.50, bestseller: false, emoji: '🍪', description: 'Ръчно декорирани меденки за празник.', weight: '12 бр.', rating: 4.6 },
  { id: 12, category: 'kekscheta', name: 'Ванилов къпкейк', price: 4.20, bestseller: false, emoji: '🧁', description: 'Ванилов къпкейк с маслен крем.', weight: '1 бр.', rating: 4.6 },
  { id: 13, category: 'kekscheta', name: 'Шоколадов мъфин', price: 3.90, bestseller: true, emoji: '🍩', description: 'Мек мъфин с шоколадови парченца.', weight: '1 бр.', rating: 4.7 }
];
