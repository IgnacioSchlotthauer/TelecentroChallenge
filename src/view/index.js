import React from 'react'
import Footer from '../components/Navs/footer'
import Header from '../components/Navs/header'
import ServerList from '../components/serverList'
import './styles.css'

const Application = () => {
    return (
        <div className="app-container">
            <Header/>
                <main>
                    <div>
                        <ServerList/>
                    </div>
                </main>
            <Footer/>
        </div>
    )
}

export default Application;
