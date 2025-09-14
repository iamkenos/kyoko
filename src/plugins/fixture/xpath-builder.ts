export class XPathBuilder {
  private readonly ANY = "*";

  private readonly ESCAPE_PATTERN = /'/g;

  private readonly conditionals: string[];

  private readonly selector: string;

  constructor(selector?: string) {
    this.conditionals = [];
    this.selector = selector || `//self::${this.ANY}`;
  }

  private wrap(condition: string, not = false) {
    return not ? `[not(${condition})]` : `[${condition}]`;
  }

  private unslash(string: string) {
    return string.replace(/^\/+/, "");
  }

  private xpathConcat(string: string) {
    if (string.match(this.ESCAPE_PATTERN)) {
      // handle special cases where string passed contains either a ' or "
      const sqIndices: any[] =
        Array.from(string.matchAll(this.ESCAPE_PATTERN))
          .map((i) => i.index)
          .concat(string.length);
      const parts: string[] = [];
      let start = 0;
      sqIndices.forEach((i) => {
        const prev = string.substring(start, i).replace(this.ESCAPE_PATTERN, "");
        const next = string[i];
        parts.push(prev ? `'${prev}'` : "", next ? `"${next}"` : "");
        start = i;
      });
      return `concat(${parts.filter(Boolean).join()})`;
    } else return `'${string}'`;
  }

  private index(selector: string, index?: number) {
    return index ? `(${selector})[${index}]` : selector;
  }

  or() {
    this.conditionals.push("|");
    return this;
  }

  position(position: number) {
    this.conditionals.push(`[position()=${position}]`);
    return this;
  }

  previous(levels = 1) {
    this.conditionals.push("/..".repeat(levels));
    return this;
  }

  next(levels = 1, tag = this.ANY) {
    this.conditionals.push(`/${this.ANY}`.repeat(levels).replace(/\/(?:.(?!\/))+$/, `/${tag}`));
    return this;
  }

  hasExactAttribute(attribute: string, not?: boolean) {
    this.conditionals.push(this.wrap(`attribute::*[local-name()='${attribute}']`, not));
    return this;
  }

  hasPartialAttribute(attribute: string, not?: boolean) {
    this.conditionals.push(this.wrap(`attribute::*[contains(local-name(),'${attribute}')]`, not));
    return this;
  }

  attributeContains(attribute: string, value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`contains(@${attribute},'${value}')`, not));
    return this;
  }

  attributeEquals(attribute: string, value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`@${attribute}='${value}'`, not));
    return this;
  }

  nameContains(value: string, not?: boolean) {
    this.attributeContains("name", value, not);
    return this;
  }

  nameEquals(value: string, not?: boolean) {
    this.attributeEquals("name", value, not);
    return this;
  }

  idContains(value: string, not?: boolean) {
    this.attributeContains("id", value, not);
    return this;
  }

  idEquals(value: string, not?: boolean) {
    this.attributeEquals("id", value, not);
    return this;
  }

  classContains(value: string, not?: boolean) {
    this.attributeContains("class", value, not);
    return this;
  }

  classOrTagContains(value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`contains(@class,${value}) or contains(name(),${value})`, not));
    return this;
  }

  classEquals(value: string, not?: boolean) {
    this.attributeEquals("class", value, not);
    return this;
  }

  textContains(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(text(),${value}) or text()[contains(.,${value})]`, not));
    return this;
  }

  textEquals(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`text()=${value} or normalize-space()=${value}`, not));
    return this;
  }

  innerHtmlContains(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(.,${value})`, not));
    return this;
  }

  ancestor(tag = this.ANY) {
    this.conditionals.push(`/ancestor::${this.unslash(tag)}`);
    return this;
  }

  hasAncestor(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`ancestor::${this.unslash(tag)}`, not));
    return this;
  }

  ancestorOrSelf(tag = this.ANY) {
    this.conditionals.push(`/ancestor-or-self::${this.unslash(tag)}`);
    return this;
  }

  hasAncestorOrSelf(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`ancestor-or-self::${this.unslash(tag)}`, not));
    return this;
  }

  child(tag = this.ANY) {
    this.conditionals.push(`/child::${this.unslash(tag)}`);
    return this;
  }

  hasChild(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`child::${this.unslash(tag)}`, not));
    return this;
  }

  descendant(tag = this.ANY) {
    this.conditionals.push(`/descendant::${this.unslash(tag)}`);
    return this;
  }

  hasDescendant(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`descendant::${this.unslash(tag)}`, not));
    return this;
  }

  descendantOrSelf(tag = this.ANY) {
    this.conditionals.push(`/descendant-or-self::${this.unslash(tag)}`);
    return this;
  }

  hasDescendantOrSelf(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`descendant-or-self::${this.unslash(tag)}`, not));
    return this;
  }

  following(tag = this.ANY) {
    this.conditionals.push(`/following::${this.unslash(tag)}`);
    return this;
  }

  hasFollowing(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`following::${this.unslash(tag)}`, not));
    return this;
  }

  followingSibling(tag = this.ANY) {
    this.conditionals.push(`/following-sibling::${this.unslash(tag)}`);
    return this;
  }

  hasFollowingSibling(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`following-sibling::${this.unslash(tag)}`, not));
    return this;
  }

  namespace(tag = this.ANY) {
    this.conditionals.push(`/namespace::${this.unslash(tag)}`);
    return this;
  }

  hasNamespace(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`namespace::${this.unslash(tag)}`, not));
    return this;
  }

  parent(tag = this.ANY) {
    this.conditionals.push(`/parent::${this.unslash(tag)}`);
    return this;
  }

  hasParent(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`parent::${this.unslash(tag)}`, not));
    return this;
  }

  preceding(tag = this.ANY) {
    this.conditionals.push(`/preceding::${this.unslash(tag)}`);
    return this;
  }

  hasPreceding(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`preceding::${this.unslash(tag)}`, not));
    return this;
  }

  precedingSibling(tag = this.ANY) {
    this.conditionals.push(`/preceding-sibling::${this.unslash(tag)}`);
    return this;
  }

  hasPrecedingSibling(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`preceding-sibling::${this.unslash(tag)}`, not));
    return this;
  }

  self(tag = this.ANY) {
    this.conditionals.push(`/self::${this.unslash(tag)}`);
    return this;
  }

  build(index?: number | string) {
    const selector = this.selector + this.conditionals.join("");
    return this.index(selector, index as any);
  }
}
