const VITE_PORT = process.env.VITE_PORT;

const allowedOrigins: string[] = [];

if (VITE_PORT) {
  allowedOrigins.push(`http://localhost:${VITE_PORT}`);
}

export default allowedOrigins;
