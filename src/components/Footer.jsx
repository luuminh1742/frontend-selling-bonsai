import React from 'react'
import { Container } from 'reactstrap'


function Footer() {
    return (
        <footer className='border-top pt-4 pb-4'>
            
            <Container className='d-flex justify-content-between'>
                <div>© 2021 By Lưu Bá Minh</div>
                <div>
                    <a href='https://www.facebook.com/minhlb1742/' target='_blank' style={{ ...styleSocialItem }}>
                        <i class="fab fa-facebook display-6"></i>
                    </a>
                    <a style={{ ...styleSocialItem }} >
                        <i class="fab fa-twitter display-6"></i>
                    </a>
                    <a style={{ ...styleSocialItem }}>
                        <i class="fab fa-google-plus-g display-6"></i>
                    </a>
                </div>
            </Container>
            
        </footer>
    )
}


const styleSocialItem = {
    margin: '0 10px'
}

export default Footer
