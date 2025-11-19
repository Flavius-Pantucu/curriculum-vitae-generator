import { Input } from "antd";

interface ContactProps {
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    address: string;
    setAddress: (value: string) => void;
}

export const ContactForm = ({ phoneNumber, setPhoneNumber, email, setEmail, address, setAddress }: ContactProps) => {
    const fields: {
        key: "phoneNumber" | "email" | "address";
        label: string;
        value: string;
        setter: (value: string) => void;
        maxLength: number;
    }[] = [
        { key: "phoneNumber", label: "Phone", value: phoneNumber, setter: setPhoneNumber, maxLength: 20 },
        { key: "email", label: "Email", value: email, setter: setEmail, maxLength: 50 },
        { key: "address", label: "Address", value: address, setter: setAddress, maxLength: 50 },
    ];

    return (
        <div className="space-y-3">
            {fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                    <label>{field.label}</label>
                    <Input
                        size="large"
                        value={field.value}
                        showCount
                        maxLength={field.maxLength}
                        onChange={(e) => field.setter(e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};
