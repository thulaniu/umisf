import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, message } from 'antd';
import Styles from "./successMessage.module.css";

const SuccessMessage = () => {
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const copy = async () => {
    navigator.clipboard.writeText(id);
    setIsCopied(true);
    info()

    await delay(2000)
    setIsCopied(false)
  };

  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('copied !');
  };


  return (
    <div className={`${Styles["success-msg-box"]}`}>
      <div className={`${Styles["success-msg"]}`}>
        Thank you for registering with us ! The below player ID will be used for registering for the
        present and future events including next years.
        <div className={`${Styles["copy-text-container"]}`}>
          <div className={`${Styles["copy-text"]}`}>{id}</div>
          <div className={`${Styles["copy-button"]}`}>
          {contextHolder}
            <button onClick={copy}>
              {isCopied ? (
                <i class="bx bx-check" style={{ color: "#ffffff" }}></i>
              ) : (
                <i class="bx bx-clipboard" style={{ color: "#ffffff" }}></i>
              )}
            </button>
          </div>
        </div>
        <button className={`${Styles["conquest-button"]}`} type="submit">
          Enter the conquest
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
