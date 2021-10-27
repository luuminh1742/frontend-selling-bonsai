import React from 'react'
import { Route, Switch } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Home from '../components/pages/Home'
import '../assets/style/Client.css'
import Shop from '../components/pages/Shop'
import Blog from '../components/pages/Blog'
import Contact from '../components/pages/Contact'
import Banner from '../components/Banner'
import Login from '../components/pages/Login'
import Profile from '../components/pages/Profile'
import Cart from '../components/pages/Cart'
import Checkout from '../components/pages/Checkout'
import ProductDetail from '../components/pages/ProductDetail'

export const Client = () => {
    return (
        <div className=''>
            <div className='Header border'>
                <Header />
            </div>

            <Switch>
                <Route path="/shop" >
                    <Banner name='Shop' />
                    <Shop />
                </Route>
                <Route path="/product-detail/:id" component={ProductDetail}/>
                <Route path="/blog" >
                    <Banner name='Blog' />
                    <Blog />
                </Route>
                <Route path="/contact-us" >
                    <Banner name='Contact' />
                    <Contact />
                </Route>
                <Route path="/profile" >
                    <Banner name='Profile' />
                    <Profile />
                </Route>
                <Route path="/cart" >
                    <Banner name='Cart' />
                    <Cart />
                </Route>
                <Route path="/checkout" >
                    <Banner name='Checkout' />
                    <Checkout />
                </Route>
                <Route path="/login" >
                    <Banner name='My Account' />
                    <Login />
                </Route>
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </div>
    )
}

