import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

const Detail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Mengambil id produk dari URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Gagal mengambil detail produk');
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil detail produk:', error);
      }
    };

    fetchProduct();
  }, [id]); // Efek berjalan ulang jika id berubah

  if (!product) {
    return <div>Loading...</div>; // Tampilkan loading jika data produk belum tersedia
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Detail Produk</h2>
        <br />
        <div className="product-detail">
          <p><strong>Nama Produk:</strong> {product.name}</p>
          <p><strong>Harga:</strong> RP. {product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Status:</strong> {product.status ? 'Aktif' : 'Tidak Aktif'}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
