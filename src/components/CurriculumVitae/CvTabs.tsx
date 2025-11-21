// src/components/CvTabs.tsx
import { useState, useEffect } from "react";
import { Tabs } from "antd";
import { PdfExportButton } from "./PdfExportButton";
import { CvPreview } from "./CvPreview";
import {
  ContactForm,
  EducationForm,
  ExperienceForm,
  ExpertiseForm,
  LanguagesForm,
  ProfileForm,
  ReferencesForm,
  TitleForm,
} from "@components/forms";
import { CurriculumStateProps } from "@data/types/curriculumStateProps";

export const CvTabs = (props: CurriculumStateProps) => {
  const [showPreviewTab, setShowPreviewTab] = useState(true);

  useEffect(() => {
    const checkWidth = () => setShowPreviewTab(window.innerWidth < 1280);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const tabComponents = {
    Profile: (
      <ProfileForm profile={props.profile} setProfile={props.setProfile} />
    ),
    Title: (
      <TitleForm
        name={props.profile.fullName}
        setName={(name) =>
          props.setProfile({ ...props.profile, fullName: name })
        }
        position={props.profile.jobTitle}
        setPosition={(jobTitle) =>
          props.setProfile({ ...props.profile, jobTitle })
        }
        description={props.profile.description}
        setDescription={(desc) =>
          props.setProfile({ ...props.profile, description: desc })
        }
      />
    ),
    Experience: (
      <ExperienceForm
        experience={props.experience}
        setExperience={props.setExperience}
      />
    ),
    Contact: (
      <ContactForm
        phoneNumber={props.profile.phoneNumber}
        setPhoneNumber={(phone) =>
          props.setProfile({ ...props.profile, phoneNumber: phone })
        }
        email={props.profile.email}
        setEmail={(email) => props.setProfile({ ...props.profile, email })}
        address={props.profile.address}
        setAddress={(address) =>
          props.setProfile({ ...props.profile, address })
        }
      />
    ),
    Education: (
      <EducationForm
        education={props.education}
        setEducation={props.setEducation}
      />
    ),
    Expertise: (
      <ExpertiseForm
        expertise={props.expertise}
        setExpertise={props.setExpertise}
      />
    ),
    Languages: (
      <LanguagesForm
        languages={props.languages}
        setLanguages={props.setLanguages}
      />
    ),
    References: (
      <ReferencesForm
        references={props.references}
        setReferences={props.setReferences}
      />
    ),
  };

  const formTabs = Object.entries(tabComponents).map(
    ([label, children], index) => ({
      key: (index + 1).toString(),
      label,
      children,
    })
  );

  const allTabs = showPreviewTab
    ? [
        ...formTabs,
        { key: "9", label: "Preview", children: <CvPreview {...props} /> },
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
