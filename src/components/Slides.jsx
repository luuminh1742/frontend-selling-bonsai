import React from 'react'
import SimpleImageSlider from "react-simple-image-slider"

const images = [
    {
        url: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider3.jpg'
    },
    {
        url: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider2.jpg'
    },
    {
        url: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider1.jpg'
    }
]


function Slides() {

    return (
        <div>
            <SimpleImageSlider
                width={'100%'}
                height={600}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
    )
}

export default Slides
