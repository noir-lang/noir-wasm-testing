import { html, fixture, expect } from "@open-wc/testing";
import "../../my-element.js";

describe("noir wasm compilation", () => {
  let element: any;

  before(async () => {
    element = await fixture(html`<my-element />`);
    element.shadowRoot.querySelector("button").click();
  })

  it("matches nargos compilation", async () => {
    expect(await element.promise).to.equal(true);
  }).timeout(5e3);
});
