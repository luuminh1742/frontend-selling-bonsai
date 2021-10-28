import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Col, Container, Row } from 'reactstrap'
import Orders from '../Orders/Orders';
import ProfileItem from '../ProfileItem';
import '../style/Profile.css'



const LeftSidebarProfile = ({ activeMenuLeft, handleActiveMenu }) => {

    return (
        <>
            <div className='profile-menu'>
                <ul>
                    <li
                        className={activeMenuLeft === 1 && 'profile-menu-active'}
                        onClick={() => handleActiveMenu(1)}
                    >
                        <i class="fas fa-id-badge">  Profile</i>
                    </li>
                    <li
                        className={activeMenuLeft === 2 && 'profile-menu-active'}
                        onClick={() => handleActiveMenu(2)}
                    >
                        <i class="fas fa-shopping-cart">  Orders</i>
                    </li>
                    <li
                        className={activeMenuLeft === 3 && 'profile-menu-active'}
                        onClick={() => handleActiveMenu(3)}
                    >
                        <i class="far fa-bell">  Notify</i>
                    </li>
                    <li
                        className={activeMenuLeft === 4 && 'profile-menu-active'}
                        onClick={() => handleActiveMenu(4)}
                    >
                        <i class="fas fa-sign-out-alt">  Log out</i>
                    </li>
                </ul>
            </div>
        </>
    );
}



function Profile() {

    const user = useSelector(state=>state.user)

    const [activeMenuLeft, setActiveMenuLeft] = useState(1);

    const handleActiveMenu = n => {
        setActiveMenuLeft(n);
    }

    const switchContent = () => {
        return (
            activeMenuLeft === 1 ? <ProfileItem /> :
                activeMenuLeft === 2 ? <Orders /> : ''
        )

    }

    useEffect(() => {
        document.title ='Profile | X-BONSAI'
    }, [])

    return (
        <div className='pt-5 pb-5 mb-5 mt-5'>
            {
                user.Id === null && <Redirect to='/login'/>
            }
            <Container>
                <Row>
                    <Col md={3}>
                        <LeftSidebarProfile
                            activeMenuLeft={activeMenuLeft}
                            handleActiveMenu={handleActiveMenu}
                        />
                    </Col>
                    <Col md={9}>
                        {switchContent()}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile
