import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import PropTypes from 'prop-types';

const ImageSlider = ({images}) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
        {images.map((image, index)=>(
            <div key={image+index}>
                <img 
                    className='w-full max-h-[150px]'
                    src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                    alt={image}
                />
            </div>
        ))}
    </Carousel>
  )
}

ImageSlider.propTypes = {
    images: PropTypes.array.isRequired,
};

export default ImageSlider