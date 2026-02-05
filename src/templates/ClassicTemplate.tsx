import React from 'react';
import { CVData } from '../types/cv.types';

interface TemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, languages, hobbies } = data;

  return (
    <div className="bg-white text-black p-12 min-h-[297mm]" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{personal.name || 'Your Name'}</h1>
        <div className="text-sm space-x-3">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>•</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        {personal.linkedin && (
          <div className="text-sm mt-1">{personal.linkedin}</div>
        )}
      </div>

      {/* Photo */}
      {personal.photoBase64 && (
        <div className="flex justify-center mb-6">
          <img 
            src={personal.photoBase64} 
            alt="Profile" 
            className="w-32 h-40 object-cover border-2 border-black"
          />
        </div>
      )}

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">EXPERIENCE</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm">{exp.dates.from} - {exp.dates.to}</span>
                </div>
                <div className="text-sm italic mb-2">{exp.company}</div>
                {exp.responsibilities && (
                  <p className="text-sm mb-1">{exp.responsibilities}</p>
                )}
                {exp.achievements && (
                  <p className="text-sm">{exp.achievements}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">EDUCATION</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm">{edu.dates.from} - {edu.dates.to}</span>
                </div>
                <div className="text-sm italic">{edu.school}</div>
                {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">SKILLS</h2>
          <div className="text-sm">
            {skills.map((skill, idx) => (
              <span key={skill.id}>
                {skill.name}
                {idx < skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">PROJECTS</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold">{project.name}</h3>
                {project.description && <p className="text-sm mb-1">{project.description}</p>}
                {project.technologies && <p className="text-sm italic">Technologies: {project.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">CERTIFICATIONS</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span> - {cert.issuer} ({cert.date})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">LANGUAGES</h2>
          <div className="text-sm">
            {languages.map((lang, idx) => (
              <span key={lang.id}>
                {lang.name}{lang.level && ` (${lang.level})`}
                {idx < languages.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-black pb-1 mb-3">INTERESTS</h2>
          <div className="text-sm">
            {hobbies.map((hobby, idx) => (
              <span key={hobby.id}>
                {hobby.name}
                {idx < hobbies.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
