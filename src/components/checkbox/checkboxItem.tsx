import { useEffect, useRef } from "react";
import styles from "./checkbox.module.scss";
import type { Category } from "./dynamicCheckbox";

const CheckboxItem = ({
  item,
  onToggle,
}: {
  item: Category;
  onToggle: (id: number, status: boolean) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  // 🔥 Handle indeterminate state
  useEffect(() => {
    if (!item.children) return;

    const allChecked = item.children.every((c) => c.checked);
    const someChecked = item.children.some((c) => c.checked);

    if (ref.current) {
      ref.current.indeterminate = !allChecked && someChecked;
    }
  }, [item]);

  return (
    <div className={styles.item}>
      <label className={styles.label}>
        <input
          ref={ref}
          type="checkbox"
          checked={item.checked}
          onChange={(e) => onToggle(item.id, e.target.checked)}
        />
        {item.name}
      </label>

      {item.children && (
        <div className={styles.children}>
          {item.children.map((child) => (
            <CheckboxItem key={child.id} item={child} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxItem;
