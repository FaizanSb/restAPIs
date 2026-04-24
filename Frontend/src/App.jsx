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

      
      <table className="list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='products'>
          {Array.from({ length: count }, (_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>Product {i + 1}</td>
              <td>{(i + 1) * 10}</td>
              <td>
                <button className='edit'>Edit</button>
                <button className='delete'>Delete</button>
              </td>
            </tr>
          ))}
          
          {count === 0 && (
            <tr>
              <td colSpan="4" className="no-products">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default App