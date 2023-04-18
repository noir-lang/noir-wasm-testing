import { html, fixture } from "@open-wc/testing";

import "../my-element.js";

describe("my-test", () => {
  it("works?", async () => {
    const el: any = await fixture(html` <my-element></my-element> `);
    el.shadowRoot.querySelector("button").click();
    await new Promise((r) => setTimeout(r, 30000));
  });
});
