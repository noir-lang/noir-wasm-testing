import { html, LitElement } from "lit";
import { compileNoirSource } from "./compile_prove_verify";

export class MyElement extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "Hey there";
  }

  async __proveButtonClicked() {
    try {
      const compiledSource = await compileNoirSource();
      console.log({ compiledSource });
    } finally {
      console.log("====================================================");
    }
  }

  render() {
    return html` <button @click=${this.__proveButtonClicked}>prove</button> `;
  }
}
