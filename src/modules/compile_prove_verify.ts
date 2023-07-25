import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import initNoirWasm, { build_info, compile } from "@noir-lang/noir_wasm";
import { logElapsedTime } from "./helpers";

export async function compileNoirSource(noir_source: string) {
  await initNoirWasm();

  const timerLabel = "compileNoirSource";
  const startTime = performance.now();

  console.log("Compiling Noir source...");

  initialiseResolver((id: string) => {
    console.log(`Resolving source ${id}`);

    const source = noir_source;

    if (typeof source === "undefined") {
      throw Error(`Could not resolve source for '${id}'`);
    } else {
      return source;
    }
  });

  try {
    const compiled_noir = compile({});

    const response = await fetch('data:application/octet-stream;base64,' + compiled_noir)

    return await response.arrayBuffer();
  } catch (e) {
    console.log("Error while compiling:", e);
  } finally {
    logElapsedTime(timerLabel, startTime);
  }
}
