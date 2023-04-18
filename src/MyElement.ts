import { html, LitElement } from "lit";
import { compileNoirSource } from "./compile_prove_verify";

export class MyElement extends LitElement {
  async __proveButtonClicked() {
    try {
      const main_nr_SourceURL = new URL('../circuits/main.nr', import.meta.url);
      const response = await fetch(main_nr_SourceURL);
      const sourceData = await response.text();
      const compiledSource = await compileNoirSource(sourceData);
      console.log({ compiledSource })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return html` <button @click=${this.__proveButtonClicked}>prove</button> `;
  }
}
