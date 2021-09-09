/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import ThemeToggle from "@/components/ThemeToggle.vue";

describe("ThemeToggle", () => {
  const wrapper = mount(ThemeToggle, {
    propsData: {
      dark: false,
    },
  });
  it("toggles dark theme", () => {
    wrapper.vm.toggle();
    expect(wrapper.vm.dark).toBe(true);
  });
});
