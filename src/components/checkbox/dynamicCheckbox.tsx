import { type FC } from "react";
import styles from "./checkbox.module.scss";
import CheckboxItem from "./checkboxItem";

export interface Category {
  id: number;
  name: string;
  checked: boolean;
  children?: Category[];
}

interface Props {
  data: Category[];
  onToggle: (id: number, status: boolean) => void;
}

const DynamicCheckbox: FC<Props> = ({ data, onToggle }) => {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <CheckboxItem key={item.id} item={item} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default DynamicCheckbox;
