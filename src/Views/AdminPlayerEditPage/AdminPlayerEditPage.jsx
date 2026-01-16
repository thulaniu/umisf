import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Form, Input } from 'reactstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminPlayerEditPage.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { message } from 'antd';
import defualtUser from '../../assests/images/default-user.png';

const AdminPlayerEditPage = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [playerDetails, setPlayerDetails] = useState(location.state.playerDetails);

  const email = location.state.playerDetails.email;
  const gender = ['Male','Female'];

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
      const result = await Axios.delete(process.env.REACT_APP_API_URL + '/player/removeByField/Id/' + playerDetails._id, {
        headers: {},
      });
      //setIsSubmitting(false)
      console.log(result);

      message.success('Deleted successfully !! ');

      navigate('/admin/players');
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const editPlayer = async (e) => {
    e.preventDefault();
    console.log('Form submitted', playerDetails);
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (!Object.values(playerDetails).includes('')) {
        console.log(playerDetails)
      try {

        const result = await Axios.put(
          process.env.REACT_APP_API_URL + '/player/update',
          {
            field: 'Id',
            value: playerDetails._id,
            data: {playerDetails},
          },
          {
            headers: {},
          }
        );
        setIsSubmitting(false);
        console.log(result);
        message.success('Player updated successfully !! ');
        setPlayerDetails(result.data.data);
        navigate('/admin/players/' + playerDetails.firstName+' '+playerDetails.lastName, { state: { playerDetails:playerDetails } });
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    }
  };

  const selectGender = (e, gender) => {
    e.preventDefault();
    console.log(gender)
    
      setPlayerDetails((prevValue) => {
        return {
          ...prevValue,
          gender:  gender,
        };
      });
    
  };

  return (
    <div className={`${styles['account-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="user_accounts" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/players">Player Accounts</a>
        <img src={require('../../assests/images/forward_arrow.png')} alt="" />{' '}
        <Link to={'/admin/players/' + playerDetails.firstName + '+' + playerDetails.lastName} style={{ fontSize: '18px' }} state={{ playerDetails: playerDetails}}>
          {playerDetails.firstName+" "+playerDetails.lastName}
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
        <Form onSubmit={editPlayer} noValidate validated={validated}>
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>First name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={playerDetails.firstName}
                placeholder="Enter your first name.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, firstName: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Last name</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={playerDetails.lastName}
                placeholder="Enter your last name.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, lastName: e.target.value })}
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
                value={playerDetails.email}
                placeholder="Enter your email.."
                onChange={(e) =>setPlayerDetails({ ...playerDetails, email: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Gender</div>
            <div className={`${styles['profile-field-value']}`}>
              <div className={`${styles['multiple-dropdown']}`} onClick={(e) => setIsDropdownExpanded(!isDropdownExpanded)}>
                {playerDetails.gender.length === 0 ? 'Select the gender..' : playerDetails.gender}
                <img src={require('../../assests/images/down_arrow.png')} alt="" />
              </div>

              {isDropdownExpanded && (
                <div className={`${styles['drop-down-items']}`}>
                  {gender.map((gender, index) => (
                    <div
                      className={`${styles['drop-down-item']}`}
                      style={{
                        background: playerDetails.gender.includes(gender) ? '#ececf2' : 'transparent',
                      }}
                      key={index}
                      onClick={(e) =>selectGender(e, gender)}
                    >
                      {gender}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Institute</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={playerDetails.institute}
                placeholder="Enter your institute.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, institute: e.target.value })}
                required
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
                value={playerDetails.contactNumber}
                placeholder="Enter your contact number.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, contactNumber: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Date of Birth</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="date"
                className={`${styles['form-input']}`}
                value={playerDetails.dob}
                placeholder="Enter your birthday.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, dob: e.target.value })}
                required
              />
            </div>
          </div>
          <hr />
          <div className={`${styles['profile-field-container']}`}>
            <div className={`${styles['profile-field-name']}`}>Performance threshold</div>
            <div className={`${styles['profile-field-value']}`}>
              <input
                type="text"
                className={`${styles['form-input']}`}
                value={playerDetails.performanceThreshold}
                placeholder="Enter performance threshould.."
                onChange={(e) => setPlayerDetails({ ...playerDetails, performanceThreshold: e.target.value })}
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

export default AdminPlayerEditPage;
