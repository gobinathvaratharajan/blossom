import { useState, useRef, useEffect } from "react";
import DynamicCheckbox, { type Category } from "../checkbox/dynamicCheckbox";
import styles from "./tree-select.module.scss";

interface Props {
  data: Category[];
  onChange: (tree: Category[]) => void;
  placeholder?: string;
}

export const TreeSelect = ({
  data,
  onChange,
  placeholder = "Select...",
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 🔥 Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔥 Update children recursively
  const updateChildren = (items: Category[], status: boolean): Category[] =>
    items.map((item) => ({
      ...item,
      checked: status,
      children: item.children
        ? updateChildren(item.children, status)
        : undefined,
    }));

  // 🔥 Update parent based on children
  const updateParent = (items: Category[]): Category[] =>
    items.map((item) => {
      if (!item.children) return item;

      const updatedChildren = updateParent(item.children);

      const allChecked = updatedChildren.every((c) => c.checked);

      return {
        ...item,
        checked: allChecked,
        children: updatedChildren,
      };
    });

  const handleToggle = (id: number, checked: boolean) => {
    const updateTree = (items: Category[]): Category[] =>
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked,
            children: item.children
              ? updateChildren(item.children, checked)
              : undefined,
          };
        }

        return {
          ...item,
          children: item.children ? updateTree(item.children) : undefined,
        };
      });

    const updated = updateParent(updateTree(data));

    onChange(updated); // 🔥 important
  };

  // 🔥 Labels
  const getSelectedLabels = (items: Category[]): string[] => {
    let result: string[] = [];

    items.forEach((item) => {
      if (item.checked) {
        result.push(item.name);
      } else if (item.children) {
        result = result.concat(getSelectedLabels(item.children));
      }
    });

    return result;
  };

  const labels = getSelectedLabels(data);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.trigger} onClick={() => setOpen(!open)}>
        <span className={labels.length ? styles.selected : styles.placeholder}>
          {labels.length
            ? labels.slice(0, 2).join(", ") + (labels.length > 2 ? "..." : "")
            : placeholder}
        </span>
        ▼
      </div>

      {open && (
        <div className={styles.dropdown}>
          <DynamicCheckbox data={data} onToggle={handleToggle} />
        </div>
      )}
    </div>
  );
};
