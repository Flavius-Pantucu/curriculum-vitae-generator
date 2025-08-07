import React from "react";
import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const MAX_LINES = 8;

export const Experience = ({ experience, setExperience }) => {
  const handleAdd = () => {
    setExperience([
      ...experience,
      { jobTitle: "", company: "", years: "", description: "" },
    ]);
  };

  const handleRemove = (idx) => {
    const updated = experience.filter((_, i) => i !== idx);
    setExperience(updated);
  };

  const handleChange = (idx, field, value) => {
    if (field === "description") {
      const lineCount = value.split("\n").length;
      if (lineCount > MAX_LINES) return; // Prevent adding more lines than allowed
    }
    const updated = [...experience];
    updated[idx][field] = value;
    setExperience(updated);
  };

  return (
    <div>
      {experience.map((exp, idx) => (
        <div
          key={idx}
          className="mb-4 border-2 p-4 pb-8 border-gray-700 rounded-xl space-y-3 relative"
        >
          <div className="space-y-1.5">
            <label>Job Title</label>
            <Input
              value={exp.jobTitle}
              size="large"
              showCount
              maxLength={50}
              onChange={(e) => handleChange(idx, "jobTitle", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Company</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={exp.company}
              onChange={(e) => handleChange(idx, "company", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Years</label>
            <Input
              size="large"
              showCount
              maxLength={30}
              value={exp.years}
              onChange={(e) => handleChange(idx, "years", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Description</label>
            <TextArea
              size="large"
              showCount
              maxLength={500}
              rows={6}
              autoSize={{ minRows: 4, maxRows: 6 }}
              value={exp.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
            />
          </div>
          {experience.length > 1 && (
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
      <Button variant="filled" color="green" onClick={handleAdd} block>
        Add Experience
      </Button>
    </div>
  );
};
