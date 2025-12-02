import { spawnSync } from "child_process";

// 
const status = spawnSync("npx", ["husky", "install"], {
    stdio: "inherit"
}).status;

process.exit(status === 0 ? 0 : 1);
