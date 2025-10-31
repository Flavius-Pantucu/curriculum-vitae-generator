import { Tabs } from "antd";
import {
  Profile,
  Title,
  Experience,
  Contact,
  Education,
  Expertise,
  Languages,
  References,
} from "../forms";
import { PdfExportButton } from "./PdfExportButton";
import { CvPreview } from "./CvPreview";
import { useState, useEffect } from "react";

export const CvTabs = (props) => {
  const [showPreviewTab, setShowPreviewTab] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setShowPreviewTab(window.innerWidth < 1280); // 1280px is the xl breakpoint
    };

    checkWidth(); // Check initially
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  const formTabs = [
    {
      key: "1",
      label: "Profile",
      children: (
        <Profile
          profileImage={props.profileImage}
          setProfileImage={props.setProfileImage}
        />
      ),
    },
    {
      key: "2",
      label: "Title",
      children: (
        <Title
          name={props.fullName}
          setName={props.setFullName}
          position={props.jobTitle}
          setPosition={props.setJobTitle}
          description={props.profileDescription}
          setDescription={props.setProfileDescription}
        />
      ),
    },
    {
      key: "3",
      label: "Experience",
      children: (
        <Experience
          experience={props.experience}
          setExperience={props.setExperience}
        />
      ),
    },
    {
      key: "4",
      label: "Contact",
      children: (
        <Contact
          phoneNumber={props.phoneNumber}
          setPhoneNumber={props.setPhoneNumber}
          email={props.email}
          setEmail={props.setEmail}
          address={props.address}
          setAddress={props.setAddress}
        />
      ),
    },
    {
      key: "5",
      label: "Education",
      children: (
        <Education
          education={props.education}
          setEducation={props.setEducation}
        />
      ),
    },
    {
      key: "6",
      label: "Expertise",
      children: (
        <Expertise
          expertise={props.expertise}
          setExpertise={props.setExpertise}
        />
      ),
    },
    {
      key: "7",
      label: "Languages",
      children: (
        <Languages
          languages={props.languages}
          setLanguages={props.setLanguages}
        />
      ),
    },
    {
      key: "8",
      label: "References",
      children: (
        <References
          references={props.references}
          setReferences={props.setReferences}
        />
      ),
    },
  ];

  const allTabs = showPreviewTab
    ? [
        ...formTabs,
        {
          key: "9",
          label: "Preview",
          children: <CvPreview {...props} />,
        },
      ]
    : formTabs;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto pb-4">
        <Tabs defaultActiveKey="1" items={allTabs} />
      </div>
      <div className="flex justify-center py-4 border-t border-gray-600">
        <PdfExportButton />
      </div>
    </div>
  );
};
