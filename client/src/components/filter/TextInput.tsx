import { InputText } from "primereact/inputtext";
import { FC } from "react";

interface TextInputProps {
  title: string;
  value: string;
  onChange: (v: string) => void;
}

const TextInput: FC<TextInputProps> = ({ title, value, onChange }) => {
  const selectId = `ms-${title.split(" ")[0].toLowerCase()}`;
  return (
    <span className="p-float-label">
      <InputText
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={selectId}>{title}</label>
    </span>
  );
};

export default TextInput;
