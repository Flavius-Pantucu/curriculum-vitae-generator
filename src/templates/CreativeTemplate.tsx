import React from 'react';
import { CVData } from '../types/cv.types';
import { Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, languages, hobbies } = data;

  return (
    <div className="flex bg-white text-gray-900 min-h-[297mm]">
      {/* Sidebar with gradient */}
      <div className="w-80 bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800 text-white p-8">
        {/* Photo */}
        {personal.photoBase64 && (
          <div className="mb-6">
            <img 
              src={personal.photoBase64} 
              alt="Profile" 
              className="w-full h-64 object-cover rounded-2xl border-4 border-white shadow-2xl"
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-white/30">CONTACT</h3>
          <div className="space-y-3 text-sm">
            {personal.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-white/30">SKILLS</h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-sm font-medium mb-1">{skill.name}</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          level <= ({ beginner: 1, intermediate: 2, advanced: 3, expert: 4 }[skill.level] || 2)
                            ? 'bg-white'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-white/30">LANGUAGES</h3>
            <div className="space-y-2 text-sm">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  {lang.level && <span className="text-white/80">{lang.level}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-white/30">INTERESTS</h3>
            <div className="space-y-1 text-sm">
              {hobbies.map((hobby) => (
                <div key={hobby.id}>• {hobby.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        {/* Name */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {personal.name || 'Your Name'}
          </h1>
          {personal.summary && (
            <p className="text-gray-700 text-sm leading-relaxed mt-4">{personal.summary}</p>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">EXPERIENCE</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-purple-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full" />
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-medium">{exp.company}</span>
                      <span className="text-sm text-gray-600">{exp.dates.from} - {exp.dates.to}</span>
                    </div>
                  </div>
                  {exp.responsibilities && (
                    <p className="text-sm text-gray-700 mb-2">{exp.responsibilities}</p>
                  )}
                  {exp.achievements && (
                    <p className="text-sm text-gray-700 italic">{exp.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">EDUCATION</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="pl-6 border-l-2 border-purple-300">
                  <div className="absolute -left-2 w-4 h-4 bg-purple-600 rounded-full" />
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-purple-600">{edu.school}</span>
                    <span className="text-gray-600">{edu.dates.from} - {edu.dates.to}</span>
                  </div>
                  {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">PROJECTS</h2>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{project.name}</h3>
                  {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                  {project.technologies && (
                    <div className="text-sm text-purple-700 font-medium">
                      {project.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-900">CERTIFICATIONS</h2>
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-purple-600">{cert.issuer}</div>
                  </div>
                  <div className="text-sm text-gray-600">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
