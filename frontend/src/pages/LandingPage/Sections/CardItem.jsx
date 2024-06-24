import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageSlider from '../../../components/ImageSlider';

const CardItem = ({product}) => {
  return (
    <div className='border-[1px] border-gray-300'>
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className='p-1'>{product.title}</p>
        <p className='p-1'>{product.continents}</p>
        <p className='p-1 text-xs text-gray-500'>{product.price}원</p>
      </Link>
    </div>
  )
}

CardItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CardItem