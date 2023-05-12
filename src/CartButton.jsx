function CartButton({ viewCart }) {
    return (
      <button type="submit" className="button-two" onClick={viewCart}>View My Cart</button>
    );
}
  
export default CartButton;