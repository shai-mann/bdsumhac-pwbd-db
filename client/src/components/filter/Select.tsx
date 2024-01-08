import { MultiSelect } from "primereact/multiselect";
import { FC } from "react";

interface SelectProps {
  title: string;
  options: any[];
  selectedOptions: any;
  setSelectedOptions: (o: any) => void;
}

const Select: FC<SelectProps> = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const selectId = `ms-${title.toLowerCase()}`;
  return (
    <span className="p-float-label">
      <MultiSelect
        id={selectId}
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.value)}
        options={options}
        filter
        optionLabel="label"
        display="chip"
        virtualScrollerOptions={{ step: 100, itemSize: 43 }}
      />
      <label htmlFor={selectId}>{title}</label>
    </span>
  );
};

export default Select;
