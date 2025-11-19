import { Input, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

interface Language {
    name: string;
    fluency: string;
}

interface LanguagesProps {
    languages: Language[];
    setLanguages: (langs: Language[]) => void;
}

export const LanguagesForm = ({ languages, setLanguages }: LanguagesProps) => {
    const handleChange = (idx: number, field: keyof Language, value: string) => {
        const updated = [...languages];
        updated[idx][field] = value;
        setLanguages(updated);
    };

    const handleAdd = () => {
        if (languages.length < 3) {
            setLanguages([...languages, { name: "", fluency: "" }]);
        }
    };

    const handleRemove = (idx: number) => {
        const updated = languages.filter((_, i) => i !== idx);
        setLanguages(updated);
    };

    const fields = [
        { key: "name", label: "Name", maxLength: 20, placeholder: "Language name" },
        { key: "fluency", label: "Fluency", maxLength: 20, placeholder: "Fluency level" },
    ];

    return (
        <div>
            {languages.map((lang, idx) => (
                <div key={idx} className="mb-4 p-4 border rounded-xl relative space-y-3">
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-1.5">
                            <label className="block text-xs font-semibold">{field.label}</label>
                            <Input
                                size="large"
                                showCount
                                maxLength={field.maxLength}
                                value={lang[field.key as keyof Language]}
                                placeholder={field.placeholder}
                                onChange={(e) => handleChange(idx, field.key as keyof Language, e.target.value)}
                            />
                        </div>
                    ))}
                    {languages.length > 1 && (
                        <Button
                            type="text"
                            danger
                            icon={<MinusCircleOutlined />}
                            onClick={() => handleRemove(idx)}
                            className="absolute top-1 right-1 rounded-full"
                        />
                    )}
                </div>
            ))}

            <Button type="primary" onClick={handleAdd} disabled={languages.length >= 3} block>
                Add Language
            </Button>
        </div>
    );
};
