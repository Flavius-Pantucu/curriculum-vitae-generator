import { ProfileTypesEnum } from "@data/enums/ProfileTypesEnum";
import { Profile } from "@data/types";

export const initialProfile: Profile = {
  fullName: "John Doe",
  jobTitle: "Full-Stack Developer",
  description:
    "I’m a full-stack developer passionate about building smooth, reliable applications using modern technologies. I enjoy tackling challenges across the entire stack—from crafting intuitive user interfaces to designing efficient back-end solutions. Always eager to learn and adapt, I focus on writing clean, maintainable code and delivering products that make a real difference.",
  image: "images/profile-placeholder.png",
  phoneNumber: "+1 234 567 8901",
  email: "example@email.com",
  address: "City, Country",
};

export const personalProfile: Profile = {
  fullName: "Flavius-Marian Panțucu",
  jobTitle: "Senior Software Engineer",
  description:
    "As a full-stack developer, I’m passionate about crafting modern, seamless applications. I tackle problems across the stack—from elegant interfaces to optimized backend systems—while staying focused on learning, adapting, and delivering high-impact solutions.",
  image: "images/avatar.png",
  phoneNumber: "+40 754 333 785",
  email: "flaviuspantucu@icloud.com",
  address: "Craiova, Romania",
};

export const getProfileDataByProfileType = (
  profileType: ProfileTypesEnum
): Profile => {
  switch (profileType) {
    case ProfileTypesEnum.Personal:
      return personalProfile;
    case ProfileTypesEnum.Default:
      return initialProfile;
  }
};
