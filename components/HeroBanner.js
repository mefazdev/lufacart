import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import  Carousel  from 'react-bootstrap/Carousel';
import poster1 from '../assets/images/poster-1.jpg'
import poster2 from '../assets/images/poster-2.jpg'
import poster3 from '../assets/images/poster-3.jpg'
import Image from 'next/image';
export default function HeroBanner() {
  return (
    
         <Carousel 
         interval={2000}
        //  activeIndex={true}

         className='mt-3' id='main__carousel' fade controls={false} indicators={false}>
      <Carousel.Item >
        <Image id='main__carousel__img' src={poster1}/>
 
      </Carousel.Item>
      <Carousel.Item>
         <Image src={poster2} id='main__carousel__img'/>  
 
      </Carousel.Item>
      <Carousel.Item>
         <Image id='main__carousel__img' src={poster3} />

         
      </Carousel.Item>
    </Carousel>
    
  )
}

