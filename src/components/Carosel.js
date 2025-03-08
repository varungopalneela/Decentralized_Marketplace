import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function Carosel() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (

    
    <div className="card" style={{ width: "18rem", margin: "15px", maxHeight: "400px", height: "200px", backgroundColor: "lightgrey" }}>
      <Carousel responsive={responsive}>
      <div className="card-body">
        <h5 className="card-title">hii</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button type='submit' className='btn btn-success'>View Menu</button>
      </div>
      </Carousel>
    </div>
 
  )
}

export default Carosel