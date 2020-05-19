import path from "path";
import Bundler from "parcel-bundler";

const entryFiles = [path.join(__dirname, "./app/index.html")];
const bundler = new Bundler(entryFiles, { logLevel: 1 });

const clientMiddleware = () => bundler.middleware();

export default clientMiddleware;
