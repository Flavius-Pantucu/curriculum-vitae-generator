import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";

const { Dragger } = Upload;

export const Profile = ({ profileImage, setProfileImage }) => {
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result); // base64
    };
    reader.readAsDataURL(file);

    return false; // prevent auto-upload
  };

  const handleDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  React.useEffect(() => {
    console.log("Profile image updated:", profileImage);
  }, [profileImage]);
  return (
    <>
      <Dragger
        multiple={false}
        accept="image/*"
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
        onDrop={handleDrop}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag image to this area to upload
        </p>
        <p className="ant-upload-hint">Only image files are supported.</p>
      </Dragger>
      {profileImage && (
        <div className="mt-4 flex justify-center">
          <Image
            src={profileImage}
            alt="Uploaded"
            width={200}
            className="rounded-full"
          />
        </div>
      )}
    </>
  );
};
