import React from "react";

export const SidebarSection = ({
  profileImage,
  phoneNumber,
  email,
  address,
  education,
  expertise,
  languages,
  references,
}) => {
  return (
    <div className="flex-1 bg-[#323B4C] w-full h-full text-white tracking-wider">
      <div className="flex flex-col w-full h-full">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={profileImage}
            alt="profile"
            className="rounded-full w-40 h-40"
          ></img>
        </div>
        <div className="flex-1 flex flex-col ml-10 gap-y-4">
          <div className="border-b border-white w-full pb-2">
            <h1 className="font-semibold text-2xl font-mono tracking-tight">
              Contact
            </h1>
          </div>
          <div className="flex flex-col gap-y-3 pr-1">
            <div className="flex flex-col">
              <span className="font-semibold text-md">Phone</span>
              <span className="font-light text-xs text-grey-400 break-all">
                {phoneNumber}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-md">Email</span>
              <span className="font-light text-xs text-grey-400 break-all">
                {email}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-md">Address</span>
              <span className="font-light text-xs text-grey-400 break-all">
                {address}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col ml-10 gap-y-4">
          <div className="border-b border-white w-full pb-2">
            <h1 className="font-semibold text-2xl font-mono tracking-tight">
              Education
            </h1>
          </div>
          <div className="flex flex-col gap-y-3">
            {education.map((edu, index) => (
              <div className="flex flex-col gap-y-1 pr-1" key={index}>
                <span className="font-light text-xs">{edu.year}</span>
                <span className="font-semibold text-xs/3">
                  {edu.institution}
                </span>
                <span className="font-light text-xs/3">{edu.degree}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col ml-10 gap-y-4">
          <div className="border-b border-white w-full pb-2">
            <h1 className="font-semibold text-2xl font-mono tracking-tight">
              Expertise
            </h1>
          </div>
          <div className="flex flex-col gap-y-3">
            <ul className="list-none flex flex-col gap-y-2 pr-1">
              {expertise.map((item, index) => (
                <li className="text-sm font-light" key={index}>
                  <span className="mr-2">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col ml-10 gap-y-4">
          <div className="border-b border-white w-full pb-2">
            <h1 className="font-semibold text-2xl font-mono tracking-tight">
              Language
            </h1>
          </div>
          <div className="flex flex-col gap-y-3 pr-1">
            {languages.map((lang, index) => (
              <div className="flex flex-col" key={index}>
                <span className="font-semibold text-sm">{lang.name}</span>
                <span className="font-light text-xs leading-none">
                  {lang.fluency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
