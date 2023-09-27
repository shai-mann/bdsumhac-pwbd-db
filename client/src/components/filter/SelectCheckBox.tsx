import { Checkbox } from "primereact/checkbox";
import { FC } from "react";

interface SelectCheckBoxProps {
  id: string;
  title: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const SelectCheckBox: FC<SelectCheckBoxProps> = ({
  id,
  title,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <Checkbox
        inputId={id}
        onChange={(e) => onChange(e.checked || false)}
        checked={checked}
      />
      <label htmlFor="pwbd" className="ml-2">
        {title}
      </label>
    </div>
  );
};

export default SelectCheckBox;
