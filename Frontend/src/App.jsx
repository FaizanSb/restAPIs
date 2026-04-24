import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='name'>Product <span className='manager'>Manager</span></h1>
      <div className="total">

        <div className="totalProducts">
          <div className="count">{count}</div>
          <div className="pro">Total Products</div>
        </div>

        <div className="totalPrice">
          <div className="count">{count * 10}</div>
          <div className="pro">Total Price</div>
        </div>

      </div>

      <div className="inputs">
        <input type="text" placeholder='Product Name' className='input' />
        <input type="text" placeholder='Enter product price' className='input' />
        <button className='add'>Add Product</button>
      </div>


      <div className="list">
        <div className="product">
          <div className="id">1</div>
          <div className="name">Product 1</div>
          <div className="price">Price: $10</div>
        </div>
        <div className="product">
          <div className="id">2</div>
          <div className="name">Product 2</div>
          <div className="price">Price: $20</div>
        </div>
        <div className="product">
          <div className="id">3</div>
          <div className="name">Product 3</div>
          <div className="price">Price: $30</div>
        </div>
      </div>
    </>
  )
}

export default App