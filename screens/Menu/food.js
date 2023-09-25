
const categories = [
  {id: 1, name: 'Indian', image: require('../../assets/food_cat/masala-dosa.png')},
  {id: 2, name: 'Burger', image: require('../../assets/food_cat/burger.png')},
  {id: 3, name: 'Pizza', image: require('../../assets/food_cat/pizza.png')},
  {id: 4, name: 'Salad', image: require('../../assets/food_cat/salad.png')},

];
const foods = [
    {
      id: 1,
      name: 'Butter Chicken',
      ingredients: 'Indian Curry',
      price: '8.30',
      categories: 'Indian',
      image: require('../../assets/food/butter-chicken-curry.jpg'),
      details: 'Chicken is marinated in yogurt, spices, garlic and ginger, then later cooked in a tandoor, but it can also be pan fried, grilled or oven roasted. After that it is tossed with the simmered, richly seasoned tomato sauce.',
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      ingredients: 'Pepperoni Pizza',
      price: '7.10',
      categories: 'Pizza',
      image: require('../../assets/food/pepperoni-pizza.jpg'),
      details: "Pepperoni pizza is an American pizza variety which includes one of the country's most beloved toppings. Pepperoni is actually a corrupted form of peperoni (one “p”), which denotes a large pepper in Italian, but nowadays it denotes a spicy salami, usually made with a mixture of beef, pork, and spices.",
    },
    {
      id: 3,
      name: 'Chicken Burger',
      ingredients: 'Fried Chicken',
      price: '5.10',
      categories: 'Burger',
      image: require('../../assets/food/chickenBurger.png'),
      details: "A chicken sandwich is a sandwich that typically consists of boneless, skinless chicken breast or thigh served between slices of bread, on a bun, or on a roll. Variations on the chicken sandwich include the chicken burger, chicken on a bun, chickwich, hot chicken, or chicken salad sandwich.",
    },
    {
      id: 4,
      name: 'Naan',
      ingredients: 'Indian Bread',
      price: '9.55',
      categories: 'Indian',
      image: require('../../assets/food/naan.png'),
    },
    {
      id: 5,
      name: 'Malai Kofta',
      ingredients: 'Indian Veg.Curry',
      price: '9.55',
      categories: 'Indian',
      image: require('../../assets/food/malai-kofta.jpg'),
      details: "Naan is a leavened, oven-baked flatbread native to India. It resembles pita bread but unlike pita, it has yogurt, milk, sometimes eggs or butter which makes it softer than the pita bread. Our bakers shape it into a ball and slap it on the walls of our tandoor (clay oven).",
    },
    {
      id: 6,
      name: 'Samosa',
      ingredients: 'Starter',
      price: '9.55',
      categories: 'Indian',
      image: require('../../assets/food/entrees.jpg'),
      details: "A samosa is a fried or baked pastry with a savory filling, including ingredients such as spiced potatoes, onions, and peas. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.",
    },
  ];





  
  export {foods,categories};