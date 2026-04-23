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
    </>
  )
}

export default App
