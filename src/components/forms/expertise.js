import React from "react";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const Expertise = ({ expertise, setExpertise }) => (
  <div>
    <ul className="space-y-3">
      {expertise.map((item, idx) => (
        <li key={idx} className="flex items-center space-y-2">
          <Input
            size="large"
            showCount
            maxLength={30}
            value={item}
            onChange={(e) => {
              const updated = [...expertise];
              updated[idx] = e.target.value;
              setExpertise(updated);
            }}
          />
          <Button
            color="red"
            variant="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              const updated = expertise.filter((_, i) => i !== idx);
              setExpertise(updated);
            }}
            className="ml-2 rounded-full text-lg"
          />
        </li>
      ))}
    </ul>
    <Button
      variant="filled"
      color="green"
      disabled={expertise.length === 6}
      className="mt-2"
      onClick={() => setExpertise([...expertise, ""])}
      block
    >
      Add Expertise
    </Button>
  </div>
);
