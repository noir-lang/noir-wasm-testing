import initialiseResolver from "@noir-lang/noir-source-resolver";
import initNoirWasm, { compile } from "@noir-lang/noir_wasm";

import prepare_lib_std from "./lib_std";

export async function compileNoirSource(noir_source) {
  await initNoirWasm();

  const mainSourceIdentifier = "main.nr";

  console.log("Compiling Noir source...");

  return prepare_lib_std().then((sources) => {
    sources[mainSourceIdentifier] = noir_source;

    initialiseResolver((id) => {
      console.log(`Resolving source ${id}`);

      const source = sources[id];

      if (typeof source === "undefined") {
        throw Error(`Could not resolve source for '${id}'`);
      } else {
        return source;
      }
    });

    // We're adding standard library of Noir, ie. `dep::std`
    // For now this serves as an example of loading library.
    // Note `dep::std` is going to be embeded and loading `std` this way is not going to be necessary.
    // dependencies.add("std");

    try {
      const compiled_noir = compile({
        // contracts: false,
        // compile_options: {
        //     show_ssa: false,
        //     allow_warnings: false,
        //     show_output: false
        // },
        optional_dependencies_set: ["std"],
      });

      // const buildInfo = await build_info();
      // console.log(buildInfo);

      console.log("Noir source compilation done.");

      return compiled_noir;
    } catch (e) {
      console.log("Error while compiling:", e);
    }
  });
}
