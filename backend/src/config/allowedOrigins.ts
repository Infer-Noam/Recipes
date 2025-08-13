const VITE_DEV_PORT = process.env.VITE_DEV_PORT;
const VITE_PREVIEW_PORT = process.env.VITE_PREVIEW_PORT;

const allowedOrigins: string[] = [];

if (VITE_DEV_PORT) {
  allowedOrigins.push(`http://localhost:${VITE_DEV_PORT}`);
}

if (VITE_PREVIEW_PORT) {
  allowedOrigins.push(`http://localhost:${VITE_PREVIEW_PORT}`);
}

export default allowedOrigins;
