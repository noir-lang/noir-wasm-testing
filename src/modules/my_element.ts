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
    return JSON.parse(compiledData).bytecode;
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
        const wasmCircuitBase64 = await compileNoirSource(source);

        const cliCircuitBase64 = await this.getPrecompiledSource();

        console.log("wasm", wasmCircuitBase64);

        console.log("cli", cliCircuitBase64);

        console.log("Compilation is a match? ", wasmCircuitBase64 === cliCircuitBase64);

        resolve(wasmCircuitBase64 === cliCircuitBase64);
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
