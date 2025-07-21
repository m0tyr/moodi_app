export function getBaseBackendUrl(): string {
  return process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}`
    : `${process.env.NEXT_PUBLIC_DEV_BACKEND_URL}`;
}
