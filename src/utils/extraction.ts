import { omit } from "lodash";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractField<T, K extends keyof T>(
  data: T[],
  field: K,
): T[K] extends Array<infer U> ? U[] : never[] {
  const result: any = [];
  data.forEach((item) => {
    const value = item[field];
    if (Array.isArray(value) && value.length > 0) {
      result.push(...value);
    }
  });
  return result;
}

export function removePropertiesLodash<T extends object, K extends keyof T>(
  data: T[],
  keys: K[],
): Array<Omit<T, K>> {
  return data.map((item) => omit(item, keys) as Omit<T, K>);
}

export function filterCompaniesById<T extends { cmpId: string }>(
  ids: string[],
  objects: T[],
): T[] {
  if (ids.length === 0) {
    return objects;
  }
  return objects.filter((obj) => ids.includes(obj.cmpId));
}
