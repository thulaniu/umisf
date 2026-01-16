import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './AdminMessages.module.css';
import { useState, useEffect } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Select, Space, Button, message, Row, Col } from 'antd';

import Axios from 'axios';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    Axios.get(
      process.env.REACT_APP_API_URL + "/feedbacks/getAllNotViewed",
      {
        headers: {},
      }
    ).then((res)=>{
      setMessages(res.data.data)
    })
    .catch ((error) =>{
      message.error(error.response.data.message);
    })
    
  });

  const handleApprove = async (id) => {
    console.log("approved")
    try {
      const result = await Axios.put(
        process.env.REACT_APP_API_URL + `/feedbacks/update`,
        {
          field: '_id',
          value: id,
          data: { hasViewed: true},
        },
        {
          headers: {},
        }
      );
      if (!result?.data?.data) {
        console.log('Empty');
      }
    } catch (error) {
      message.error(error.response?.data?.message);
    }
  };

  return (
    <div className={`${styles['tournament-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="messages" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/messages">Messages</a>
      </div>

      <div className={`${styles['folder-container']}`}>
        {messages?.length === 0 ? (
          <div style={{ fontFamily: 'Hind', fontSize: '18px', textAlign: 'center' }}> No feedbacks yet ...</div>
        ) : (
          <div>
            <div className={`${styles['table-headers']}`}>
              <div className={`${styles['table-header']}`} style={{ width: '14%' }}>
                ID
              </div>
              <div className={`${styles['table-header']}`}>Name</div>
              <div className={`${styles['table-header']}`}>Email</div>
              <div className={`${styles['table-header']}`}>Date</div>
              <div className={`${styles['table-header']}`} style={{ width: 'fit-content', minWidth:"30%" }}>Feedback</div>
              <div className={`${styles['table-header']}`} style={{ width: '3%' }}>
                {}
              </div>
            </div>
            <div>
              {messages?.map((message, index) => (
                <div className={`${styles['table-body']}`}>
                  <div className={`${styles['table-row']}`} style={{ width: '14%' }}>
                    {message._id}
                  </div>
                  <div className={`${styles['table-row']}`}>
                    {message.firstName + " " + message.lastName}
                  </div>
                  <div className={`${styles['table-row']}`}>{message.email}</div>
                  <div className={`${styles['table-row']}`}>{message.sentDate}</div>
                  <div className={`${styles['table-row']}`} style={{ width: 'fit-content', minWidth:"30%" }}>{message.message}</div>
                  <div className={`${styles['table-header']}`} style={{ width: '3%' }}>
                    <Row gutter={36}>
                      <Col span={1}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" className={`${styles['action']}`} onClick={(e) => handleApprove(message._id)} name={index} />
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
