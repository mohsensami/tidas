import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

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

// Formatter برای ریال (چون Intl تومان رو ساپورت نمی‌کنه)
const RIAL_FORMATTER = new Intl.NumberFormat("fa-IR", {
  currency: "IRR",
  style: "currency",
  minimumFractionDigits: 0, // معمولا اعشار نداریم
});

// تبدیل به تومان و فرمت کردن
export function formatCurrency(amount: number | string | null) {
  if (amount == null) return "NaN";
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (isNaN(value)) return "NaN";
  // تبدیل ریال به تومان
  const tomanValue = value / 10;
  // فرمت و جایگزینی "ریال" با "تومان"
  return RIAL_FORMATTER.format(tomanValue).replace("ریال", "تومان");
}

// Shorten ID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Form Pagination Links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true }
  );
}

//  Format Numbers
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
