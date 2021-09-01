/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import Logo from "@/components/Logo.vue";

const localVue = createLocalVue();

localVue.component("NuxtLink", {
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  template: '<a href="#"><slot>NuxtLink</slot></a>'
});

describe("Logo", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Header, {
      stubs: ["NuxtLink"],
      localVue
    });
    const logo = wrapper.findComponent(Logo);
    expect(logo.exists()).toBe(true);
  });
});
