// import { age } from "./data"
import foods from "./data"
export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      {foods?.map((food,i) =>
      <CartItem food={food} key={i}/> )}
      
    </div>
  )
} 


function CartItem({food}) {
  return (
    <div className="cart-item">
      <p>{food}</p>
      <p>$40</p>
      <p>1개</p>
      </div>
  )
}