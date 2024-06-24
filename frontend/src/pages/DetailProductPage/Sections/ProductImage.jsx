import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery'

const ProductImage = ({product}) => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    if(product?.images.length > 0) {
      let images = [];

      product.images.map(imageName => {
        return images.push({
          original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`
        })
      })
      setImages(images);
    }
  
  }, [product])
  
  return (
    <ImageGallery items={images} />
  )
}

ProductImage.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductImage