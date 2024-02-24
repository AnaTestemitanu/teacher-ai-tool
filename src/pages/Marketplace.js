import React from 'react';
import '../styles/Marketplace.css'
import Sidebar from '../components/Sidebar';
import Image1 from '../assets/market.png';
import Image2 from '../assets/market1.png';
import Image3 from '../assets/market2.png';
import Image4 from '../assets/market3.png';
import Image5 from '../assets/market4.png';
import Image6 from '../assets/market5.png';


const marketitem = [
    {
        image: Image1,
        name: 'Big Data',
        price: '£150'
    },
    {
      image: Image2,
      name: 'Data Science',
      price: '£130'
    },
    {
      image: Image3,
      name: 'Ecology',
      price: '£100'
    },
    {
      image: Image4,
      name: 'Science and Tech',
      price: '£180'
    },
    {
      image: Image5,
      name: 'Science and Tech Blockchain',
      price: '£100'
    },
    {
      image: Image6,
      name: 'Technology',
      price: '£1300'
    }
];

const Marketplace = () => {
    return (
      <div className='classes-container'>
          <Sidebar />
          <div className="market--list">
              <div className='market--header'>
                  <h2>Marketplace</h2>
              </div>
  
              <div className='market--container'>
                  {marketitem.map((marketitem) => (
                      <div className='list'>
                          <div className='market--detail'>
                              <img src={marketitem.image} alt={marketitem.name} />
                              <h2>{marketitem.name}</h2>
                              <span>Price: {marketitem.price}</span>
                              <button className="purchase-btn">Buy Presentation</button>
                          </div>
                      </div>
                  ))}
              </div>
        </div>
      </div>
    );
  };

export default Marketplace;