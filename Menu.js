const menuItems = [
    {
        id: 0,
        name: 'chocolate cake',
        image: '/cake.jpg',
        description: 'Decadent chocolate cake, made with rich cocoa',
        price: '10.99'
    },
    {
        id: 1,
        name: 'crepe',
        image: '/crepe.jpg',
        description: 'Delicious crepe filled with your choice of toppings',
        price: '5.99'
    },
    {
        id: 2,
        name: 'cupcake',
        image: '/cupcake.jpg',
        description: 'Moist cupcake with buttercream frosting on top',
        price: '2.99'
    },
    {
        id: 3,
        name: 'muffin',
        image: '/muffin.jpg',
        description: 'Freshly baked muffin with your choice of flavor',
        price: '3.49'
    },
    {
        id: 4,
        name: 'tart',
        image: '/tart.jpg',
        description: 'Flaky tart filled with fresh fruit and custard',
        price: '4.99'
    },
    {
        id: 5,
        name: 'sundae',
        image: '/sundae.jpg',
        description: 'Ice cream sundae with your choice of toppings',
        price: '6.99'
    }
]

function createCartItem(id){
    const item = menuItems[id];
    return {
        name: item.name,
        price: item.price,
        amount: 0
      };
}

module.exports = {
    menuItems,
    createCartItem
}
