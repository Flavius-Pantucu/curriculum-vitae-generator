import React from "react";
import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const Education = ({ education, setEducation }) => {
  const handleChange = (idx, field, value) => {
    const updated = [...education];
    updated[idx][field] = value;
    setEducation(updated);
  };

  const handleAdd = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const handleRemove = (idx) => {
    const updated = education.filter((_, i) => i !== idx);
    setEducation(updated);
  };

  return (
    <div>
      {education.map((edu, idx) => (
        <div
          key={idx}
          className="mb-4 border-2 p-4 border-gray-700 rounded-xl space-y-3 relative"
        >
          <div className="space-y-1.5">
            <label>Degree</label>
            <Input
              size="large"
              showCount
              maxLength={75}
              value={edu.degree}
              onChange={(e) => handleChange(idx, "degree", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Institution</label>
            <Input
              size="large"
              showCount
              maxLength={75}
              value={edu.institution}
              onChange={(e) => handleChange(idx, "institution", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Year</label>
            <Input
              size="large"
              showCount
              maxLength={20}
              value={edu.year}
              onChange={(e) => handleChange(idx, "year", e.target.value)}
            />
          </div>
          {education.length > 1 && (
            <Button
              color="red"
              variant="text"
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 !m-0 rounded-full"
            />
          )}
        </div>
      ))}

      <Button
        variant="filled"
        disabled={education.length === 3}
        color="green"
        onClick={handleAdd}
        block
      >
        Add Education
      </Button>
    </div>
  );
};
