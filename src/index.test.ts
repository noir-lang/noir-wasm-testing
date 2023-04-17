import { html, fixture, expect } from "@open-wc/testing";

import "../my-element.js";

describe("my-test", () => {
  it("works?", async () => {
    const el: any = await fixture(html` <my-element></my-element> `);
    expect(el.title).to.equal("Hey there");
    expect(el.counter).to.equal(5);
  });
});
