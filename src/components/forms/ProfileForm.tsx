import { useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { UploadProps, RcFile } from "antd/es/upload";
import { Profile } from "@data/types";

const { Dragger } = Upload;

interface ProfileProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const ProfileForm = ({ profile, setProfile }: ProfileProps) => {
    const handleBeforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
            return Upload.LIST_IGNORE;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === "string") {
                setProfile({ ...profile, image: result });
            }
        };
        reader.readAsDataURL(file);

        return false; // prevent auto-upload
    };

    const handleDrop: UploadProps["onDrop"] = (e) => {
        console.log("Dropped files", e.dataTransfer.files);
    };

    useEffect(() => {
        console.log("Profile image updated:", profile.image);
    }, [profile.image]);

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
                <p className="ant-upload-text">Click or drag image to this area to upload</p>
                <p className="ant-upload-hint">Only image files are supported.</p>
            </Dragger>

            {profile.image && (
                <div className="mt-4 flex justify-center">
                    <Image src={profile.image} alt="Uploaded" width={200} className="rounded-full" />
                </div>
            )}
        </>
    );
};
