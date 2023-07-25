import { html, LitElement } from "lit";
import { property } from 'lit/decorators.js';
import { compileNoirSource } from "./compile_prove_verify";
import { logElapsedTime } from "./helpers";

export class MyElement extends LitElement {
  @property({ type: Promise })
  promise: Promise<boolean> | undefined = undefined;

  async getFileContent(path: string) {
    const mainnrSourceURL = new URL(path, import.meta.url);
    const response = await fetch(mainnrSourceURL);
    return await response.text();
  }

  async getSource() {
    return await this.getFileContent('../noir-script/src/main.nr')
  }

  async getPrecompiledSource() {
    const compiledData = await this.getFileContent('../noir-script/target/noir-script.json');
    return JSON.parse(compiledData);
  }

  async handleProveButton() {
    this.promise = new Promise(async (resolve, reject) => {
      const timerLabel = "handleProveButton";
      const startTime = performance.now();

      try {
        const source = await this.getSource();
        const compiledSource = await compileNoirSource(source);
        const precompiledSource = await this.getPrecompiledSource();

        const fetchResponse = await fetch('data:application/octet-stream;base64,' + compiledSource.circuit)
        const buffer = await fetchResponse.arrayBuffer();

        const noirWasmOutput = JSON.stringify(buffer);
        const nargoOutput = JSON.stringify(precompiledSource.bytecode || precompiledSource.circuit);

        console.log({ noirWasmOutput, nargoOutput });

        console.log("Compilation is a match? ", noirWasmOutput === nargoOutput);

        resolve(noirWasmOutput === nargoOutput);
      } catch (e) {
        reject(e);
      } finally {
        logElapsedTime(timerLabel, startTime);
      }
    });
  }


  render() {
    return html`<button @click=${this.handleProveButton} />`;
  }
}
