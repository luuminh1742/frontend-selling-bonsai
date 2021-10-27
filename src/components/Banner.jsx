import React from 'react'
import { Jumbotron } from 'reactstrap'
import './style/Banner.css'
function Banner(props) {
    return (
        <Jumbotron className='text-center banner'>
            <h3>{props.name}</h3>
            <ul>
                <li>
                    <p>Home</p>
                </li>
                {' / '}
                <li>
                    <p>{props.name}</p>
                </li>
            </ul>
        </Jumbotron>
    )
}



export default Banner

