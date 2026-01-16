import React, { useState } from "react";
import { Upload, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Styles from "./ImageUploader.module.css";

const { Dragger } = Upload;

export default function ImageUploader({
  fileList,
  setFileList,
  setImage,
  setImageName,
}) {
  const [open, setOpen] = useState(false);

  /* File validation */
  const beforeUpload = (file) => {
    const isValid =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "application/pdf";

    if (!isValid) {
      setOpen(true);
      return Upload.LIST_IGNORE;
    }

    setImageName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);

    return true;
  };

  /* Fake upload request to show progress */
  const customRequest = ({ file, onSuccess, onProgress }) => {
    let percent = 0;

    const interval = setInterval(() => {
      percent += 10;
      onProgress({ percent });

      if (percent >= 100) {
        clearInterval(interval);
        onSuccess("ok");
      }
    }, 120);
  };

  const onChange = ({ fileList: newList }) => {
    setFileList(newList.slice(-1)); // allow only 1 file
  };

  return (
    <>
      {/* Invalid file dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Invalid file type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload a JPG, PNG, or PDF file only.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Upload Card */}
      <div className={Styles.uploadCard}>
        <Dragger
          fileList={fileList}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          onChange={onChange}
          multiple={false}
          showUploadList={false}
        >
          <p className={Styles.icon}>
            <InboxOutlined />
          </p>
          <p className={Styles.text}>
            Drop your image here, or<br></br> <span>browse</span>
          </p>
          <p className={Styles.hint}>Supports JPG, PNG, PDF</p>
        </Dragger>

        {/* Upload Progress */}
        {fileList.length > 0 && fileList[0].percent !== undefined && (
          <div className={Styles.progressWrapper}>
            <Progress
              percent={Math.round(fileList[0].percent)}
              size="small"
              status={
                fileList[0].status === "done"
                  ? "success"
                  : "active"
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
