import React from "react";
import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const Languages = ({ languages, setLanguages }) => {
  const handleChange = (idx, field, value) => {
    const updated = [...languages];
    updated[idx][field] = value;
    setLanguages(updated);
  };

  const handleAdd = () => {
    setLanguages([...languages, { name: "", fluency: "" }]);
  };

  const handleRemove = (idx) => {
    const updated = languages.filter((_, i) => i !== idx);
    setLanguages(updated);
  };

  return (
    <div>
      {languages.map((lang, idx) => (
        <div
          key={idx}
          className="mb-4 border-2 p-4 border-gray-700 rounded-xl space-y-3 relative"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold">Name</label>
            <Input
              size="large"
              showCount
              maxLength={20}
              value={lang.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              placeholder="Language name"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold">Fluency</label>
            <Input
              size="large"
              showCount
              maxLength={20}
              value={lang.fluency}
              onChange={(e) => handleChange(idx, "fluency", e.target.value)}
              placeholder="Fluency (e.g. Native, Intermediate)"
            />
          </div>

          {languages.length > 1 && (
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
        disabled={languages.length === 3}
        color="green"
        onClick={handleAdd}
        block
      >
        Add Language
      </Button>
    </div>
  );
};
