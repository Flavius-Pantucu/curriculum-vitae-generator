import React from "react";
import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const References = ({ references, setReferences }) => {
  const handleChange = (idx, field, value) => {
    const updated = [...references];
    updated[idx][field] = value;
    setReferences(updated);
  };

  const handleAdd = () => {
    if (references.length < 2) {
      setReferences([
        ...references,
        { name: "", title: "", company: "", email: "", phone: "" },
      ]);
    }
  };

  const handleRemove = (idx) => {
    const updated = references.filter((_, i) => i !== idx);
    setReferences(updated);
  };

  return (
    <div>
      {references.map((ref, idx) => (
        <div
          key={idx}
          className="mb-4 border-2 p-4 border-gray-700 rounded-xl space-y-3 relative"
        >
          <div className="space-y-1.5">
            <label>Name</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={ref.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Title</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={ref.title}
              onChange={(e) => handleChange(idx, "title", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Company</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={ref.company}
              onChange={(e) => handleChange(idx, "company", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Email</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={ref.email}
              onChange={(e) => handleChange(idx, "email", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label>Phone</label>
            <Input
              size="large"
              showCount
              maxLength={50}
              value={ref.phone}
              onChange={(e) => handleChange(idx, "phone", e.target.value)}
            />
          </div>
          {references.length > 1 && (
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
        color="green"
        disabled={references.length >= 2}
        onClick={handleAdd}
        block
      >
        Add Reference
      </Button>
    </div>
  );
};
