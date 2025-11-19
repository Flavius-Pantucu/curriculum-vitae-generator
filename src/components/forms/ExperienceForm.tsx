import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const MAX_LINES = 8;

interface ExperienceItem {
    jobTitle: string;
    company: string;
    years: string;
    description: string;
}

interface ExperienceProps {
    experience: ExperienceItem[];
    setExperience: (items: ExperienceItem[]) => void;
}

export const ExperienceForm = ({ experience, setExperience }: ExperienceProps) => {
    const handleChange = (idx: number, field: keyof ExperienceItem, value: string) => {
        if (field === "description") {
            const lineCount = value.split("\n").length;
            if (lineCount > MAX_LINES) return;
        }
        const updated = [...experience];
        updated[idx][field] = value;
        setExperience(updated);
    };

    const handleAdd = () => {
        setExperience([...experience, { jobTitle: "", company: "", years: "", description: "" }]);
    };

    const handleRemove = (idx: number) => {
        const updated = experience.filter((_, i) => i !== idx);
        setExperience(updated);
    };

    const fields: {
        key: keyof ExperienceItem;
        label: string;
        maxLength: number;
        isTextArea?: boolean;
        rows?: number;
        autoSize?: { minRows: number; maxRows: number };
    }[] = [
        { key: "jobTitle", label: "Job Title", maxLength: 100 },
        { key: "company", label: "Company", maxLength: 100 },
        { key: "years", label: "Years", maxLength: 50 },
        {
            key: "description",
            label: "Description",
            maxLength: 1500,
            isTextArea: true,
            rows: 6,
            autoSize: { minRows: 4, maxRows: 6 },
        },
    ];

    return (
        <div>
            {experience.map((exp, idx) => (
                <div key={idx} className="mb-4 border-2 p-4 pb-8 border-gray-700 rounded-xl space-y-3 relative">
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-1.5">
                            <label>{field.label}</label>
                            {field.isTextArea ? (
                                <TextArea
                                    size="large"
                                    showCount
                                    maxLength={field.maxLength}
                                    rows={field.rows}
                                    autoSize={field.autoSize}
                                    value={exp[field.key]}
                                    onChange={(e) => handleChange(idx, field.key, e.target.value)}
                                />
                            ) : (
                                <Input
                                    size="large"
                                    showCount
                                    maxLength={field.maxLength}
                                    value={exp[field.key]}
                                    onChange={(e) => handleChange(idx, field.key, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    {experience.length > 1 && (
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

            <Button type="primary" onClick={handleAdd} block>
                Add Experience
            </Button>
        </div>
    );
};
