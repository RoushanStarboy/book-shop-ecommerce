import React, { useEffect, useState } from 'react';
import './Preloader.css'; // Ensure the path is correct

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="preloader-overlay">
      <div className="bookshelf_wrapper">
        <ul className="books_list">
          <li className="book_item first"></li>
          <li className="book_item second"></li>
          <li className="book_item third"></li>
          <li className="book_item fourth"></li>
          <li className="book_item fifth"></li>
          <li className="book_item sixth"></li>
        </ul>
        <div className="shelf"></div>
      </div>
    </div>
  );
};

export default Preloader;
