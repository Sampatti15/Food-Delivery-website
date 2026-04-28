export const cuisineChips = [
  { id: 'all', label: 'All' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'indian', label: 'Indian' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'dessert', label: 'Dessert' },
]

const m = (id, name, desc, price) => ({ id, name, desc, price })

export const restaurants = [
  {
    id: 'rb-slice',
    name: 'Royal Slice',
    cuisine: 'pizza',
    image: '/images/pizza.jpg',
    etaMin: 25,
    rating: 4.6,
    priceLevel: 2,
    tags: ['Thin crust', 'Fast delivery'],
    menu: [
      m('m1', 'Margherita', 'Fresh basil, mozzarella, classic sauce', 199),
      m('m2', 'Spicy Paneer', 'Paneer, jalapeños, chilli oil drizzle', 249),
      m('m3', 'Pepper Burst', 'Capsicum, olives, roasted pepper sauce', 239),
      m('m4', 'Garlic Bread', 'Buttery garlic loaf with herbs', 129),
    ],
  },
  {
    id: 'bb-stack',
    name: 'Burger Barn',
    cuisine: 'burgers',
    image: '/images/burger.jpg',
    etaMin: 30,
    rating: 4.4,
    priceLevel: 2,
    tags: ['Grilled', 'Combo deals'],
    menu: [
      m('m1', 'Classic Veg Stack', 'Crispy patty, lettuce, signature sauce', 179),
      m('m2', 'Smoky BBQ Burger', 'BBQ glaze, onion, cheddar-style slice', 219),
      m('m3', 'Peri Peri Fries', 'Spiced fries with peri peri dust', 119),
      m('m4', 'Cold Coffee', 'Creamy, strong, lightly sweet', 109),
    ],
  },
  {
    id: 'sp-masala',
    name: 'Spice Masala',
    cuisine: 'indian',
    image: '/images/indian.jpg',
    etaMin: 35,
    rating: 4.7,
    priceLevel: 2,
    tags: ['North Indian', 'Family packs'],
    menu: [
      m('m1', 'Butter Paneer', 'Creamy tomato gravy with soft paneer', 269),
      m('m2', 'Dal Tadka', 'Tempered lentils with ghee & spices', 189),
      m('m3', 'Jeera Rice', 'Basmati rice with cumin', 129),
      m('m4', 'Tandoori Roti', 'Charred, soft, wheat roti', 25),
    ],
  },
  {
    id: 'gf-bowl',
    name: 'GreenFork Bowls',
    cuisine: 'healthy',
    image: '/images/healthy.jpg',
    etaMin: 20,
    rating: 4.5,
    priceLevel: 3,
    tags: ['High protein', 'Fresh'],
    menu: [
      m('m1', 'Power Bowl', 'Quinoa, chickpeas, veggies, tahini', 289),
      m('m2', 'Paneer Salad', 'Grilled paneer, greens, lemon dressing', 259),
      m('m3', 'Smoothie', 'Banana, oats, peanut butter, cocoa', 199),
      m('m4', 'Soup of the Day', 'Seasonal veggies, slow simmered', 149),
    ],
  },
  {
    id: 'ds-sugar',
    name: 'Dessert Studio',
    cuisine: 'dessert',
    image: '/images/dessert.jpg',
    etaMin: 18,
    rating: 4.3,
    priceLevel: 2,
    tags: ['Bakes', 'Chilled'],
    menu: [
      m('m1', 'Choco Lava', 'Warm cake with molten center', 149),
      m('m2', 'Cheesecake Cup', 'Creamy cheesecake in a cup', 169),
      m('m3', 'Brownie', 'Fudgy brownie with nuts', 129),
      m('m4', 'Vanilla Scoop', 'Classic vanilla ice cream', 79),
    ],
  },
]

