import React, { useEffect } from 'react';
import Styles from './GalleryPage.module.css';
import AlbumCard from './AlbumCard';
import { useState } from 'react';
import image from './Images/TempImg/1.jpg';
import HeaderPage from '../HeaderPage/HeaderPage';
import Footer from '../HomePage/Footer/footer';
import { message } from 'antd';
import Axios from "axios";

const GalleryPage = () => {
  

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_URL + '/photo/getAll ', {
      headers: {},
    })
      .then((res) => {
        console.log('Photos: ', res);
        setPhotos(res.data.data)
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response.data.message);
      });
  }, []);

  return (
    <div className={`${Styles['body']}`}>
      <div className={`${Styles['cover-img']}`}>
        <HeaderPage />
        <div className={`${Styles['cover-title']}`}>
          <h1 id="h1" className={`${Styles['typing-demo']}`}>
            {' '}
            MEMORIES ....
          </h1>
          <div className={`${Styles['bottom-para']}`}>
            <p>Let's dive into our good old days!</p>
          </div>
        </div>
      </div>
      <div className={`${Styles['gallery']} `}>
        <div className={`${Styles['gallery-content']} `}>
          {photos?.map((obj, index) => {
            return <AlbumCard key={index} title={obj.year} photos={obj.photos} />;
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;
