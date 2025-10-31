import { useState } from "react";
import {
  initialProfileImage,
  initialPhoneNumber,
  initialEmail,
  initialAddress,
  initialEducation,
  initialExpertise,
  initialLanguages,
  initialFullName,
  initialJobTitle,
  initialProfileDescription,
  initialExperience,
  initialReferences,
} from "../const/initialData.js";

export const useCurriculumState = () => {
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [education, setEducation] = useState(initialEducation);
  const [expertise, setExpertise] = useState(initialExpertise);
  const [languages, setLanguages] = useState(initialLanguages);
  const [fullName, setFullName] = useState(initialFullName);
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [profileDescription, setProfileDescription] = useState(
    initialProfileDescription
  );
  const [experience, setExperience] = useState(initialExperience);
  const [references, setReferences] = useState(initialReferences);

  return {
    profileImage,
    setProfileImage,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    address,
    setAddress,
    education,
    setEducation,
    expertise,
    setExpertise,
    languages,
    setLanguages,
    fullName,
    setFullName,
    jobTitle,
    setJobTitle,
    profileDescription,
    setProfileDescription,
    experience,
    setExperience,
    references,
    setReferences,
  };
};
