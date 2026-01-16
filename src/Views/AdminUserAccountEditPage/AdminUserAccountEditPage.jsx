import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminUserAccountEditPage.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { message } from 'antd';
import defualtUser from '../../assests/images/default-user.png';

const AdminUserAccountEditPage = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(location.state.userDetails);

  const email = location.state.userDetails.email;
  const userRoles = ['admin', 'umpire', 'tableOrganizer', 'organizer'];

  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false); //form validation
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
    //setIsSubmitting(true);
    try {
      const result = await Axios.delete(process.env.REACT_APP_API_URL + '/user/removeByField/email/' + userDetails.email, {
        headers: {},
      });
      //setIsSubmitting(false)
      console.log(result);

      message.success('Deleted successfully !! ');

      navigate('/admin/user-accounts');
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    console.log('Form submitted', userDetails);
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (!Object.values(userDetails).includes('')) {
      try {
        const result = await Axios.put(
          process.env.REACT_APP_API_URL + '/user/update',
          {
            field: 'email',
            value: email,
            data: { name: userDetails.name, email: userDetails.email, role: userDetails.role, contactNumber: userDetails.contactNumber },
          },
          {
            headers: {},
          }
        );
        setIsSubmitting(false);
        console.log(result);
        message.success('User updated successfully !! ');
        setUserDetails(result.data.data);
        navigate('/admin/user-accounts/' + userDetails.email, { state: { userDetails: userDetails } });
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    }
  };

  const selectRole = (e, userRole) => {
    e.preventDefault();
    if (userDetails.role.includes(userRole)) {
      setUserDetails((prevValue) => {
        return {
          ...prevValue,
          role: userDetails.role.filter((role) => {
            return role != userRole;
          }),
        };
      });
    } else {
      setUserDetails((prevValue) => {
        return {
          ...prevValue,
          role: [...userDetails.role, userRole],
        };
      });
    }
  };

  return (
    <div className={`${styles['account-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="user_accounts" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/user-accounts">User Accounts</a>
        <img src={require('../../assests/images/forward_arrow.png')} alt="" />{' '}
        <Link to={'/admin/user-accounts/' + userDetails.email} style={{ fontSize: '18px' }} state={{ userDetails: userDetails }}>
          {userDetails.name}
        </Link>
      </div>
      <div className={`${styles['tool-bar']}`}>
        <button onClick={handleShow}>
          <img src={require('../../assests/images/delete.png')} alt="" /> Delete Account
        </button>
      </div>
      <div className={`${styles['profile-container']}`}>
        <img src={defualtUser} alt="" srcSet="" />
        <div className={`${styles['profile-type']}`}></div>
        <hr />
        <Form onSubmit={editUser} noValidate validated={validated}>
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.name}
                placeholder="Enter your name.."
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />

          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Email</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="email"
                className={`${styles['form-input']}`}
                value={userDetails.email}
                placeholder="Enter your email.."
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>User Roles</div>
            <div className={`${styles['profile-field-value']}`}>
              <div className={`${styles['multiple-dropdown']}`} onClick={(e) => setIsDropdownExpanded(!isDropdownExpanded)}>
                {userDetails.role.length === 0 ? 'Select the user roles..' : userDetails.role.join(',')}
                <img src={require('../../assests/images/down_arrow.png')} alt="" />
              </div>

              {isDropdownExpanded && (
                <div className={`${styles['drop-down-items']}`}>
                  {userRoles.map((role, index) => (
                    <div
                      className={`${styles['drop-down-item']}`}
                      style={{
                        background: userDetails.role.includes(role) ? '#ececf2' : 'transparent',
                      }}
                      key={index}
                      onClick={(e) => selectRole(e, role)}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <hr />

          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Contact Number</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.contactNumber}
                placeholder="Enter your contact number.."
                onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <button className={`${styles['form-submit-button']}`} type="submit">
            Update
          </button>
        </Form>
      </div>
      {/* modal for adding img */}
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
            <button
              type="submit"
              className="btn btn-light"
              onClick={deleteUser}
              style={{
                fontFamily: 'Hind',
                fontSize: '18px',
                background: 'red',
                color: 'white',
              }}
            >
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUserAccountEditPage;
