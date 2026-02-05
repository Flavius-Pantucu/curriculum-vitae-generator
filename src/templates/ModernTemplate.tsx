import React from 'react';
import { CVData } from '../types/cv.types';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, languages, hobbies } = data;

  const getSkillBars = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return levels[level as keyof typeof levels] || 2;
  };

  return (
    <div className="bg-gray-50 text-gray-900 p-12 min-h-[297mm]">
      {/* Header with accent */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 -m-12 mb-8 rounded-b-2xl">
        <div className="flex items-start gap-6">
          {personal.photoBase64 && (
            <img 
              src={personal.photoBase64} 
              alt="Profile" 
              className="w-32 h-40 object-cover rounded-lg border-4 border-white shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{personal.name || 'Your Name'}</h1>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {personal.summary && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">About Me</h2>
          <p className="text-sm leading-relaxed text-gray-700">{personal.summary}</p>
        </div>
      )}

      {/* Experience Cards */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-blue-600 font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                    {exp.dates.from} - {exp.dates.to}
                  </div>
                </div>
                {exp.responsibilities && (
                  <p className="text-sm text-gray-700 mb-2">{exp.responsibilities}</p>
                )}
                {exp.achievements && (
                  <p className="text-sm text-gray-700">{exp.achievements}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Cards */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <div className="text-blue-600 font-medium">{edu.school}</div>
                    {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                    {edu.dates.from} - {edu.dates.to}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Skills</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600 capitalize">{skill.level}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                      style={{ width: `${getSkillBars(skill.level) * 25}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                {project.technologies && (
                  <div className="text-sm text-blue-600 font-medium">
                    Technologies: {project.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Row: Certifications, Languages, Hobbies */}
      <div className="grid grid-cols-3 gap-4">
        {certifications.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-blue-800 mb-3">Certifications</h3>
            <div className="space-y-2 text-sm">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-gray-600">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-blue-800 mb-3">Languages</h3>
            <div className="space-y-1 text-sm">
              {languages.map((lang) => (
                <div key={lang.id}>
                  {lang.name}{lang.level && ` - ${lang.level}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {hobbies.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-blue-800 mb-3">Interests</h3>
            <div className="space-y-1 text-sm">
              {hobbies.map((hobby) => (
                <div key={hobby.id}>{hobby.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
