import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default class Ultstools {
  /**
   * Combine multiple class values using clsx + tailwind-merge
   * to dedupe and optimize Tailwind CSS utility classes.
   *
   * @param inputs - Array of class values (strings, arrays, objects)
   * @returns A merged class string
   */
  static cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
  }

}
