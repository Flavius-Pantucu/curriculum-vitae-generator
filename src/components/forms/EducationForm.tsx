import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

interface EducationItem {
    degree: string;
    institution: string;
    year: string;
}

interface EducationProps {
    education: EducationItem[];
    setEducation: (items: EducationItem[]) => void;
}

export const EducationForm = ({ education, setEducation }: EducationProps) => {
    const handleChange = (idx: number, field: keyof EducationItem, value: string) => {
        const updated = [...education];
        updated[idx][field] = value;
        setEducation(updated);
    };

    const handleAdd = () => {
        if (education.length < 3) {
            setEducation([...education, { degree: "", institution: "", year: "" }]);
        }
    };

    const handleRemove = (idx: number) => {
        const updated = education.filter((_, i) => i !== idx);
        setEducation(updated);
    };

    const fields: {
        key: keyof EducationItem;
        label: string;
        maxLength: number;
    }[] = [
        { key: "degree", label: "Degree", maxLength: 75 },
        { key: "institution", label: "Institution", maxLength: 75 },
        { key: "year", label: "Year", maxLength: 20 },
    ];

    return (
        <div>
            {education.map((edu, idx) => (
                <div key={idx} className="mb-4 border-2 p-4 border-gray-700 rounded-xl space-y-3 relative">
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-1.5">
                            <label>{field.label}</label>
                            <Input
                                size="large"
                                showCount
                                maxLength={field.maxLength}
                                value={edu[field.key]}
                                onChange={(e) => handleChange(idx, field.key, e.target.value)}
                            />
                        </div>
                    ))}

                    {education.length > 1 && (
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

            <Button type="primary" onClick={handleAdd} disabled={education.length >= 3} block>
                Add Education
            </Button>
        </div>
    );
};
