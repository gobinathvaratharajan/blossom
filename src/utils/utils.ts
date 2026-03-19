export type NormalizedNode = {
  label: string;
  value: string | number;
  children?: NormalizedNode[];
  raw?: any;
};

type Config<T> = {
  labelKey: keyof T;
  valueKey: keyof T;
  childrenKey?: keyof T;
};

export function normalizeTree<T>(
  data: T[],
  config: Config<T>,
): NormalizedNode[] {
  const { labelKey, valueKey, childrenKey } = config;

  const normalize = (items: T[]): NormalizedNode[] =>
    items.map((item) => ({
      label: String(item[labelKey]),
      value: item[valueKey] as string | number,
      raw: item,
      children:
        childrenKey && item[childrenKey]
          ? normalize(item[childrenKey] as T[])
          : undefined,
    }));

  return normalize(data);
}
