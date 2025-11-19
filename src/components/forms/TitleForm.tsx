import { Input } from "antd";

const { TextArea } = Input;

interface TitleProps {
    name: string;
    setName: (value: string) => void;
    position: string;
    setPosition: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
}

export const TitleForm = ({ name, setName, position, setPosition, description, setDescription }: TitleProps) => {
    const fields = [
        {
            label: "Name:",
            id: "name",
            value: name,
            onChange: setName,
            maxLength: 30,
            isTextArea: false,
        },
        {
            label: "Job Position:",
            id: "position",
            value: position,
            onChange: setPosition,
            maxLength: 40,
            isTextArea: false,
        },
        {
            label: "Profile Description:",
            id: "description",
            value: description,
            onChange: setDescription,
            maxLength: 400,
            isTextArea: true,
            autoSize: { minRows: 3, maxRows: 6 },
        },
    ];

    return (
        <form className="space-y-3">
            {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                    <label htmlFor={field.id}>{field.label}</label>

                    {field.isTextArea ? (
                        <TextArea
                            id={field.id}
                            value={field.value}
                            showCount
                            maxLength={field.maxLength}
                            autoSize={field.autoSize}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    ) : (
                        <Input
                            id={field.id}
                            value={field.value}
                            size="large"
                            showCount
                            maxLength={field.maxLength}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    )}
                </div>
            ))}
        </form>
    );
};
