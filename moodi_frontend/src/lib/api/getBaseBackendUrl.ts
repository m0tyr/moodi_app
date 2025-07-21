export function getBaseBackendUrl(): string {
  return `${process.env.NEXT_PUBLIC_DEV_BACKEND_URL}`;
}
