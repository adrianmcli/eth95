import path from "path";
import Bundler from "parcel-bundler";

const parcelOptions = {
  entryFiles: [path.join(__dirname, "./app/index.html")],
  logLevel: 1,
};
const bundler = new Bundler(parcelOptions.entryFiles, parcelOptions);

const clientMiddleware = () => bundler.middleware();

export default clientMiddleware
