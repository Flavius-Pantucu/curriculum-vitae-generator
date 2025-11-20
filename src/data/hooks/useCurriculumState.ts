// src/data/hooks/useCurriculumState.ts
import { useState } from "react";
import {
  getProfileDataByProfileType,
  getEducationDataByProfileType,
  getExpertiseDataByProfileType,
  getLanguagesDataByProfileType,
  getExperienceDataByProfileType,
  getReferencesDataByProfileType,
} from "../const";

import type {
  Education,
  Expertise,
  Language,
  Experience,
  Reference,
  Profile,
} from "../types";
import { CurriculumStateProps } from "@data/types/curriculumStateProps";
import { ProfileTypesEnum } from "@data/enums/ProfileTypesEnum";

export const useCurriculumState = (
  profileType = ProfileTypesEnum.Default
): CurriculumStateProps => {
  const [profile, setProfile] = useState<Profile>(
    getProfileDataByProfileType(profileType)
  );
  const [education, setEducation] = useState<Education[]>(
    getEducationDataByProfileType(profileType)
  );
  const [expertise, setExpertise] = useState<Expertise[]>(
    getExpertiseDataByProfileType(profileType)
  );
  const [languages, setLanguages] = useState<Language[]>(
    getLanguagesDataByProfileType(profileType)
  );
  const [experience, setExperience] = useState<Experience[]>(
    getExperienceDataByProfileType(profileType)
  );
  const [references, setReferences] = useState<Reference[]>(
    getReferencesDataByProfileType(profileType)
  );

  return {
    profile,
    setProfile,
    education,
    setEducation,
    expertise,
    setExpertise,
    languages,
    setLanguages,
    experience,
    setExperience,
    references,
    setReferences,
  };
};
