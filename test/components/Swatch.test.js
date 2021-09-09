/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import Swatch from "@/components/Swatch.vue";

describe("Swatch", () => {
  const wrapper = mount(Swatch, {
    stubs: {
      NuxtLink: true
    },
    propsData: {
      blue: { value: "blue" },
    },
  });
  const blue = wrapper.vm.blue.value;
  it("returns a blue entry", () => {
    expect(blue).toBe("blue");
  });
  it("returns a light text color", () => {
    expect(wrapper.vm.color).toBe("#fff");
  });
  it("returns a dark text color", () => {
    wrapper.setData({ blue: { value: "cyan" } });
    expect(wrapper.vm.color).toBe("#111");
  });
});
