import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./multiSelect.module.scss";
import type { NormalizedNode } from "../../utils/utils";

interface Props {
  data: NormalizedNode[];
  value: (string | number)[];
  onChange: (val: (string | number)[]) => void;
  placeholder?: string;
}

export const MultiSelect = ({
  data,
  value,
  onChange,
  placeholder = "Select...",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // 🔥 Close outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔥 Toggle logic
  const toggle = (node: NormalizedNode, checked: boolean) => {
    let newValues = [...value];

    const collectAll = (n: NormalizedNode): (string | number)[] => {
      let vals = [n.value];
      if (n.children) {
        n.children.forEach((c) => {
          vals = vals.concat(collectAll(c));
        });
      }
      return vals;
    };

    const allValues = collectAll(node);

    if (checked) {
      newValues = Array.from(new Set([...newValues, ...allValues]));
    } else {
      newValues = newValues.filter((v) => !allValues.includes(v));
    }

    onChange(newValues);
  };

  // 🔥 Selected labels
  const getLabels = (nodes: NormalizedNode[]): string[] => {
    let result: string[] = [];

    nodes.forEach((node) => {
      if (value.includes(node.value)) {
        result.push(node.label);
      } else if (node.children) {
        result = result.concat(getLabels(node.children));
      }
    });

    return result;
  };

  const selectedLabels = getLabels(data);

  // 🔥 Filter
  const filterTree = (nodes: NormalizedNode[]): NormalizedNode[] => {
    return nodes
      .map((node) => {
        const match = node.label.toLowerCase().includes(search.toLowerCase());

        if (node.children) {
          const filteredChildren = filterTree(node.children);
          if (match || filteredChildren.length) {
            return { ...node, children: filteredChildren };
          }
        }

        return match ? node : null;
      })
      .filter(Boolean) as NormalizedNode[];
  };

  const filteredData = useMemo(() => filterTree(data), [search, data]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.trigger} onClick={() => setOpen(!open)}>
        {selectedLabels.length ? (
          selectedLabels.slice(0, 3).map((label) => (
            <span key={label} className={styles.tag}>
              {label}
            </span>
          ))
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <input
            className={styles.search}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredData.map((node) => (
            <TreeNode
              key={node.value}
              node={node}
              value={value}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeNode = ({
  node,
  value,
  toggle,
}: {
  node: NormalizedNode;
  value: (string | number)[];
  toggle: (node: NormalizedNode, checked: boolean) => void;
}) => {
  const checked = value.includes(node.value);

  return (
    <div className={styles.item}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => toggle(node, e.target.checked)}
        />
        {node.label}
      </label>

      {node.children && (
        <div className={styles.children}>
          {node.children.map((child) => (
            <TreeNode
              key={child.value}
              node={child}
              value={value}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
