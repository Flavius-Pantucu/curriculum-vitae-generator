import React from 'react';
import { CVData } from '../types/cv.types';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, languages, hobbies } = data;

  return (
    <div className="flex bg-white text-gray-900 min-h-[297mm]" style={{ fontFamily: 'Garamond, serif' }}>
      {/* Left Column - 40% */}
      <div className="w-2/5 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-10">
        {/* Photo - Prominent */}
        {personal.photoBase64 && (
          <div className="mb-8">
            <img 
              src={personal.photoBase64} 
              alt="Profile" 
              className="w-full h-80 object-cover rounded-sm shadow-2xl border-4 border-amber-600"
            />
          </div>
        )}

        {/* Name Header */}
        <div className="mb-8 pb-6 border-b border-amber-600/50">
          <h1 className="text-4xl font-bold mb-2 text-amber-500" style={{ letterSpacing: '0.05em' }}>
            {personal.name || 'Your Name'}
          </h1>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Contact</h3>
          <div className="space-y-3 text-sm">
            {personal.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-start gap-3">
                <Linkedin className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <span className="break-all">{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Core Competencies</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-xs text-amber-500 uppercase">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Languages</h3>
            <div className="space-y-2 text-sm">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span>{lang.name}</span>
                  {lang.level && <span className="text-amber-500">{lang.level}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Certifications</h3>
            <div className="space-y-3 text-sm">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-gray-300 text-xs">{cert.issuer}</div>
                  <div className="text-amber-500 text-xs">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <div>
            <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Interests</h3>
            <div className="space-y-1 text-sm">
              {hobbies.map((hobby) => (
                <div key={hobby.id}>• {hobby.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - 60% */}
      <div className="flex-1 p-12">
        {/* Professional Summary */}
        {personal.summary && (
          <div className="mb-10 pb-6 border-b-2 border-amber-600">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed italic">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 pb-2 border-b-2 border-amber-600">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-amber-700 font-semibold text-lg">{exp.company}</span>
                      <span className="text-sm text-gray-600 italic">{exp.dates.from} – {exp.dates.to}</span>
                    </div>
                  </div>
                  {exp.responsibilities && (
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {exp.responsibilities}
                    </p>
                  )}
                  {exp.achievements && (
                    <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        <span className="font-semibold text-amber-800">Key Achievements: </span>
                        {exp.achievements}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 pb-2 border-b-2 border-amber-600">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-slate-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-amber-700 font-semibold">{edu.school}</span>
                    <span className="text-sm text-gray-600 italic">{edu.dates.from} – {edu.dates.to}</span>
                  </div>
                  {edu.gpa && (
                    <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 pb-2 border-b-2 border-amber-600">
              Notable Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 mb-2 leading-relaxed">{project.description}</p>
                  )}
                  {project.technologies && (
                    <div className="text-sm">
                      <span className="font-semibold text-amber-800">Technologies: </span>
                      <span className="text-gray-700">{project.technologies}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
