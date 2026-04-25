const generatedIds = new Set<string>();

export interface GenerateUniqueIdOptionsInterface {
  readonly prefix?: string;
  readonly min?: number;
  readonly max?: number;
}

export const generateUniqueId = (options?: GenerateUniqueIdOptionsInterface): string => {
  const prefix = options?.prefix ?? 'id';
  const min = options?.min ?? 10000;
  const max = options?.max ?? 99999;
  let nextId = '';

  do {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    nextId = `${prefix}-${randomNumber}`;
  } while (generatedIds.has(nextId));

  generatedIds.add(nextId);
  return nextId;
};
