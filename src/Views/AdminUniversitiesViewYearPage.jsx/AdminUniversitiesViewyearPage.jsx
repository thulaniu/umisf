import React, { Component, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminUniversitiesViewYearPage.module.css';
import Axios from 'axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';

const AdminUniversitiesViewYearPage = () => {
  let year = 2023;

  const [universities, setUniversities] = useState([]);

  const [universityToBeUnregistered, setUniversityToBeUnregistered] = useState([]);

  const loadPlayers = (university) => {
    console.log(document.querySelector('#' + university).style.display)
    if (document.querySelector('#' + university).style.display === 'none') {
      document.querySelector('#' + university).style.display = 'block';
      document.querySelector('#arrow' + university).style.transform = 'rotate(90deg)';
    } else {
      document.querySelector('#' + university).style.display = 'none';
      document.querySelector('#arrow' + university).style.transform = 'rotate(-360deg)';
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const unregisterUniversity = (e) => {
    e.preventDefault();
    console.log(universityToBeUnregistered);
    setShow(false);
  };

  useEffect(() => {
    universities.map((university,index) => (document.querySelector('#' + university.name.split(' ').join('')+index).style.display = 'none'));

    Axios.get(process.env.REACT_APP_API_URL + '/university/getAll', {
      headers: {},
    })
      .then((res) => {
        console.log(res);
        setUniversities(res.data.data);
      })
      .catch((error) => {
        console.log('Error loading users', error);
        message.error(error.response.data.message);
      });
  }, []);

  return (
    <div className={`${styles['gallery-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="universities" />
      <div className={`${styles['main-title']}`}>
        <a href="/admin/universities">Universities</a>
        <img src={require('../../assests/images/forward_arrow.png')} alt="" />
      </div>
      {/* <div className={`${styles['tool-bar']}`}>
        <button onClick={handleShow}>
          <img src={require('../../assests/images/delete.png')} alt="" /> Unregister
        </button>
      </div> */}

      <div className={`${styles['users-container']}`}>
        {universities?.map((university, index) => (
          <div className={`${styles['user']}`}>
            <button className={`${styles['user-type-container']}`} onClick={() => loadPlayers(university.name.split(' ').join('')+index)}>
              <img
                src={require('../../assests/images/forward_arrow.png')}
                alt=""
                style={{ width: '15px' }}
                className={`${styles['user-type-arrow']}`}
                id={'arrow' + university.name.split(' ').join('') + index}
              />
              <img src={require('../../assests/images/players.png')} alt="" className={`${styles['user-type-img']}`} />
              {university.name + ' - ' + university.matchType}
            </button>
            <div id={university.name.split(' ').join('')+ index} className={`${styles['users-name-container']}`}>
              <div className={`${styles['add-players']}`}>
                <Link to={`/admin/universities/${year}/${university.name}`} state={{ university: university }}>
                  <img src={require('../../assests/images/edit.png')} alt="" /> View University Registration Details
                </Link>
                <a href={`/admin/universities/${year}/${university.name}/register-player`}>
                  <img src={require('../../assests/images/edit.png')} alt="" /> Add new player
                </a>
              </div>
              {university.players.map((player, index) => (
                <a href={`/admin/universities/player/${player}`} className={`${styles['users-name']}`}>
                  {player}
                  <img src={require('../../assests/images/double_arrows.png')} alt="" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* modal for deleting */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Title style={{ fontFamily: 'Hind', fontSize: '18px' }}>Unregister a University</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: 'Hind', fontSize: '18px' }}>Select the university that you want to unregister.</h5>
                <select style={{ fontFamily: 'Hind', fontSize: '18px' }} className="form-select form-select-sm" onChange={(e) => setUniversityToBeUnregistered(e.target.value)}>
                  {universities.map((university) => (
                    <option style={{ fontFamily: 'Hind', fontSize: '18px' }} value={university.name}>
                      {university.name}
                    </option>
                  ))}
                </select>
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
              onClick={unregisterUniversity}
              style={{
                fontFamily: 'Hind',
                fontSize: '18px',
                background: 'red',
                color: 'white',
              }}
            >
              Unregister
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUniversitiesViewYearPage;
