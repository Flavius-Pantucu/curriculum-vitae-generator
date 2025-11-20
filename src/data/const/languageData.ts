import { ProfileTypesEnum } from "@data/enums/ProfileTypesEnum";
import { Language } from "@data/types";

export const initialLanguages: Language[] = [
  { name: "English", fluency: "Fluent" },
  { name: "Spanish", fluency: "Conversational" },
  { name: "German", fluency: "Basic" },
];

export const personalLanguages: Language[] = [
  { name: "Romanian", fluency: "Native" },
  { name: "English", fluency: "Fluent" },
  { name: "Japanese", fluency: "Conversational" },
];

export const getLanguagesDataByProfileType = (
  profileType: ProfileTypesEnum
): Language[] => {
  switch (profileType) {
    case ProfileTypesEnum.Personal:
      return personalLanguages;
    case ProfileTypesEnum.Default:
      return initialLanguages;
  }
};
