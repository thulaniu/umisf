import React, { Component, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminCompaniesViewYearPage.module.css';
import Axios from 'axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';
const AdminCompaniesViewYearPage = () => {
  let year = 2023;
  const [companies, setCompanies] = useState([]);

  const [companyToBeUnregistered, setCompanyToBeUnregistered] = useState([]);

  const loadPlayers = (company,index) => {
    company = company.includes('.') ? company.split('.').join('') : company.split(' ').join('') + index;
    if (document.querySelector('#' + company).style.display === 'none') {
      document.querySelector('#' + company).style.display = 'block';
      document.querySelector('#arrow' + company).style.transform = 'rotate(90deg)';
    } else {
      document.querySelector('#' + company).style.display = 'none';
      document.querySelector('#arrow' + company).style.transform = 'rotate(-360deg)';
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

  const unregisterCompany = (e) => {
    e.preventDefault();
    console.log(companyToBeUnregistered);
    setShow(false);
  };

  useEffect(() => {
    companies.map(
      (company,index) => (document.querySelector(company.name.includes('.') ? '#' + company.name.split('.').join('') + index : '#' + company.name.split(' ').join('') + index).style.display = 'none')
    );
    Axios.get(process.env.REACT_APP_API_URL + '/company/getAll', {
      headers: {},
    })
      .then((res) => {
        console.log(res);
        setCompanies(res.data.data);
      })
      .catch((error) => {
        console.log('Error loading users', error);
        message.error(error.response.data.message);
      });
  }, []);

  return (
    <div className={`${styles['gallery-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="companies" />
      <div className={`${styles['main-title']}`}>
        <a href="/admin/companies">Companies</a>
      </div>
      {/* <div className={`${styles['tool-bar']}`}>
        <button onClick={handleShow}>
          <img src={require('../../assests/images/delete.png')} alt="" /> Unregister
        </button>
      </div> */}

      <div className={`${styles['users-container']}`}>
        {companies.map((company, index) => (
          <div className={`${styles['user']}`}>
            <button className={`${styles['user-type-container']}`} onClick={() => loadPlayers(company.name, index)}>
              <img
                src={require('../../assests/images/forward_arrow.png')}
                alt=""
                style={{ width: '15px' }}
                className={`${styles['user-type-arrow']}`}
                id={company.name.includes('.') ? 'arrow' + company.name.split('.').join('')+index : 'arrow' + company.name.split(' ').join('')+index}
              />
              <img src={require('../../assests/images/players.png')} alt="" className={`${styles['user-type-img']}`} />
              {company.name + ' - ' + company.matchType}
            </button>
            <div id={company.name.includes('.') ? company.name.split('.').join('')+index : company.name.split(' ').join('')+index} className={`${styles['users-name-container']}`}>
              <div className={`${styles['add-players']}`}>
                <Link to={`/admin/companies/${year}/${company.name}`} state={{ company: company }}>
                  <img src={require('../../assests/images/edit.png')} alt="" /> View Company Registration Details
                </Link>
                <a href={`/admin/companies/${year}/${company.name}/register-player`}>
                  <img src={require('../../assests/images/edit.png')} alt="" /> Add new player
                </a>
              </div>
              {company.players.map((player, index) => (
                <a href={`/admin/companies/player/${player}`} className={`${styles['users-name']}`}>
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
          <Modal.Title style={{ fontFamily: 'Hind', fontSize: '18px' }}>Unregister a Company</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5 style={{ fontFamily: 'Hind', fontSize: '18px' }}>Select the company that you want to unregister.</h5>
                <select style={{ fontFamily: 'Hind', fontSize: '18px' }} className="form-select form-select-sm" onChange={(e) => setCompanyToBeUnregistered(e.target.value)}>
                  {companies.map((company) => (
                    <option style={{ fontFamily: 'Hind', fontSize: '18px' }} value={company.name}>
                      {company.name}
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
              onClick={unregisterCompany}
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

export default AdminCompaniesViewYearPage;
