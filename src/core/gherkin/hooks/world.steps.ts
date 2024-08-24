import * as path from "path";
import * as object from "@common/utils/object";

import {
  After,
  AfterStep,
  Before,
  BeforeStep,
  defineParameterType,
  ITestStepHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status
} from "@cucumber/cucumber";
import { This, World } from "@core/world";
import { AnchorAttributes } from "@core/gherkin/enums";
import { XPathBuilder } from "@core/utils/xpath-builder";

import chalk from "chalk";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(World);

/** Dont run tests but still show these in the formatter */
Before({ tags: "@SKIP or @skip or @IGNORE or @ignore" }, () => Status.SKIPPED.toLowerCase());

Before({ tags: "@PENDING or @pending" }, () => Status.PENDING.toLowerCase());

Before({}, async function(this: World) {
  this.context = await this.createBrowserContext();
  this.page = await this.context.newPage();
});

BeforeStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { pickleStep, gherkinDocument } = params;
  const step = object.deepSearch(gherkinDocument, "id", pickleStep.astNodeIds[0]);
  this.logger.info(`${chalk.green.dim.bold(step.keyword.trim())} ${chalk.green.dim(step.text)}`);
});

AfterStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { result } = params;

  if (result.status !== Status.PASSED) {
    const buffer = await this.page.screenshot({ fullPage: true });
    this.reporter.attach(buffer, "image/png");
  }
});

After({}, async function(this: This) {
  if (this.page) {
    await this.page.close();
    await this.page.context().close();
    await this.page.context().browser().close();
  }
});

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
  name: "selected_or_deselected",
  regexp: /selected|deselected/,
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
  transformer(this: World, not: string) {
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
  transformer(this: World, filepath: string) {
    return path.isAbsolute(filepath) ? filepath : path.join(world.config.baseDir, filepath);
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
  transformer(this: World, ...matches: string[]) {
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
  transformer(this: World, ordinal: string) {
    return +ordinal || 0;
  },
  useForSnippets : false
});

defineParameterType({
  name: "repeats",
  regexp: /(?: (\d+) times)?(?: again)?$/,
  transformer(this: World, count: string) {
    return +count || 1;
  },
  useForSnippets : false
});

defineParameterType({
  name: "resolved_url",
  regexp: /"([^"]*)?"/,
  transformer(this: World, url: string) {
    return this.page.urlFromBase(url);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_persisted",
  regexp: /"([^"]*)?"/,
  transformer(this: World, page: string) {
    return this.findPageObject(page, true);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object",
  regexp: /"([^"]*)?"/,
  transformer(this: World, page: string) {
    return this.findPageObject(page);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_prop",
  regexp: /(?:"([^"]*)?" page's)? "([^"]*)?"|"([^"]*)?"/,
  transformer(this: World, page: string, prop: string, justProp: string) {
    return this.findPageObjectProp(page, prop || justProp);
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_url",
  regexp: /(?:"([^"]*)?" page's)? url|url "([^"]*)?"/,
  transformer(this: World, page: string, url: string) {
    return url || this.findPageObject(page).url;
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_locator",
  regexp: /(?:"([^"]*)?" (?:page|component)'s )?(?:(\d+)(?:st|nd|rd|th) )?"([^"]*)?"/,
  transformer(this: World, ...matches: string[]) {
    const [page, ordinal, selector] = matches;
    const index = +ordinal || 0;
    const locator = this.findPageObjectLocator(page, selector, index);
    return locator;
  },
  useForSnippets : false
});

defineParameterType({
  name: "page_object_locator_nested",
  regexp: /(?:"([^"]*)?" (?:page|component)'s )?(?:(\d+)(?:st|nd|rd|th) )?(?:"([^"]*)?'s" )?"([^"]*)?" (?:section|component|element|form|section|panel)/,
  transformer(this: World, ...matches: string[]) {
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
  transformer(this: World, page: string, title: string) {
    return title || this.findPageObject(page).title;
  },
  useForSnippets : false
});

defineParameterType({
  name: "the_page_object_url",
  regexp: /(?:the "([^"]*)?" page's)? url|"([^"]*)?"/,
  transformer(this: World, page: string, url: string) {
    return url || this.findPageObject(page).url;
  },
  useForSnippets : false
});

