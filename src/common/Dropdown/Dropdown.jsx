import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { DownOutlined } from "@ant-design/icons";
const Dropdown = ({ options, value, name, lable, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.lable} hidden={value !== ""} onClick={toggleOpen}>
        {"Select " + lable}
      </div>
      <div className={styles.lableselected} hidden={value == ""} onClick={toggleOpen}>
        {"Select " + lable}
      </div>
      <div className={styles.selectedValue} onClick={toggleOpen}>
        {value}
        <img src={require("../../assests/images/d_arrow.png")} className={styles.down} />
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => {
                handleClick(option, name);
                toggleOpen();
              }}
              name={name}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
