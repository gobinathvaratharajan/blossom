import { useState } from "react";
import DynamicCheckbox, { type Category } from "./dynamicCheckbox";
import { initialCategories } from "../../data/data";

function Checkbox() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

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
  const updateParent = (items: Category[]): Category[] => {
    return items.map((item) => {
      if (!item.children) return item;

      const updatedChildren = updateParent(item.children);

      const allChecked = updatedChildren.every((c) => c.checked);

      return {
        ...item,
        checked: allChecked,
        children: updatedChildren,
      };
    });
  };

  const toggleChecked = (id: number, status: boolean) => {
    const updateTree = (items: Category[]): Category[] =>
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: status,
            children: item.children
              ? updateChildren(item.children, status)
              : undefined,
          };
        }

        return {
          ...item,
          children: item.children ? updateTree(item.children) : undefined,
        };
      });

    setCategories((prev) => updateParent(updateTree(prev)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <DynamicCheckbox data={categories} onToggle={toggleChecked} />
    </div>
  );
}

export default Checkbox;
