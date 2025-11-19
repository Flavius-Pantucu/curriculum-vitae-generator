import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Expertise } from "@data/types";

interface ExpertiseProps {
    expertise: Expertise[];
    setExpertise: (items: Expertise[]) => void;
}

export const ExpertiseForm = ({ expertise, setExpertise }: ExpertiseProps) => {
    const handleChange = (idx: number, value: string) => {
        const updated = [...expertise];
        updated[idx].name = value;
        setExpertise(updated);
    };

    const handleRemove = (idx: number) => {
        const updated = expertise.filter((_, i) => i !== idx);
        setExpertise(updated);
    };

    const handleAdd = () => {
        if (expertise.length < 6) {
            setExpertise([...expertise, { name: "" }]);
        }
    };

    return (
        <div>
            <ul className="space-y-3">
                {expertise.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                        <Input
                            size="large"
                            showCount
                            maxLength={30}
                            value={item.name}
                            onChange={(e) => handleChange(idx, e.target.value)}
                        />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemove(idx)}
                            className="rounded-full text-lg"
                        />
                    </li>
                ))}
            </ul>

            <Button type="primary" onClick={handleAdd} disabled={expertise.length >= 6} className="mt-2" block>
                Add Expertise
            </Button>
        </div>
    );
};
