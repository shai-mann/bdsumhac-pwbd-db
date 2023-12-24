import { Dropdown } from "primereact/dropdown";
import { FC } from "react";

interface SingleSelectProps {
  title: string;
  options: any[];
  selectedOption: any;
  setSelectedOption: (o: any) => void;
}

const SingleSelect: FC<SingleSelectProps> = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const selectId = `ms-${title.toLowerCase()}`;
  return (
    <span className="p-float-label">
      <Dropdown
        id={selectId}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.value)}
        options={options}
        optionLabel="label"
        showClear
      />
      <label htmlFor={selectId}>{title}</label>
    </span>
  );
};

export default SingleSelect;
