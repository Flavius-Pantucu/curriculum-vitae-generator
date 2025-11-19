// src/data/hooks/useCurriculumState.ts
import { useState } from "react";
import {
    initialProfile,
    initialEducation,
    initialExpertise,
    initialLanguages,
    initialExperience,
    initialReferences,
} from "../const";

import type { Education, Expertise, Language, Experience, Reference, Profile } from "../types";
import { CurriculumStateProps } from "@data/types/curriculumStateProps";

export const useCurriculumState = (): CurriculumStateProps => {
    const [profile, setProfile] = useState<Profile>(initialProfile);
    const [education, setEducation] = useState<Education[]>(initialEducation);
    const [expertise, setExpertise] = useState<Expertise[]>(initialExpertise);
    const [languages, setLanguages] = useState<Language[]>(initialLanguages);
    const [experience, setExperience] = useState<Experience[]>(initialExperience);
    const [references, setReferences] = useState<Reference[]>(initialReferences);

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
