import { useState } from "react";
import { Button } from "./components";
import Checkbox from "./components/checkbox/checkbox";
import { TreeSelect } from "./components/tree-select/tree-select";
import { initialCategories } from "./data/data";
import type { Category } from "./components/checkbox/dynamicCheckbox";
import { MultiSelect } from "./components/multiselect/multiselect";
import { normalizeTree } from "./utils/utils";

function App() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [value, setValue] = useState<string[]>([]);

  const normalized = normalizeTree(initialCategories, {
    labelKey: "name",
    valueKey: "id",
    childrenKey: "children",
  });

  return (
    <>
      <h2>Button</h2>
      <Button intent="secondary">Secondary</Button>
      <Button intent="outline">Outline</Button>
      <Button intent="ghost">Ghost</Button>
      <Button leftIcon="🔥">Fire</Button>

      <Button rightIcon="➡️">Next</Button>
      <Button disabled>Disabled</Button>
      <Button loading />

      <Button leftIcon="👈" rightIcon="👉">
        Both Icons
      </Button>
      <Button intent="primary" size="large" fullWidth leftIcon="🔐">
        Login
      </Button>
      <hr />
      <h2>Nested Category Tree</h2>
      <Checkbox />
      <hr />
      <h2>Tree Select</h2>
      <TreeSelect data={categories} onChange={setCategories} />
      <hr />

      <h2>Multi Select</h2>

      <MultiSelect data={normalized} value={value} onChange={setValue} />
    </>
  );
}

export default App;
