/**
 * @jest-environment jsdom
 */
/* eslint-disable vue/one-component-per-file */

import { mount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import dflt from "@/layouts/default.vue";

const localVue = createLocalVue();

localVue.component("Nuxt", {
  props: {
    to: {
      type: String,
      default: ""
    }
  },
  template: '<div>Nuxt</div>'
});

localVue.component("NuxtLink", {
  props: {
    to: {
      type: String,
      default: ""
    }
  },
  template: '<a href="#"><slot>NuxtLink</slot></a>'
});

describe("Header", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(dflt, {
      stubs: ["Nuxt", "NuxtLink"],
      localVue
    });
    const header = wrapper.findComponent(Header);
    expect(header.exists()).toBe(true);
  });
});
