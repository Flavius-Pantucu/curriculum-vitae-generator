import { ProfileTypesEnum } from "@data/enums/ProfileTypesEnum";
import { Expertise } from "../types";

export const initialExpertise: Expertise[] = [
  { name: "JavaScript & TypeScript" },
  { name: "Frontend frameworks" },
  { name: "Backend development" },
  { name: "SQL & databases" },
  { name: "Cloud & containers" },
  { name: "Version control & CI/CD" },
];

export const personalExpertise: Expertise[] = [
  { name: "JavaScript & TypeScript" },
  { name: "React & Angular" },
  { name: "Java Spring Boot & .NET" },
  { name: "PostgreSQL & PL/SQL" },
  { name: "AWS & Docker" },
  { name: "CI/CD w/ Jenkins & CircleCI" },
  { name: "Git, Jira, Agile workflows" },
];

export const getExpertiseDataByProfileType = (
  profileType: ProfileTypesEnum
): Expertise[] => {
  switch (profileType) {
    case ProfileTypesEnum.Personal:
      return personalExpertise;
    case ProfileTypesEnum.Default:
      return initialExpertise;
  }
};
