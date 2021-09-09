/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import ThemeToggle from "@/components/ThemeToggle.vue";

describe("ThemeToggle", () => {
  const wrapper = mount(ThemeToggle, {
    propsData: {
      dark: false
    }
  });
  it("returns dark prop", () => {
    expect(wrapper.vm.dark).toBe(false);
  });
});
