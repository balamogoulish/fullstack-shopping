import { useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from "../../utils/axios"
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
 
const DetailProductPage = () => {
  const {productId} = useParams(); //경로에 포함된 productId를 가져올 수 있음
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct(){
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId])
  
  if(!product) return null;

  return (
    <div className='w-full p-4'>
      <div className='text-center'>
        <h1 className='p-4 text-2xl'>{product.title}</h1>
      </div>

      <div className='flex gap-4'>
        <div className='w-1/2'>
          {/** productImage */}
          <ProductImage product={product} />
        </div>
        <div className='w-1/2'>
          {/** productInfo */}
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}

export default DetailProductPage