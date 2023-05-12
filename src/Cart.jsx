function Cart(props) {
    const { cartItems } = props;
  
    const cartItemsArray = Object.values(cartItems);
    console.log(cartItemsArray);

    let totalExpense = 0;

    return (
        <div>
        <h2>Items in your shopping cart</h2>
        {cartItemsArray.map((item, index) => {
            Object.keys(item).forEach((key) => {
            const { price, amount } = item[key];
            totalExpense += price * amount;
            });
            return (
            <div>
                <div class="cart-header">
                    <p>Item</p>
                    <p>Price</p>
                    <p>Amount</p>
                </div>
                <div className="cart">
                    {Object.keys(item).map((key) => (
                    <div className="cart-item" key={key}>
                        <p>{item[key].name}</p>
                        <p><span className="price">{item[key].price}</span></p>
                        <p>{item[key].amount}</p>
                    </div>
                    ))}
                </div>
            </div>
            );
        })}
        <p>Total Price: {totalExpense.toFixed(2)}</p>
        </div>
      );
  }
  
  export default Cart;
  