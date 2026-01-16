import React, { useState, useEffect } from 'react';
import { Form, Input } from 'reactstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminUserAccountAddPage.module.css';
import ImageUploader from '../RegistrationPage/Common/imageUploader/ImageUploader';
import Axios from 'axios';
import { message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import defualtUser from '../../assests/images/default-user.png'
const AdminUserAccountAddPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: 'UMiSF@1999-08-11',
    role: [],
    contactNumber: '',
  });

  const userRoles = ['admin', 'umpire', 'tableOrganizer', 'organizer'];
  const [selectedUserRoles, setSelectedUserRoles] = useState([]);

  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const [profileImage, setProfileImage] = useState([]);

  const [validated, setValidated] = useState(false); //form validation
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading('Submitting form...');
    }
  }, [isSubmitting]);

  const addUser = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    setIsSubmitting(true);
    try {
      const result = await Axios.post(
        process.env.REACT_APP_API_URL + '/user/add',
        { userData: [userDetails] },
        {
          headers: {},
        }
      );
      setIsSubmitting(false);
      console.log(result);
      message.success('User added successfully !! ');
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
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
      </div>
      <div className={`${styles['tool-bar']}`}>Add new user account</div>
      <div className={`${styles['profile-container']}`}>
        <Form onSubmit={addUser} noValidate validated={validated}>
          <div className={`${styles['profile-image']}`}>
            {' '}
            <img src={defualtUser} alt='default user'/>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.name}
                placeholder="Enter the  username.."
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
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
                placeholder="Enter the email.."
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
            <div className={`${styles['profile-field-name']}`}>Password</div>
            <div className={`${styles['profile-field-value']}`}>
              default password:
              <input type="password" style={{ marginBottom: '10px' }} className={`${styles['form-input']}`} value={userDetails.password} disabled  hidden={!passwordVisible}/>
              <input type="text" style={{ marginBottom: '10px' }} className={`${styles['form-input']}`} value={userDetails.password} disabled hidden={passwordVisible} />
              <EyeOutlined className={`${styles['pwd-visible']}`} hidden={!passwordVisible} onClick={()=>setPasswordVisible(false)}/>
              <EyeInvisibleOutlined className={`${styles['pwd-visible']}`} hidden={passwordVisible} onClick={()=>setPasswordVisible(true)}/>
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
                placeholder="Enter the user contact number.."
                onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <button className={`${styles['form-submit-button']}`}>Add User</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminUserAccountAddPage;
