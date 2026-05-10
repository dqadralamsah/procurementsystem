type CodeGeneratorType = {
  prefix: string;
  digits?: number;
  includeYear?: boolean;
  lastEntry?: string | null;
};

export function codeGenerator(option: CodeGeneratorType): string {
  const { prefix, digits = 3, includeYear = false, lastEntry } = option;

  const year = new Date().getFullYear();

  const basePrefix = includeYear ? `${prefix}-${year}-` : `${prefix}-`;

  let nextNumber = 1;

  if (lastEntry) {
    const match = lastEntry.match(/(\d+)$/);

    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  const formattedNumber = String(nextNumber).padStart(digits, '0');

  return `${basePrefix}${formattedNumber}`;
}
