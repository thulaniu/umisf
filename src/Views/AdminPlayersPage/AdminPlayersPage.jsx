import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './adminPlayersPage.module.css';
import { useState, useEffect } from 'react';
import { Select, Space, Button, message} from 'antd';
import Axios, * as others from 'axios';
import { Link } from 'react-router-dom';
import { Form, Modal, Spinner } from 'react-bootstrap';

const AdminPlayersPage = () => {
  // new adding page

  const [filteredDetails, setFilteredDetails] = useState([]);
  const [email, setEmail] = useState();
  const [matchTypeForEmail, setMatchTypeForEmail] = useState('');
  const handleEmailInput = (event) => {
    console.log('email', event.target.value);
    setEmail(event.target.value);
  };
  const [filteredDetailsByEmail, setFilteredDetailsByEmail] = useState([]);
  const [filter, setFilter] = useState({
    matchType: '',
    ageGroup: '',
    gender: '',
  });
  const matchTypes = ['None','Single', 'Double'];
  const matchTypesForEmail = ['None', 'Single', 'Double'];
  const ageGroups = ['All', 'Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'University', 'Company'];
  const gender = ['All', 'Girls', 'Boys', 'Men', 'Women'];
  const year = new Date().getFullYear();
  const [deleteId, setDeleteId] = useState('')

  const [showSingle, setShowSingle] = useState(false); //maodal show
  const handleCloseSingle = () => setShowSingle(false); //handle modal close
  const handleShowSingle = () => setShowSingle(true); //handle modal show
  const [single, setSingle] = useState({
    _id: '',
    fullName: '',
    matchType: '',
    ageGroup: '',
    paymentMethod: '',
    paymentConfirmed: '',
  });
  const [double, setDouble] = useState({
    _id: '',
    fullName: '',
    playerPartner: '',
    matchType: '',
    ageGroup: '',
    paymentMethod: '',
    paymentConfirmed: '',
  });

  const [showDouble, setShowDouble] = useState(false); //maodal show
  const handleCloseDouble = () => setShowDouble(false); //handle modal close
  const handleShowDouble = () => setShowDouble(true); //handle modal show

  const [show, setShow] = useState(false); //maodal show
  const handleClose = () => setShow(false); //handle modal close
  const handleShow = () => setShow(true); //handle modal show
  // should get from data base
  // const [institute,setInstitute] = ['ananda','nalanda','vishaka','st josephs'];
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
  const handleGender = (value) => {
    setFilter((prev) => {
      return { ...prev, gender: value };
    });
  };

  const handleMatchTypeForEmail = (value) => {
    setMatchTypeForEmail(value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      // show loading message
      message.loading('Loading data...');
    }
  }, [isSubmitting]);

  const searchPlayers = async (e) => {
    e.preventDefault();
    console.log('Filter: ', filter);
    if (Object.values(filter).includes('')) {
      message.error('Not all the filters are set !!');
    } else {
      setIsSubmitting(true);
      console.log('Valid filter');
      let playerFilter = { year: year };

      filter.ageGroup !== 'All' && (playerFilter = { ...playerFilter, ageGroup: filter.ageGroup });
      filter.gender !== 'All' && (playerFilter = { ...playerFilter, matchType: filter.gender });

      console.log('playerfilter', playerFilter);
      try {
        const result = await Axios.get(
          process.env.REACT_APP_API_URL + `/${filter.matchType == 'None' ? 'player' : filter.matchType.toLowerCase()}/getFilteredData`,

          { params: playerFilter },
          {
            headers: {},
          }
        );
        console.log('Result', result);
        setIsSubmitting(false);
        if (result?.data?.data?.length !== 0) {
          setFilteredDetails(result?.data?.data);
          console.log('filter details', filteredDetails);
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

  const searchPlayersByEmail = async (e) => {
    e.preventDefault();
    console.log('email: ', email, matchTypeForEmail);
    if (email == '' || matchTypeForEmail == '') {
      message.error('Email/Match Type not given');
    } else {
      setIsSubmitting(true);
      console.log('Valid filter');
      let playerFilter = email.includes('@') ? { email: email, year: year } : { _id: email, year: year };

      console.log('playerfilter', playerFilter);
      try {
        console.log('in try block');
        const result = await Axios.get(
          process.env.REACT_APP_API_URL + `/${matchTypeForEmail == 'None' ? 'player' : matchTypeForEmail.toLowerCase()}/getFilteredData`,

          { params: playerFilter },
          {
            headers: {},
          }
        );
        console.log('Result', result);
        setIsSubmitting(false);
        if (result?.data?.data?.length !== 0) {
          console.log('data: ', result?.data?.data);
          setFilteredDetailsByEmail(result?.data?.data);
          console.log('filter details', filteredDetailsByEmail);
        } else {
          console.log('Empty');
          setFilteredDetailsByEmail([]);
        }
      } catch (error) {
        console.log(error);
        message.error(error.response?.data?.message);
      }
    }
  };

  const editSingle = (value) => {
    setSingle({
      _id: value._id,
      fullName: value.player.firstName + ' ' + value.player.lastName,
      matchType: value.matchType,
      ageGroup: value.ageGroup,
      paymentMethod: value.paymentMethod,
      paymentConfirmed: value.paymentConfirmed,
    });
    handleShowSingle();
  };

  const editDouble = (value) => {
    setDouble({
      _id: value._id,
      fullName: value.player.firstName + ' ' + value.player.lastName,
      playerPartner: value.playerPartner,
      matchType: value.matchType,
      ageGroup: value.ageGroup,
      paymentMethod: value.paymentMethod,
      paymentConfirmed: value.paymentConfirmed,
    });
    handleShowDouble();
  };

  const submitEditSingle = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (Object.values(single).includes('')) {
      e.stopPropagation();
    } else {
      try {
        console.log(matchTypeForEmail, 'Email');
        const result = await Axios.put(
          process.env.REACT_APP_API_URL + `/${matchTypeForEmail.toLowerCase()}/update`,
          {
            field: '_id',
            value: single._id,
            data: { matchType: single.matchType, ageGroup: single.ageGroup, paymentMethod: single.paymentMethod, paymentConfirmed: single.paymentConfirmed },
          },
          {
            headers: {},
          }
        );
        if (result?.data?.data) {
          console.log('Updated Result', result?.data?.data);
          window.location.reload(false);
        } else {
          console.log('Empty');
        }
      } catch (error) {
        handleCloseSingle()
        console.log(error);
        message.error(error.response?.data?.message);
      }
    }
  };

  const submitEditDouble = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (Object.values(double).includes('')) {
      e.stopPropagation();
    } else {
      try {
        console.log(matchTypeForEmail, 'Email');
        const result = await Axios.put(
          process.env.REACT_APP_API_URL + `/${matchTypeForEmail.toLowerCase()}/update`,
          {
            field: '_id',
            value: double._id,
            data: { matchType: double.matchType, ageGroup: double.ageGroup, paymentMethod: double.paymentMethod, paymentConfirmed: double.paymentConfirmed, playerPartner:double.playerPartner },
          },
          {
            headers: {},
          }
        );
        if (result?.data?.data) {
          console.log('Updated Result', result?.data?.data);
         // window.location.reload(false);
        } else {
          console.log('Empty');
        }
      } catch (error) {
        handleCloseDouble()
        console.log(error);
        message.error(error.response?.data?.message);
      }
    }
  };

  const deleteEvent = async(e)=>{
    e.preventDefault();
    try{
      const result = await Axios.delete(process.env.REACT_APP_API_URL + `/${matchTypeForEmail == 'None' ? 'player': matchTypeForEmail.toLowerCase()}/removeByField/Id/` + deleteId , {
        headers: {},
      });
      //setIsSubmitting(false)
      console.log(result);

    //  message.success('Deleted successfully !! ');

    //  window.location.reload(false)
    }catch (error){
      handleClose()
      console.log(error);
      message.error(error.response?.data?.message); 
    }
  }

  return (
    <div className={`${styles['players-full-container']}`}>
      <ProfileHeader user_type={'admin'} />
      <AdminNavbar page="players" />
      <div className={`${styles['main-title']}`}>
        <a href="/admin/players">Players</a>
      </div>
      {/* <div className={`${styles['tool-bar']}`}>
        <a href="/admin/players/add-new-player">
          <img src={require('../../assests/images/add.png')} alt="" /> Add Account
        </a>
      </div> */}

      <div className={`${styles['tool-bar']}`}>
        <h5>Search players</h5>
        <Space wrap>
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
            style={{
              width: 200,
              fontSize: 100,
            }}
            onChange={handleGender}
            options={gender.map((gender) => ({
              label: gender,
              value: gender,
            }))}
            placeholder="Match Type"
          />
          <Button onClick={searchPlayers}> Search</Button>
        </Space>

        <br />
        <hr />

        <Space wrap>
          <input type="text" className={`${styles['form-input']}`} value={email} placeholder="Enter email/ID" onChange={handleEmailInput} required />
          <Select
            style={{
              width: 200,
              fontSize: 100,
            }}
            onChange={handleMatchTypeForEmail}
            options={matchTypesForEmail.map((match) => ({
              label: match,
              value: match,
            }))}
            placeholder="Event"
          />
          <Button onClick={searchPlayersByEmail}> Search Player</Button>
          <div>
            {'Number of players : '}
            {filter.matchType !== '' ? filteredDetails.length : matchTypeForEmail !== '' ? filteredDetailsByEmail.length : ''}
          </div>
        </Space>
      </div>

      <div className={`${styles['player-container']}`}>
        {(filteredDetails?.length === 0) & (filteredDetailsByEmail?.length === 0) ? (
          <div
            style={{
              fontFamily: 'Hind',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            {' '}
            No players have been loaded.
          </div>
        ) : (
          <div className={`${styles['players-grid-container']}`}>
            {filteredDetails?.map((value, key) => (
              <div>
                {/* {value.map((player, index) => ( */}
                <div className={`${styles['player-each']}`}>
                  <button className={`${styles['player-btn']}`}>
                    <Link to={ filter.matchType == 'None'? value.firstName + '+' + value.lastName : value.player?.firstName + '+' + value.player?.lastName} className={`${styles['player-name']}`} state={{ playerDetails: filter.matchType == 'None' ? value:value.player }} key={key}>
                      {key + 1 + ') '}
                      {filter.matchType == 'None' ? `${value.firstName}  ${value.lastName} ${value.email} ${value.institute} ` : value.player?.firstName + ' ' + value.player?.lastName} {value.player?.email} {value.player?.institute} {value.paymentMethod}
                    </Link>
                  </button>
                </div>
                {/* ))} */}
              </div>
            ))}

            {filteredDetailsByEmail?.map((value, key) => (
              <div>
                {/* {value.map((player, index) => ( */}
                <div className={`${styles['player-each']}`}>
                  <button className={`${styles['player-btn']}`}>
                    <Link
                      to={matchTypeForEmail == 'None' ? value?.firstName + '+' + value?.lastName : value?.player?.firstName + '+' + value?.player?.lastName}
                      className={`${styles['player-name']}`}
                      state={{ playerDetails: matchTypeForEmail == 'None' ? value : value?.player }}
                      key={key}
                    >
                      {matchTypeForEmail == 'None' ? value?.firstName + ' ' + value?.lastName : value?.player?.firstName + ' ' + value?.player?.lastName}
                    </Link>
                  </button>
                  <Button onClick={() => editSingle(value)} hidden={matchTypeForEmail == 'Single' ? false : true}>
                    {' '}
                    Edit Single
                  </Button>
                  <Button onClick={() => editDouble(value)} hidden={matchTypeForEmail == 'Double' ? false : true}>
                    {' '}
                    Edit Double
                  </Button>
                  <Button onClick={()=>{handleShow(); setDeleteId(value._id)}} >
                    {' '}
                    Delete
                  </Button>
                </div>
                {/* ))} */}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* TODO: when changing filter after already selected, changing from single to double, error */}
      <Modal show={showSingle} onHide={handleCloseSingle} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Edit Single </Modal.Title>{' '}
        </Modal.Header>
        <Form onSubmit={submitEditSingle}>
          <Modal.Body>
            <div className="form-group row">
              <label for="emp-id" className="col-sm-3 col-form-label m-t-5">
                Full Name
              </label>
              <div className="col-sm-8">
                <Form.Control type="text" className={`${styles['mb-1']} form-control`} name="emp-id" required value={single.fullName} readOnly />
              </div>
            </div>

            <div className="form-group row">
              <label for="r-type" className="col-sm-3 col-form-label">
                Age Group
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setSingle((prev) => {
                      return { ...prev, ageGroup: e.target.value };
                    });
                  }}
                  value={single.ageGroup}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={single.ageGroup}>
                    {single.ageGroup}
                  </option>
                  {['Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'University', 'Company'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Match Type
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setSingle((prev) => {
                      return { ...prev, matchType: e.target.value };
                    });
                  }}
                  value={single.matchType}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={single.matchType}>
                    {single.matchType}
                  </option>
                  {['Girls', 'Boys', 'Men', 'Women'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Payment Method
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setSingle((prev) => {
                      return { ...prev, paymentMethod: e.target.value };
                    });
                  }}
                  value={single.paymentMethod}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={single.paymentMethod}>
                    {single.paymentMethod}
                  </option>
                  {['On-site', 'Bank Transfer'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Payment Confirmed
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setSingle((prev) => {
                      return { ...prev, paymentConfirmed: parseInt(e.target.value) };
                    });
                  }}
                  value={single.paymentConfirmed}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value="">
                    {single.paymentConfirmed}
                  </option>
                  {[0, 1, -1].map((cur) => {
                    return cur.type !== 'All' && <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={handleCloseSingle} className="btn btn-dark">
              Cancel
            </button>
            <button type="submit" className="btn btn-dark">
              Apply
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDouble} onHide={handleCloseDouble} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Edit Double </Modal.Title>{' '}
        </Modal.Header>
        <Form onSubmit={submitEditDouble}>
          <Modal.Body>
            <div className="form-group row">
              <label for="emp-id" className="col-sm-3 col-form-label m-t-5">
                Full Name
              </label>
              <div className="col-sm-8">
                <Form.Control type="text" className={`${styles['mb-1']} form-control`} name="emp-id" required value={double.fullName} readOnly />
              </div>
            </div>

            <div className="form-group row">
              <label for="emp-id" className="col-sm-3 col-form-label m-t-5">
                Partner ID
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  className={`${styles['mb-1']} form-control`}
                  name="emp-id"
                  required
                  onChange={(e) => {
                    setDouble((prev) => {
                      return { ...prev, playerPartner: e.target.value };
                    });
                  }}
                  value={double.playerPartner}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="r-type" className="col-sm-3 col-form-label">
                Age Group
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setDouble((prev) => {
                      return { ...prev, ageGroup: e.target.value };
                    });
                  }}
                  value={double.ageGroup}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={double.ageGroup}>
                    {double.ageGroup}
                  </option>
                  {['Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'University', 'Company'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Match Type
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setDouble((prev) => {
                      return { ...prev, matchType: e.target.value };
                    });
                  }}
                  value={double.matchType}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={double.matchType}>
                    {double.matchType}
                  </option>
                  {['Girls', 'Boys', 'Men', 'Women', 'Mix'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Payment Method
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setDouble((prev) => {
                      return { ...prev, paymentMethod: e.target.value };
                    });
                  }}
                  value={double.paymentMethod}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value={double.paymentMethod}>
                    {double.paymentMethod}
                  </option>
                  {['On-site', 'Bank Transfer'].map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Payment Confirmed
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={(e) => {
                    setDouble((prev) => {
                      return { ...prev, paymentConfirmed: parseInt(e.target.value) };
                    });
                  }}
                  value={double.paymentConfirmed}
                  className={`${styles['mb-1']} form-select`}
                  required
                >
                  <option selected disabled hidden value="">
                    {double.paymentConfirmed}
                  </option>
                  {[0, 1, -1].map((cur) => {
                    return cur.type !== 'All' && <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={handleCloseDouble} className="btn btn-dark">
              Cancel
            </button>
            <button type="submit" className="btn btn-dark">
              Apply
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Delete Confirmation </Modal.Title>{' '}
        </Modal.Header>
        <Form onSubmit={deleteEvent}>
          <Modal.Body>
            Are you sure you want to delete this record ?
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={handleClose} className="btn btn-dark">
              Cancel
            </button>
            <button type="submit" className="btn btn-dark">
              Confirm
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default AdminPlayersPage;
