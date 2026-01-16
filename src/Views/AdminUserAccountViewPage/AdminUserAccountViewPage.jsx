import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminUserAccountViewPage.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { message } from 'antd';
import defualtUser from '../../assests/images/default-user.png';


const AdminUserAccountViewPage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state;

  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading('Submitting form...');
    }
  }, [isSubmitting]);



  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    setShow(false);
    setIsSubmitting(true);
    try {
      const result = await Axios.delete(process.env.REACT_APP_API_URL + '/user/removeByField/email/' + userDetails.email, {
        headers: {},
      });
      setIsSubmitting(false);
      console.log(result);
      message.success('Deleted successfully !! ');
      navigate('/admin/user-accounts');
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className={`${styles['account-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="user_accounts" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/user-accounts">User Accounts</a>
        <img src={require('../../assests/images/forward_arrow.png')} alt="" /> {userDetails.name}
      </div>
      <div className={`${styles['tool-bar']}`}>
        <Link to={'../user-accounts/edit/' + userDetails.email} state={{ userDetails: userDetails }}>
          <img src={require('../../assests/images/edit.png')} alt="" /> Edit Account
        </Link>

        <button onClick={handleShow}>
          <img src={require('../../assests/images/delete.png')} alt="" /> Delete Account
        </button>
      </div>
      <div className={`${styles['profile-container']}`}>
        <img src={defualtUser} alt="" srcSet="" />
        <div className={`${styles['profile-type']}`}></div>
        <hr />
        <div className={`${styles['profile-field-container']}`}>
          <div className={`${styles['profile-field-name']}`}>Name</div>
          <div className={`${styles['profile-field-value']}`}>{userDetails.name}</div>
        </div>
        <hr />

        <div className={`${styles['profile-field-container']}`}>
          <div className={`${styles['profile-field-name']}`}>Email</div>
          <div className={`${styles['profile-field-value']}`}>{userDetails.email}</div>
        </div>
        <hr />
        <div className={`${styles['profile-field-container']}`}>
          <div className={`${styles['profile-field-name']}`}>User Roles</div>
          <div className={`${styles['profile-field-value']}`}>{userDetails.role.join(' , ')}</div>
        </div>
        <hr />

        <div className={`${styles['profile-field-container']}`}>
          <div className={`${styles['profile-field-name']}`}>Password</div>
          <div className={`${styles['profile-field-value']}`}>*************</div>
        </div>
        <hr />
        <div className={`${styles['profile-field-container']}`}>
          <div className={`${styles['profile-field-name']}`}>Contact Number</div>
          <div className={`${styles['profile-field-value']}`}>{userDetails.contactNumber}</div>
        </div>
        <hr />
      </div>
      {/* modal for deleting */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Title style={{ fontFamily: 'Hind', fontSize: '18px' }}>Delete User Account</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: 'Hind', fontSize: '18px' }}>Are you sure you want to delete this user account? </h5>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleClose} className="btn btn-secondary" style={{ fontFamily: 'Hind', fontSize: '18px' }}>
              Close
            </button>
            <button type="submit" className="btn btn-light" onClick={deleteUser} style={{ fontFamily: 'Hind', fontSize: '18px', background: 'red', color: 'white' }}>
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUserAccountViewPage;
