import { Education } from "./education";
import { Experience } from "./experience";
import { Expertise } from "./expertise";
import { Language } from "./language";
import { Profile } from "./profile";
import { Reference } from "./reference";

export interface CurriculumStateProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
    education: Education[];
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
    expertise: Expertise[];
    setExpertise: React.Dispatch<React.SetStateAction<Expertise[]>>;
    languages: Language[];
    setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
    experience: Experience[];
    setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
    references: Reference[];
    setReferences: React.Dispatch<React.SetStateAction<Reference[]>>;
}
