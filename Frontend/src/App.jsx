import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const API = 'http://localhost:3000/products';

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch All Products 
  
 const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(API);
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  // ✅ useEffect mein sirf call karo
  useEffect(() => {
    fetchProducts();
  }, []);
  // fill form when edit button is clicked
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    
  }
  // Update product
  const handleUpdate = async () => {
    if(!name || !price) return alert('Please enter product name and price');

    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price: Number(price) })
    });
    setName('');
    setPrice('');
    setEditId(null);
    fetchProducts();
  };
  
  
  // Add products
  const handleAdd = async () => {
    if(!name || !price) return alert('Please enter product name and price');

    await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price:Number(price) })
    })
    setName('');
    setPrice('');
    fetchProducts();
  }

  // delete product
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });
    fetchProducts();
  }
  
  return (
    <>
      <h1 className='name'>Product <span className='manager'>Manager</span></h1>
      <div className="total">

        <div className="totalProducts">
          <div className="count">{products.length}</div>
          <div className="pro">Total Products</div>
        </div>

        <div className="totalPrice">
          <div className="count">{products.reduce((total, product) => total + product.price, 0)}</div>
          <div className="pro">Total Price</div>
        </div>

      </div>

      <div className="inputs">
        <input type="text" placeholder='Product Name' className='input' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='Enter product price' className='input' value={price} onChange={(e) => setPrice(e.target.value)} />
        {(editId ? <button className='add' onClick={handleUpdate}>Update Product</button> : <button className='add' onClick={handleAdd}>Add Product</button>)}
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
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(product)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
          
          {products.length === 0 && !loading && (
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