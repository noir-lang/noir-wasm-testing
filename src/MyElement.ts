import { html, LitElement } from "lit";
import { property } from 'lit/decorators.js';
import { compileNoirSource } from "./compile_prove_verify";

export class MyElement extends LitElement {
  @property({ type: Promise })
  promise: Promise<boolean> | undefined = undefined;

  async getFileContent(path: string) {
    const mainnrSourceURL = new URL(path, import.meta.url);
    const response = await fetch(mainnrSourceURL);
    return await response.text();
  }

  async getSource() {
    return await this.getFileContent('./nargo-compiler/src/main.nr')
  }

  async getPrecompiledSource() {
    const compiledData = await this.getFileContent('./nargo-compiler/target/nargo-compiler.json');
    return JSON.parse(compiledData);
  }

  async handleProveButton() {
    this.promise = new Promise(async (resolve, reject) => {
      try {
        const source = await this.getSource();
        const compiledSource = await compileNoirSource(source);
        const precompiledSource = await this.getPrecompiledSource();

        const compiled = JSON.stringify(compiledSource.circuit);
        const precompiled = JSON.stringify(precompiledSource.circuit);

        console.log({ compiled, precompiled })

        console.log("Compilation is a match? ", compiled === precompiled)

        resolve(compiled === precompiled);
      } catch (e) {
        reject(e)
      }
    });
  }

  render() {
    return html`<button @click=${this.handleProveButton} />`;
  }
}
