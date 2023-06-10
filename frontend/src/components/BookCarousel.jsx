import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const BookCarousel = ({bestBooks}) => {
   
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
          {bestBooks.map((element) => (
            <div className="bookElement" key={element.id}>
              <div className="bookPictures">
                <div>
                <img src={element.cover} alt={element.title} className="bookPic" />
                <div> 
                <div className="bookTitles">   <strong>{element.title}</strong> </div>
              
              
                 <div className="bookPrices">${element.price}</div>
              </div>
              </div>
              
                <div className="bookDescriptions">{element.description}</div>
              </div>
              </div>
             
        
          ))}
        </Slider>
      );
    };
    
    export default BookCarousel;