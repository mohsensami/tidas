import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Issue = { path?: (string | number)[]; message?: string; [k: string]: any };
export function formatError(err: any): string {
  const fromIssues = (issues: any[]) => {
    return issues
      .map((issue) => issue?.message)
      .filter(Boolean)
      .join(". ");
  };

  if (Array.isArray(err)) return fromIssues(err);

  if (Array.isArray(err?.errors)) return fromIssues(err.errors);
  if (Array.isArray(err?.issues)) return fromIssues(err.issues);

  if (err?.name === "PrismaClientKnownRequestError" && err?.code === "P2002") {
    const target = err.meta?.target;
    const field = Array.isArray(target) ? target[0] : target || "Field";
    const f = String(field);
    return `${f.charAt(0).toUpperCase()}${f.slice(1)} already exists`;
  }

  if (typeof err?.message === "string") return err.message;
  if (err instanceof Error && err.message) return err.message;

  return "An unknown error occurred";
}

// Round to 2 decimal places
export const round2 = (value: number | string) => {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100; // avoid rounding errors
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("value is not a number nor a string");
  }
};
