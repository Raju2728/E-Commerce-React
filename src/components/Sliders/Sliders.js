import Carousel from 'react-bootstrap/Carousel';
import slide from '../../Assets/slider1_2.jpg';
import './slide.css'

function Sliders() {
  return (
    <Carousel className='slider' interval={5000} fade>
      <Carousel.Item>
        <img 
        text="First slide" 
        src={slide}
        alt='First slide'
        className='slider-image'
        />
      </Carousel.Item>
      <Carousel.Item>
      <img 
        text="First slide" 
        src={slide}
        alt='First slide'
        className='slider-image'
        />
      </Carousel.Item>
      <Carousel.Item>
      <img 
        text="First slide" 
        src={slide}
        alt='First slide'
        className='slider-image'
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Sliders;