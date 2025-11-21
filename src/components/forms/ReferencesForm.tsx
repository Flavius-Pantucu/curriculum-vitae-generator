import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

interface Reference {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

interface ReferencesProps {
  references: Reference[];
  setReferences: (refs: Reference[]) => void;
}

export const ReferencesForm = ({
  references,
  setReferences,
}: ReferencesProps) => {
  const handleChange = (idx: number, field: keyof Reference, value: string) => {
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

  const handleRemove = (idx: number) => {
    const updated = references.filter((_, i) => i !== idx);
    setReferences(updated);
  };

  const fields: (keyof Reference)[] = [
    "name",
    "title",
    "company",
    "email",
    "phone",
  ];
  const labels: Record<keyof Reference, string> = {
    name: "Name",
    title: "Title",
    company: "Company",
    email: "Email",
    phone: "Phone",
  };

  return (
    <div>
      {references.map((ref, idx) => (
        <div
          key={idx}
          className="mb-4 border-2 p-4 border-gray-700 rounded-xl space-y-3 relative"
        >
          {fields.map((field) => (
            <div key={field} className="space-y-1.5">
              <label>{labels[field]}</label>
              <Input
                size="large"
                showCount
                maxLength={50}
                value={ref[field]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, field, e.target.value)
                }
              />
            </div>
          ))}

          {references.length > 1 && (
            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 !m-0 rounded-full"
            />
          )}
        </div>
      ))}

      <Button
        type="primary"
        disabled={references.length >= 2}
        onClick={handleAdd}
        block
      >
        Add Reference
      </Button>
    </div>
  );
};
