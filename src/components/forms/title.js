import { Input } from "antd";

const { TextArea } = Input;

export const Title = ({
  name,
  setName,
  position,
  setPosition,
  description,
  setDescription,
}) => {
  return (
    <form className="space-y-3">
      <div className="space-y-1.5">
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          size="large"
          showCount
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="position">Job Position:</label>
        <Input
          type="text"
          id="position"
          name="position"
          size="large"
          showCount
          maxLength={40}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="description">Profile Description:</label>
        <TextArea
          type="text"
          autoSize={{ minRows: 3, maxRows: 6 }}
          id="description"
          name="description"
          size="large"
          showCount
          maxLength={400}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
};
