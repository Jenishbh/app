
const categories = [
  { id: 1, name: 'Indian', image: require('../../assets/food_cat/masala-dosa.png') },
  { id: 2, name: 'Burger', image: require('../../assets/food_cat/burger.png') },
  { id: 3, name: 'Pizza', image: require('../../assets/food_cat/pizza.png') },
  { id: 4, name: 'Salad', image: require('../../assets/food_cat/salad.png') },

];
const icons = [
  { name: 'Bread', image: require('../../assets/food_icons/Bread.jpg') },
  { name: 'Chicken', image: require('../../assets/food_icons/Chicken.jpg') },
  { name: 'Oil', image: require('../../assets/food_icons/Cooking_Oil.jpg') },
  { name: 'Egg', image: require('../../assets/food_icons/Egg.jpg') },
  { name: 'Flour', image: require('../../assets/food_icons/Flour.jpg') },
  { name: 'Garlic', image: require('../../assets/food_icons/Garlic.jpg') },
  { name: 'Okra', image: require('../../assets/food_icons/Okra.jpg') },
  { name: 'Pizza', image: require('../../assets/food_icons/Pizza.jpg') },
  { name: 'Potato', image: require('../../assets/food_icons/Potato.jpg') },
  { name: 'Seasoning', image: require('../../assets/food_icons/Seasoning.jpg') },
  { name: 'Spice', image: require('../../assets/food_icons/Spice.jpg') },
  { name: 'Lemon', image: require('../../assets/food_icons/lemon.jpg') },
  { name: 'Panner', image: require('../../assets/food_icons/Panner.jpg') },
];
const foods = [
  {
    id: 1,
    name: 'Butter Chicken',
    ingredients: 'Chicken,Lemon Juice or Vinegar,Ginger and Garlic Paste,Spices',
    price: '8.30',
    categoryid: 1,
    image: require('../../assets/food/butter-chicken-curry.jpg'),
    details: 'Chicken is marinated in yogurt, spices, garlic and ginger, then later cooked in a tandoor, but it can also be pan fried, grilled or oven roasted. After that it is tossed with the simmered, richly seasoned tomato sauce.',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    ingredients: 'Flour,Pepperoni,Mozzarella Cheese',
    price: '7.10',
    categoryid: 3,
    image: require('../../assets/food/pepperoni-pizza.jpg'),
    details: "Pepperoni pizza is an American pizza variety which includes one of the country's most beloved toppings. Pepperoni is actually a corrupted form of peperoni (one “p”), which denotes a large pepper in Italian, but nowadays it denotes a spicy salami, usually made with a mixture of beef, pork, and spices.",
  },
  {
    id: 3,
    name: 'Chicken Burger',
    ingredients: 'Chicken Meat,Seasoning,Binders,Herbs and Spices',
    price: '5.10',
    categoryid: 2,
    image: require('../../assets/food/chickenBurger.png'),
    details: "A chicken burger is a popular and versatile sandwich that features a patty made from ground or minced chicken meat, typically seasoned and cooked to perfection. ",
  },
  {
    id: 4,
    name: 'Garlic Naan',
    ingredients: 'Naan Bread,Garlic',
    price: '9.55',
    categoryid: 1,
    image: require('../../assets/food/garlic-naan.jpg'),
    details: "Garlic naan is a popular variation of traditional naan bread, which is a type of flatbread that originates from South Asia, particularly India. "
  },
  {
    id: 5,
    name: 'Malai Kofta',
    ingredients: 'Paneer,Potatoes,Vegetables,Spices,Chickpea Flour',
    price: '9.55',
    categoryid: 1,
    image: require('../../assets/food/malai-kofta.jpg'),
    details: "Malai kofta is a popular North Indian dish known for its rich and creamy flavors. It is a vegetarian dish made with deep-fried vegetable or paneer (Indian cottage cheese) dumplings served in a flavorful tomato-based gravy. ",
  },
  {
    id: 6,
    name: 'Samosa',
    ingredients: 'Flour,Oil,Potatoes,Spices,Ginger and Garlic',
    price: '9.55',
    categoryid: 1,
    image: require('../../assets/food/entrees.jpg'),
    details: "A samosa is a fried or baked pastry with a savory filling, including ingredients such as spiced potatoes, onions, and peas. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.",
  },

  {
    id: 7,
    name: "Vegetable Biryani",
    ingredients: "Rice, vegetables, spices",
    price: "11.99",
    categoryid: 1,
    image: require('../../assets/food/Vegetable-Biryani.jpg'),
    details: "A delicious and flavorful rice dish made with vegetables, spices, and herbs."
  },
  {
    id: 8,
    name: "Tandoori Chicken",
    ingredients: "Chicken, yogurt, spices",
    price: "12.99",
    categoryid: 1,
    image: require('../../assets/food/Tandoori-Chicken.jpg'),
    details: "Chicken marinated in yogurt and spices, then grilled in a tandoor oven."
  },
  {
    id: 9,
    name: "Paneer Tikka Masala",
    ingredients: "Indian cheese, tomatoes, cream, spices",
    price: "13.99",
    categoryid: 1,
    image: require('../../assets/food/Paneer-Tikka-Masala.jpg'),
    details: "Indian cheese marinated in spices, then grilled and cooked in a creamy tomato sauce."
  },
  {
    id: 10,
    name: "Chicken Tikka Masala",
    ingredients: "Chicken, tomatoes, cream, spices",
    price: "14.99",
    categoryid: 1,
    image: require('../../assets/food/Chicken-Tikka-Masala.webp'),
    details: "Chicken marinated in spices, then grilled and cooked in a creamy tomato sauce."
  },
  {
    id: 11,
    name: "Samosas",
    ingredients: "Potatoes, onions, peas, spices",
    price: "5.99",
    categoryid: 1,
    image: require('../../assets/food/entrees.jpg'),
    details: "Fried or baked pastries filled with a savory mixture of potatoes, onions, peas, and spices."
  },
  {
    id: 12,
    name: "Naan Bread",
    ingredients: "Flour, water, yeast, yogurt, milk, butter",
    price: "4.99",
    categoryid: 1,
    image: require('../../assets/food/naan.png'),
    details: "Naan bread is a popular type of flatbread that originated in South Asia, particularly in India. "
  },
  {
    id: 13,
    name: "Chicken Burger",
    ingredients: "Chicken patty, bun, lettuce, tomato, onion, mayonnaise",
    price: "6.99",
    categoryid: 2,
    image: require('../../assets/food/chickenBurger.png'),
    details: "A classic burger made with a chicken patty, bun, lettuce, tomato, onion, and mayonnaise."
  },
  {
    id: 14,
    name: "Beef Burger",
    ingredients: "Beef patty, bun, lettuce, tomato, onion, mayonnaise, ketchup",
    price: "7.99",
    categoryid: 2,
    image: require('../../assets/food/Burger.jpg'),
    details: "A classic burger made with a beef patty, bun, lettuce, tomato, onion, mayonnaise, and ketchup."
  },
  {
    id: 15,
    name: 'Cheese Burger',
    ingredients: 'Beef, Cheese, Lettuce',
    price: '6.90',
    categoryid: 2,
    image: require('../../assets/food/cheese-burger.jpg'),
    details: "A classic cheeseburger with a juicy beef patty topped with cheddar cheese, fresh lettuce, and a savory sauce. Served with a soft, toasted bun.",
  },
  {
    id: 16,
    name: 'Margarita Pizza',
    ingredients: 'Tomato, Mozzarella, Basil,Olive Oil',
    price: '6.50',
    categoryid: 3,
    image: require('../../assets/food/margherita-pizza.jpg'),
    details: "The classic Margherita pizza topped with fresh tomatoes, mozzarella cheese, and basil. A timeless favorite for pizza lovers.",
  },
  {
    id: 17,
    name: 'Caesar Salad',
    ingredients: 'Romaine, Croutons, Caesar dressing',
    price: '5.60',
    categoryid: 4,
    image: require('../../assets/food/Caesar-Salad.jpg'),
    details: "A fresh Caesar salad with crisp romaine lettuce, golden croutons, and creamy Caesar dressing. Topped with parmesan shavings.",
  },

  {
    id: 18,
    name: 'Veggie Pizza',
    ingredients: 'Bell Peppers, Olives, Onions',
    price: '6.80',
    categoryid: 3,
    image: require('../../assets/food/vegetarian-pizza.jpg'),
    details: "A delightful vegetarian pizza topped with a mix of colorful bell peppers, sliced black olives, and red onions.",
  },
  {
    id: 19,
    name: 'Greek Salad',
    ingredients: 'Olives, Feta, Tomatoes',
    price: '5.75',
    categoryid: 4,
    image: require('../../assets/food/Greek-Salad.jpg'),
    details: "A refreshing salad made with ripe tomatoes, cucumbers, red onions, black olives, and feta cheese. Dressed with olive oil and oregano.",
  },

  {
    id: 20,
    name: 'Bhindi Dopiaza',
    ingredients: 'Okra,Spices,Salt',
    price: '8.30',
    categories: 'Indian',
    image: require('../../assets/food/bhindi.jpg'),
    details: "Bhindi Dopiaza is a flavorful Indian dish that features okra (bhindi) cooked with a generous amount of onions, spices, and a rich tomato-based gravy.",
  },

  {
    id: 21,
    name: 'Egg Curry',
    ingredients: 'Boiled Eggs,Onions,Tomatoes,Spices,Ginger and Garlic Paste',
    price: '10.55',
    categories: 'Indian',
    image: require('../../assets/food/EggCurry.jpg'),
    details: "Egg curry is a popular and flavorful Indian dish made with boiled eggs in a spiced tomato-based gravy.",
  },


];






export { foods, categories };