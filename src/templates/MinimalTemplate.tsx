import React from 'react';
import { CVData } from '../types/cv.types';

interface TemplateProps {
  data: CVData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, languages, hobbies } = data;

  return (
    <div className="bg-white text-gray-900 p-16 min-h-[297mm] max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header - centered and minimal */}
      <div className="text-center mb-16">
        {personal.photoBase64 && (
          <div className="flex justify-center mb-6">
            <img 
              src={personal.photoBase64} 
              alt="Profile" 
              className="w-40 h-48 object-cover rounded-sm"
            />
          </div>
        )}
        <h1 className="text-5xl font-light tracking-wide mb-6">{personal.name || 'Your Name'}</h1>
        <div className="space-y-1 text-sm text-gray-600">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-16">
          <p className="text-center text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 text-center">Experience</h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="text-center mb-3">
                  <h3 className="text-xl font-light">{exp.position}</h3>
                  <div className="text-sm text-gray-600 mt-1">{exp.company}</div>
                  <div className="text-xs text-gray-500 mt-1">{exp.dates.from} — {exp.dates.to}</div>
                </div>
                {exp.responsibilities && (
                  <p className="text-sm text-gray-700 leading-relaxed text-center mb-2">
                    {exp.responsibilities}
                  </p>
                )}
                {exp.achievements && (
                  <p className="text-sm text-gray-700 leading-relaxed text-center italic">
                    {exp.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-light">{edu.degree}</h3>
                <div className="text-sm text-gray-600 mt-1">{edu.field}</div>
                <div className="text-sm text-gray-600">{edu.school}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {edu.dates.from} — {edu.dates.to}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm text-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 text-center">Projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="text-lg font-light mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    {project.description}
                  </p>
                )}
                {project.technologies && (
                  <div className="text-xs text-gray-500">{project.technologies}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 text-center">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-center">
                <div className="text-sm font-light">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.issuer} • {cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Hobbies - side by side */}
      {(languages.length > 0 || hobbies.length > 0) && (
        <div className="grid grid-cols-2 gap-12">
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Languages</h2>
              <div className="space-y-2 text-center">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-sm text-gray-700">
                    {lang.name}{lang.level && ` • ${lang.level}`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hobbies.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Interests</h2>
              <div className="space-y-2 text-center">
                {hobbies.map((hobby) => (
                  <div key={hobby.id} className="text-sm text-gray-700">
                    {hobby.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
