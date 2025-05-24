// products.js
const products = async () => {
    try {
      const response = await fetch('https://sql-backend-production-6b3b.up.railway.app/get-all-products/ebay_headphones', {
        method: 'GET',
        mode: 'cors'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  export default products;
  