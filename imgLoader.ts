import nextConfig from "./next.config";
import path from "path";

export default function loader({ src }: { src: string }) {
  const { basePath } = nextConfig;
  if (basePath && path.isAbsolute(src)) {
    return `${basePath}${src}`;
  }
  return src;
}
