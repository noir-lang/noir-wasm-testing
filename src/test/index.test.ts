import { expect } from "@esm-bundle/chai";
import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import initNoirWasm, { build_info, compile } from "@noir-lang/noir_wasm";


async function getFileContent(path: string): Promise<string> {
  const mainnrSourceURL = new URL(path, import.meta.url);
  const response = await fetch(mainnrSourceURL);
  return await response.text();
}

async function getSource(): Promise<string> {
  return getFileContent('../noir-script/src/main.nr')
}

async function getPrecompiledSource(): Promise<string> {
  const compiledData = await getFileContent('../noir-script/target/noir-script.json');
  return JSON.parse(compiledData).bytecode;
}

export async function compileNoirSource(noir_source: string): Promise<any> {
  await initNoirWasm();

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

    console.log("Noir source compilation done.");

    return compiled_noir.circuit;
  } catch (e) {
    console.log("Error while compiling:", e);
  }
}


describe("noir wasm compilation", () => {
  it("matches nargos compilation", async () => {
    const source = await getSource();

    const wasmCircuitBase64 = await compileNoirSource(source);

    const cliCircuitBase64 = await getPrecompiledSource();

    console.log("wasm", wasmCircuitBase64);

    console.log("cli", cliCircuitBase64);

    console.log("Compilation is a match? ", wasmCircuitBase64 === cliCircuitBase64);

    expect(wasmCircuitBase64).to.equal(cliCircuitBase64);
  }).timeout(10e3);
});
