/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import BFilters from "~/components/BFilters.vue";

describe("BFilters", () => {
  const wrapper = mount(BFilters, {
    propsData: {
      open: false,
    },
  });
  it("renders the panel closed", () => {
    expect(wrapper.find(".w-0.overflow-hidden").exists()).toBe(true);
  });
  it("renders the panel open", () => {
    wrapper
      .find("button")
      .trigger("click")
      .then(() => {
        expect(wrapper.find(".p-4").exists()).toBe(true);
        expect(wrapper.find(".w-0.overflow-hidden").exists()).toBe(false);
      });
  });
});
