import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State untuk menyimpan kata kunci pencarian

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Gagal mengambil data produk', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
      const data = await response.json();
      console.log(data.message);
      // Perbarui tampilan setelah produk dihapus
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Gagal menghapus produk', error);
    }
  };

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Memfilter produk berdasarkan kata kunci pencarian
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) // Mencocokkan nama produk dengan kata kunci
  );

  
  const formatNumber = (number) => {
    return number.toLocaleString('id-ID');
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input 
          type="text" 
          placeholder="Masukan kata kunci..."
          value={searchQuery} // Menyinkronkan input dengan state
          onChange={handleSearchChange} // Menangani perubahan input
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td className="text-right">Rp{formatNumber(product.price)}</td>
              <td className="text-right">{formatNumber(product.stock)}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
