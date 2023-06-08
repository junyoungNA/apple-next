// import Image from "next/image";
// import FoodImage from '/public/food1.png';

//Next에서 제공하는 Image태그로 최적화가능 
//src경로는 import를 통해지경로 지정해야함

import foods from "../cart/data"
export default function Fresh () {
    // const fruits = ['Tomatos', 'Pasta', 'Coconut'];
    return (
      <div>
        <h4 className='title'>상품목록</h4>
        {foods?.map((fruit, i) => 
          <div className="food" key={i}>
            <img src={`/food${i + 1}.png`}/>
          <h4>{fruit}</h4>
        </div>
        )}
        
      </div>
    )
  }
  