import React, { useState, useEffect } from 'react';
import { Form, Input } from 'reactstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminPlayersAddPage.module.css';
import ImageUploader from '../RegistrationPage/Common/imageUploader/ImageUploader';
import Axios from 'axios';
import { message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import defualtUser from '../../assests/images/default-user.png'
import Dropdown from "../../common/Dropdown/Dropdown";
import { MDBContainer, MDBInput, MDBBtn, MDBCol } from "mdb-react-ui-kit";
const AdminPlayersAddPage = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    contactNumber: "",
    email: "",
    institute:"",
    postalAddress: "",
    performanceThreshold:"",
    photo:"sample_photo.jpg",
  });

  const genderOptions = ["Male", "Female"];
  const [gender, setGender] = useState("");
  const [fileList, setFileList] = useState([]);
  const changeGender = (value) => {
    setUserDetails((prevValue) => {
      return { ...prevValue, gender: value };
    });
  };
  const [validated, setValidated] = useState(false); //form validation
  const [isSubmitting, setIsSubmitting] = useState(false);

  

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
        process.env.REACT_APP_API_URL + '/player/add',
        { playerData: [userDetails] },
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

  
  return (
    <div className={`${styles['account-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="players" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/players">Player Accounts</a>
      </div>
      <div className={`${styles['tool-bar']}`}>Add new player</div>
      <div className={`${styles['profile-container']}`}>
        <Form onSubmit={addUser} noValidate validated={validated}>
          <div className={`${styles['profile-image']}`}>
            {' '}
            <img src={defualtUser} alt='default user'/>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>First Name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.firstName}
                placeholder="Enter the   first name.."
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Last Name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.lastName}
                placeholder="Enter the   last name.."
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
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
            <div className={`${styles['profile-field-name']}`}>Gender</div>
            <div className={`${styles['profile-field-value']}`}>
              <MDBCol className="" lg="12" md="12" sm="12">
                        <Dropdown
                          options={genderOptions}
                          handleClick={(option) => {
                            setGender(option);
                            changeGender(option);
                          }}
                          value={gender}
                          lable={"Gender"}
                        />
                      </MDBCol>
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>institute</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.institute}
                placeholder="Enter the user institute"
                onChange={(e) => setUserDetails({ ...userDetails, institute: e.target.value })}
              />
            </div>
          </div>
          <hr />
         
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>date of birth</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="date"
                className={`${styles['form-input']}`}
                value={userDetails.DOB}
                placeholder="enter date of birth"
                onChange={(e) => setUserDetails({ ...userDetails, DOB: e.target.value })}
              />
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
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Performace threshould</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.performanceThreshold}
                placeholder="Enter the user performance threshould.."
                onChange={(e) => setUserDetails({ ...userDetails, performanceThreshold: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>postal address</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={userDetails.postalAddress}
                placeholder="enter postal address"
                onChange={(e) => setUserDetails({ ...userDetails, postalAddress: e.target.value })}
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>photo</div>
            <div className={`${styles['profile-field-value']}`}>
              
              <ImageUploader fileList={fileList} setFileList={setFileList} />
            </div>
          </div>
          <hr />
          <button className={`${styles['form-submit-button']}`} >Add User</button>
        </Form>
      </div>
    </div>
  );
};

export default AdminPlayersAddPage;
