import React from 'react'
import './assets/style/Styles.css'
import Sidebar from './components/Sidebar'
import Content from './containers/Content'

function Index() {

    
    return (
        <div className='__wrapper d-flex'>
            <Sidebar />
            <Content />
        </div>
    )
}

export default Index
