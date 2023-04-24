# noir-wasm-testing

This repository contains a GitHub workflow that tests that [noir_wasm](https://github.com/noir-lang/noir_wasm) is compiling a matching result to nargo. The workflow uses `nargo` to compile a Noir (.nr) source file and then runs a test that uses the `noir_wasm` package to compile the same source file. The test passes if both outputs match.

## Running the Tests

1. Clone this repository to your local machine.
2. Open a terminal in the cloned directory.
3. Run `yarn` to install the dependencies.
4. Manually use `nargo` to compile the source file located at `src/noir-script/`.
5. Run `yarn test` to run the tests.

## Workflow

The GitHub workflow is triggered when a commit is pushed to the `main` branch. The workflow consists of the following steps:

1. Download and install `nargo`.
2. Compile the Noir (.nr) source file using `nargo`.
3. Use `noir_wasm` to compile the same source file.
4. Compare the outputs of the two compilations and pass the test if they match.
