import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import initNoirWasm, { build_info, compile } from "@noir-lang/noir_wasm";

export async function compileNoirSource(noir_source: string) {
  await initNoirWasm();

  console.time("compileNoirSource");
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

    const buildInfo = await build_info();
    console.log("1 - Noir source compilation done.");
    console.timeEnd("compileNoirSource");

    return compiled_noir;
  } catch (e) {
    console.log("Error while compiling:", e);
  }
}
