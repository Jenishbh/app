
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
      categoryid: 1,
      image: require('../../assets/food/butter-chicken-curry.jpg'),
      details: 'Chicken is marinated in yogurt, spices, garlic and ginger, then later cooked in a tandoor, but it can also be pan fried, grilled or oven roasted. After that it is tossed with the simmered, richly seasoned tomato sauce.',
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      ingredients: 'Pepperoni Pizza',
      price: '7.10',
      categoryid: 3,
      image: require('../../assets/food/pepperoni-pizza.jpg'),
      details: "Pepperoni pizza is an American pizza variety which includes one of the country's most beloved toppings. Pepperoni is actually a corrupted form of peperoni (one “p”), which denotes a large pepper in Italian, but nowadays it denotes a spicy salami, usually made with a mixture of beef, pork, and spices.",
    },
    {
      id: 3,
      name: 'Chicken Burger',
      ingredients: 'Fried Chicken',
      price: '5.10',
      categoryid: 2,
      image: require('../../assets/food/chickenBurger.png'),
      details: "A chicken sandwich is a sandwich that typically consists of boneless, skinless chicken breast or thigh served between slices of bread, on a bun, or on a roll. Variations on the chicken sandwich include the chicken burger, chicken on a bun, chickwich, hot chicken, or chicken salad sandwich.",
    },
    {
      id: 4,
      name: 'Garlic Naan',
      ingredients: 'Indian Bread',
      price: '9.55',
      categoryid: 1,
      image: require('../../assets/food/garlic-naan.jpg'),
    },
    {
      id: 5,
      name: 'Malai Kofta',
      ingredients: 'Indian Veg.Curry',
      price: '9.55',
      categoryid: 1,
      image: require('../../assets/food/malai-kofta.jpg'),
      details: "Naan is a leavened, oven-baked flatbread native to India. It resembles pita bread but unlike pita, it has yogurt, milk, sometimes eggs or butter which makes it softer than the pita bread. Our bakers shape it into a ball and slap it on the walls of our tandoor (clay oven).",
    },
    {
      id: 6,
      name: 'Samosa',
      ingredients: 'Starter',
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
        "id": 8,
        "name": "Tandoori Chicken",
        "ingredients": "Chicken, yogurt, spices",
        "price": "12.99",
        "categoryid": 1,
        "image": require('../../assets/food/Tandoori-Chicken.jpg'),
        "details": "Chicken marinated in yogurt and spices, then grilled in a tandoor oven."
      },
      {
        "id": 9,
        "name": "Paneer Tikka Masala",
        "ingredients": "Indian cheese, tomatoes, cream, spices",
        "price": "13.99",
        "categoryid": 1,
        "image": require('../../assets/food/Paneer-Tikka-Masala.jpg'),
        "details": "Indian cheese marinated in spices, then grilled and cooked in a creamy tomato sauce."
      },
      {
        "id": 10,
        "name": "Chicken Tikka Masala",
        "ingredients": "Chicken, tomatoes, cream, spices",
        "price": "14.99",
        "categoryid": 1,
        "image": require('../../assets/food/Chicken-Tikka-Masala.webp'),
        "details": "Chicken marinated in spices, then grilled and cooked in a creamy tomato sauce."
      },
      {
        "id": 11,
        "name": "Samosas",
        "ingredients": "Potatoes, onions, peas, spices",
        "price": "5.99",
        "categoryid": 1,
        "image": require('../../assets/food/entrees.jpg'),
        "details": "Fried or baked pastries filled with a savory mixture of potatoes, onions, peas, and spices."
      },
      {
        "id": 12,
        "name": "Naan Bread",
        "ingredients": "Flour, water, yeast, yogurt, milk, butter",
        "price": "4.99",
        "categoryid": 1,
        "image": require('../../assets/food/naan.png'),
        "details": "Soft and chewy leavened flatbread cooked in a tandoor oven."
      },
      {
        "id": 13,
        "name": "Chicken Burger",
        "ingredients": "Chicken patty, bun, lettuce, tomato, onion, mayonnaise",
        "price": "6.99",
        "categoryid": 2,
        "image": require('../../assets/food/chickenBurger.png'),
        "details": "A classic burger made with a chicken patty, bun, lettuce, tomato, onion, and mayonnaise."
      },
      {
        "id": 14,
        "name": "Beef Burger",
        "ingredients": "Beef patty, bun, lettuce, tomato, onion, mayonnaise, ketchup",
        "price": "7.99",
        "categoryid": 2,
        "image": require('../../assets/food/Burger.jpg'),
        "details": "A classic burger made with a beef patty, bun, lettuce, tomato, onion, mayonnaise, and ketchup."
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
        ingredients: 'Tomato, Mozzarella, Basil',
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
      }
      
        
    
  ];





  
  export {foods,categories};