import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import './style/Slides.css'

function Slides(props) {
    const data = props.data;
    return (
        <div>
            <Slide easing="ease">
                {
                    data.map(item => {
                        return (
                            <div className="each-slide">
                                <div style={{ 'backgroundImage': `url(${item.url})` }}>
                                    <span>Slide</span>
                                </div>
                            </div>
                        )
                    })
                }
            </Slide>
        </div>
    )
}

export default Slides
