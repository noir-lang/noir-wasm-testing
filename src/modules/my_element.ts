import { decompressSync } from 'fflate';
import { html, LitElement } from "lit";
import { property } from 'lit/decorators.js';
import { compileNoirSource } from "./compile_prove_verify";
import { logElapsedTime } from "./helpers";

export class MyElement extends LitElement {
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

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async handleProveButton() {
    this.promise = new Promise(async (resolve, reject) => {
      const timerLabel = "handleProveButton";
      const startTime = performance.now();

      try {
        const source = await this.getSource();
        const compiledSource = await compileNoirSource(source);
        const precompiledSource = await this.getPrecompiledSource();

        const buffer = this.base64ToArrayBuffer(compiledSource.circuit);
        const acirBuffer = new Uint8Array(buffer);
        const acirBufferUncompressed = decompressSync(acirBuffer);

        console.log({ acirBufferUncompressed })

        const noirWasmOutput = JSON.stringify(acirBufferUncompressed);
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
