import React from 'react'
import styles from './membercomponent.module.css'

function Member(props) {
  let Pic = require( `../../../assests/images/${props.details.image}`)
  return (
    <div className={`${styles['member']}`}>
      <div className={`${styles['member-img']}`}>
          <img className={`${styles['mem-img']}`} src={Pic}></img>
      </div>
      <div className={`${styles['member-info']}`}>
        <p>{props.details.name}</p>
        <div>{props.details.tag}</div>
        <div>{props.details.phone}</div>
        <div className={`${styles['social']}`}>
          <a href={`mailto:${props.details.email}`} target='_blank'>
          <i class='bx bxl-gmail' ></i>
          </a>
          <a href={props.details.facebook} target='_blank'>
            <i className="bx bxl-facebook"></i>
          </a>
          <a href={props.details.linkedin} target='_blank'>
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </div>
      
    </div>
  )
}

export default Member
