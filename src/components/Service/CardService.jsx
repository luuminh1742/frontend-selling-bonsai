import React from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col } from 'reactstrap'

function CardService(props) {
    return (
        <Col lg={4} className='mt-3'>
            <Card
                style={{
                    borderRadius: 10,
                    padding: 0,
                    // boxShadow: '1px 1px 1px 5px #AAA',
                    boxShadow:'#d8d8d8 0px 0px 10px 2px'
                }}
            >
                <CardBody className='p-0'>
                    <img src={props.img} alt='img'
                        style={{
                            width: '-webkit-fill-available',
                            height: 250,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                    />

                    <CardTitle tag="h5" className='mt-3 p-3 text-center' style={{height:80}}>
                        {props.title}
                    </CardTitle>

                </CardBody>
            </Card>
        </Col>
    )
}

export default CardService
