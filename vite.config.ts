import eslint from "vite-plugin-eslint";
import webbundle from "rollup-plugin-webbundle";
import * as wbnSign from "wbn-sign";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default {
  plugins: [
    eslint(),
    webbundle({
      baseURL: new wbnSign.WebBundleId(
        wbnSign.parsePemKey(process.env.ED25519KEY)
      ).serializeWithIsolatedWebAppOrigin(),
      static: { dir: "public" },
      output: "signed.swbn",
      integrityBlockSign: {
        key: process.env.ED25519KEY,
      },
    }),
  ],
};
