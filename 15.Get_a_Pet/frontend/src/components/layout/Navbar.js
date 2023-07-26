import { Link } from 'react-router-dom'
import React, { useContext } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <>
                    <li>
                        <Link to="/pet/myadoptions">Minhas Adoções</Link>
                    </li>
                    <li>
                        <Link to="/pet/mypets">Meus Pets</Link>
                    </li>
                    <li>
                        <Link to="/user/profile">Meu Perfil</Link>
                    </li>
                    <li>Sair</li>
                </>
            </ul>
        </nav>
    )
}

export default Navbar