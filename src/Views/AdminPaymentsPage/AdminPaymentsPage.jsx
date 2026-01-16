import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminPaymentsPage.module.css';
import { useState, useEffect } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Select, Space, Button, message, Row, Col } from 'antd';

import Axios from 'axios';

const AdminPaymentsPage = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  const [filteredDetails, setFilteredDetails] = useState(paymentDetails);
  const user = 'Nethmi Jayakody';

  const matchTypes = ['Single', 'Double', 'University', 'Company'];
  const ageGroups = ['All', 'Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'Open', 'A Division', 'B Division'];
  const paymentStatus = ['All', 'Not Confirmed', 'Confirmed', 'Decline'];
  const paymentMethods = ['All', 'On-site', 'Bank Transfer'];
  const [filter, setFilter] = useState({
    matchType: '',
    ageGroup: '',
    paymentConfirmed: '',
    paymentMethod: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading('Loading data...');
    }
  }, [isSubmitting]);

  const handleMatchType = (value) => {
    setFilter((prev) => {
      return { ...prev, matchType: value };
    });
  };

  const handleAgeGroup = (value) => {
    setFilter((prev) => {
      return { ...prev, ageGroup: value };
    });
  };

  const handlePaymentStatus = (value) => {
    setFilter((prev) => {
      return { ...prev, paymentConfirmed: value };
    });
  };

  const handlePaymentMethod = (value) => {
    setFilter((prev) => {
      return { ...prev, paymentMethod: value };
    });
  };

  const searchPayments = async (e) => {
    e.preventDefault();
    console.log('Filter: ', filter);
    if (Object.values(filter).includes('')) {
      message.error('Not all the filters are set !!');
    } else {
      setIsSubmitting(true);
      console.log('Valid filter');
      let paymentFilter = {};
      filter.paymentMethod !== 'All' && (paymentFilter = { ...paymentFilter, paymentMethod: filter.paymentMethod });
      filter.paymentConfirmed != 2 && (paymentFilter = { ...paymentFilter, paymentConfirmed: filter.paymentConfirmed });
      if (filter.matchType === 'Single' || filter.matchType === 'Double') {
        filter.ageGroup !== 'All' && (paymentFilter = { ...paymentFilter, ageGroup: filter.ageGroup });
      }
      if (filter.matchType === 'Company') {
        filter.ageGroup !== 'All' && (paymentFilter = { ...paymentFilter, matchType: filter.ageGroup });
      }
      try {
        const result = await Axios.get(
          process.env.REACT_APP_API_URL + `/${filter.matchType.toLowerCase()}/getFilteredData`,
          { params: paymentFilter },
          {
            headers: {},
          }
        );
        console.log('Result', result);
        setIsSubmitting(false);
        if (result?.data?.data?.length !== 0) {
          setFilteredDetails(result?.data?.data);
        } else {
          console.log('Empty');
          setFilteredDetails([]);
        }
      } catch (error) {
        console.log(error);
        message.error(error.response?.data?.message);
      }
    }
  };

  //we have the index
  //get the object and update correspondingly
  //if the result status tallies with selected: keep it else remove it (We can slice from index and combine)

  const handleReject = async (index) => {
    let data = filteredDetails[index];
    const id = data._id;
    console.log('Rejected', id);
    try{
      const result = await Axios.put(
        process.env.REACT_APP_API_URL + `/${filter.matchType.toLowerCase()}/update`,
        {
          field: '_id',
          value: data._id,
          data: { paymentConfirmed: -1, paymentApprover: user },
        },
        {
          headers: {},
        }
      );
      if (result?.data?.data) {
        console.log("Updated Result",result?.data?.data)
        rearrangeFilteredDetails(-1, index,data)
      } else {
        console.log('Empty');
      }
    }

  catch (error) {
    console.log(error);
    message.error(error.response?.data?.message);
  };
}

  const handleApprove = async (index) => {
    let data = filteredDetails[index];
    console.log('Approved', data._id);
    try {
      const result = await Axios.put(
        process.env.REACT_APP_API_URL + `/${filter.matchType.toLowerCase()}/update`,
        {
          field: '_id',
          value: data._id,
          data: { paymentConfirmed: 1, paymentApprover: user },
        },
        {
          headers: {},
        }
      );
      if (result?.data?.data) {
        console.log("Updated Result", result?.data?.data)
        rearrangeFilteredDetails(1, index,data)
      } else {
        console.log('Empty');
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message);
    }
  };

  const rearrangeFilteredDetails = (status, index, data)=>{
    let updatedPlayer = {...data, paymentConfirmed:status, paymentApprover:user}
    let arrayOne = filteredDetails.slice(0,index)
    let arrayTwo = filteredDetails.slice(index+1, filteredDetails.length)
    if(filter.paymentConfirmed === 2 || status === filter.paymentConfirmed){
          arrayOne.push(updatedPlayer)
    }
    setFilteredDetails(arrayOne.concat(arrayTwo))
  }
  return (
    <div className={`${styles['tournament-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="payments" />

      <div className={`${styles['main-title']}`}>
        <a href="/admin/payments">Payments</a>
      </div>
      <div className={`${styles['tool-bar']}`}>
        <Space wrap>
          <Select
            style={{
              width: 200,
              fontSize: 100,
            }}
            onChange={handleMatchType}
            options={matchTypes.map((match) => ({
              label: match,
              value: match,
            }))}
            placeholder="Event"
          />
          <Select
            placeholder="Age Group"
            style={{
              width: 200,
            }}
            onChange={handleAgeGroup}
            options={ageGroups.map((age) => ({
              label: age,
              value: age,
            }))}
          />
          <Select
            placeholder="Payment Status"
            style={{
              width: 200,
            }}
            onChange={handlePaymentStatus}
            options={paymentStatus.map((pay) => ({
              label: pay,
              value: pay === 'Confirmed' ? 1 : pay === 'Not Confirmed' ? 0 : pay === 'Decline' ? -1 : 2,
            }))}
          />
          <Select
            placeholder="Payment Method"
            style={{
              width: 200,
            }}
            onChange={handlePaymentMethod}
            options={paymentMethods.map((method) => ({
              label: method,
              value: method,
            }))}
          />

          <Button onClick={searchPayments}> Search Payments</Button>
        </Space>
      </div>
      <div className={`${styles['tool-bar']}`}>
        <a href={'/admin/payments/add-new-payment'}>
          <img src={require('../../assests/images/add.png')} alt="" /> Add new payment
        </a>
      </div>
      <div className={`${styles['folder-container']}`}>
        {filteredDetails?.length === 0 ? (
          <div style={{ fontFamily: 'Hind', fontSize: '18px', textAlign: 'center' }}> No payments have been loaded.</div>
        ) : (
          <div>
            <div className={`${styles['table-headers']}`}>
              <div className={`${styles['table-header']}`} style={{ width: '14%' }}>
                ID
              </div>
              <div className={`${styles['table-header']}`}>Email</div>
              <div className={`${styles['table-header']}`}>Payment Method</div>
              <div className={`${styles['table-header']}`}>Payment Slip</div>
              <div className={`${styles['table-header']}`}>Payment Approver</div>
              <div className={`${styles['table-header']}`}>Confirmation Status</div>
              <div className={`${styles['table-header']}`} style={{ width: '3%' }}>
                {}
              </div>
            </div>
            <div>
              {filteredDetails?.map((payment, index) => (
                <div className={`${styles['table-body']}`}>
                  <div className={`${styles['table-row']}`} style={{ width: '14%' }}>
                    {filter.matchType === 'Single' || filter.matchType === 'Double' ? payment.player?._id : payment._id}
                  </div>
                  <div className={`${styles['table-row']}`}>{filter.matchType === 'Single' || filter.matchType === 'Double' ? payment.player?.email : payment.email}</div>
                  <div className={`${styles['table-row']}`}>{payment.paymentMethod}</div>
                  <div className={`${styles['table-row']}`}>
                    {payment.paymentSlip ? <img src={require('../../assests/images/pdf.png')} alt="" style={{ width: '15px', marginRight: '10px' }} /> : ' - '}
                    {payment.paymentSlip}
                  </div>
                  <div className={`${styles['table-row']}`}>{payment.paymentApprover}</div>
                  <div className={`${styles['table-row']}`} style={{ alignItems: 'center' }}>
                    {payment.paymentConfirmed === 1 && <img src={require(`../../assests/images/correct.png`)} alt="" style={{ width: '25px', marginLeft: '10%' }} />}

                    {payment.paymentConfirmed === -1 && <img src={require(`../../assests/images/wrong.png`)} alt="" style={{ width: '25px', marginLeft: '10%' }} />}
                    {payment.paymentConfirmed === 0 && <img src={require(`../../assests/images/pending.png`)} alt="" style={{ width: '25px', marginLeft: '10%' }} />}
                  </div>
                  <div className={`${styles['table-header']}`} style={{ width: '3%' }}>
                    {payment.paymentConfirmed === 0 && (
                      <Row gutter={36}>
                        <Col span={1}>
                          <CloseCircleTwoTone twoToneColor="#eb2f96" className={`${styles['action']}`} onClick={(e) => handleReject(index)} name={index} />
                        </Col>
                        <Col span={1}>
                          <CheckCircleTwoTone twoToneColor="#52c41a" className={`${styles['action']}`} onClick={(e) => handleApprove(index)} name={index} />
                        </Col>
                      </Row>
                    )}
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

export default AdminPaymentsPage;
