import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import styles from './adminHomePage.module.css'

const AdminHomePage = () => {
    return (
        <div className={`${styles["home-container"]}`}>

            <ProfileHeader user_type={"admin"} />
            <AdminNavbar page='home'/>
            
            Home
        </div>
    );
};

export default AdminHomePage;