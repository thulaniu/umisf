import React from 'react';
import Styles from './PreviewBox.module.css';
import {GrNext,GrPrevious,GrDownload} from 'react-icons/gr';

const PreviewBox = () => {
    return (
        <div className={`${Styles["box"]} `}>
            <GrPrevious />
            <img src={require('./Images/TempImg/1.jpg')} alt="" />
            <GrNext/>
        </div>
    );
};

export default PreviewBox;