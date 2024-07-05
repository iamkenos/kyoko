import * as path from "path";

import { defineParameterType } from "@cucumber/cucumber";
import { AnchorAttributes } from "../enums";
import { XPathBuilder } from "../../utils/xpath-builder";

import type { World as This } from "../../world";

/** [CucumberExpressions](https://cucumber.github.io/try-cucumber-expressions/) */

defineParameterType({
  name: "accept_or_dismiss",
  regexp: /accept|dismiss/,
  useForSnippets : false
});

defineParameterType({
  name: "back_or_forward",
  regexp: /back|forward/,
  useForSnippets : false
});

defineParameterType({
  name: "be_or_contain",
  regexp: /be|match|contain|partially match/,
  useForSnippets : false
});

defineParameterType({
  name: "page_or_viewport",
  regexp: /page|viewport/,
  useForSnippets : false
});

defineParameterType({
  name: "label_or_value",
  regexp: /label|value/,
  useForSnippets : false
});

defineParameterType({
  name: "left_or_right",
  regexp: /left|right/,
  useForSnippets : false
});

defineParameterType({
  name: "less_or_more",
  regexp: /less|more/,
  useForSnippets : false
});

defineParameterType({
  name: "tick_or_untick",
  regexp: /tick|untick/,
  useForSnippets : false
});

defineParameterType({
  name: "top_or_bottom",
  regexp: /top|bottom/,
  useForSnippets : false
});

defineParameterType({
  name: "to_or_to_not",
  regexp: /to( not)?/,
  transformer(this: This, not: string) {
    return !!not;
  },
  useForSnippets : false
});

defineParameterType({
  name: "type_or_append",
  regexp: /type|append/,
  useForSnippets : false
});

defineParameterType({
  name: "width_or_height",
  regexp: /width|height/,
  useForSnippets : false
});

defineParameterType({
  name: "x_or_y",
  regexp: /x|y/,
  useForSnippets : false
});

defineParameterType({
  name: "click",
  regexp: /(?:(double|force|middle|right) click|click)/,
  useForSnippets : false
});

defineParameterType({
  name: "filepath",
  regexp: /"([^"]*)?"/,
  transformer(this: This, filepath: string) {
    return path.isAbsolute(filepath) ? filepath : path.join(this.context.config.baseDir, filepath);
  },
  useForSnippets : false
});

defineParameterType({
  name: "input_string",
  regexp: /"([^"]*)?"/,
  useForSnippets : true
});

defineParameterType({
  name: "link_target",
  regexp: /new window|same frame|parent frame|top frame/,
  useForSnippets : false
});

defineParameterType({
  name: "link_locator",
  regexp: /(?:(\d+)(?:st|nd|rd|th) )?"([^"]*)?"/,
  transformer(this: This, ...matches: string[]) {
    const [ordinal, link] = matches;
    const index = +ordinal || 1;
    const locator = this.page.locator(new XPathBuilder().textEquals(link).hasExactAttribute(AnchorAttributes.HREF).build()).nth(index -1);
    return locator;
  },
  useForSnippets : false
});

defineParameterType({
  name: "link_scheme",
  regexp: /mail|tel/,
  useForSnippets : false
});

defineParameterType({
  name: "ordinal",
  regexp: /(\d+)(?:st|nd|rd|th)/,
  transformer(this: This, ordinal: string) {
    return +ordinal || 0;
  },
  useForSnippets : false
});

defineParameterType({
  name: "repeats",
  regexp: /(?: (\d+) times)?(?: again)?$/,
  transformer(this: This, count: string) {
    return +count || 1;
  },
  useForSnippets : false
});

defineParameterType({
  name: "resolved_url",
  regexp: /"([^"]*)?"/,
  transformer(this: This, url: string) {
    return this.page.urlFromBase(url);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_persisted",
  regexp: /"([^"]*)?"/,
  transformer(this: This, page: string) {
    return this.findPageObject(page, true);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object",
  regexp: /"([^"]*)?"/,
  transformer(this: This, page: string) {
    return this.findPageObject(page);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_prop",
  regexp: /(?:"([^"]*)?" page's)? "([^"]*)?"|"([^"]*)?"/,
  transformer(this: This, page: string, prop: string, justProp: string) {
    return this.findPageObjectProp(page, prop || justProp);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_url",
  regexp: /(?:"([^"]*)?" page's)? url|url "([^"]*)?"/,
  transformer(this: This, page: string, url: string) {
    return url || this.findPageObject(page).url;
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_locator",
  regexp: /(?:"([^"]*)?" (?:page|component)'s )?(?:(\d+)(?:st|nd|rd|th) )?"([^"]*)?"/,
  transformer(this: This, ...matches: string[]) {
    const [page, ordinal, selector] = matches;
    const index = +ordinal || 0;
    const locator = this.findPageObjectLocator(page, selector, index);
    return locator;
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_locator_nested",
  regexp: /(?:"([^"]*)?" (?:page|component)'s )?(?:(\d+)(?:st|nd|rd|th) )?(?:"([^"]*)?'s" )?"([^"]*)?" (?:section|component|element|form)/,
  transformer(this: This, ...matches: string[]) {
    const [page, ordinal, selector, nested] = matches;
    const index = +ordinal || 0;
    const parent = selector ? this.findPageObjectLocator(page, selector, index) : undefined;
    const locator = parent ? parent.locator(this.findPageObjectLocator(page, nested)) : this.findPageObjectLocator(page, nested, index);
    return locator;
  },
  useForSnippets : false
});

defineParameterType({
  name: "the_page_object_title",
  regexp: /(?:the "([^"]*)?" page's)? title|"([^"]*)?"/,
  transformer(this: This, page: string, title: string) {
    return title || this.findPageObject(page).title;
  },
  useForSnippets : false
});

defineParameterType({
  name: "the_page_object_url",
  regexp: /(?:the "([^"]*)?" page's)? url|"([^"]*)?"/,
  transformer(this: This, page: string, url: string) {
    return url || this.findPageObject(page).url;
  },
  useForSnippets : false
});

