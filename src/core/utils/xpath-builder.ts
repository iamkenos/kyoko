export class XPathBuilder {
  private readonly ANY = "*";

  private readonly ESCAPE_PATTERN = /'/g;

  private readonly conditionals: string[];

  private readonly selector: string;

  public constructor(selector?: string) {
    this.conditionals = [];
    this.selector = selector || `//${this.ANY}`;
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

  public or() {
    this.conditionals.push("|");
    return this;
  }

  public position(position: number) {
    this.conditionals.push(`[position()=${position}]`);
    return this;
  }

  public previous(levels = 1) {
    this.conditionals.push("/..".repeat(levels));
    return this;
  }

  public next(levels = 1, tag = this.ANY) {
    this.conditionals.push(`/${this.ANY}`.repeat(levels).replace(/\/(?:.(?!\/))+$/, `/${tag}`));
    return this;
  }

  public hasExactAttribute(attribute: string, not?: boolean) {
    this.conditionals.push(this.wrap(`attribute::*[local-name()='${attribute}']`, not));
    return this;
  }

  public hasPartialAttribute(attribute: string, not?: boolean) {
    this.conditionals.push(this.wrap(`attribute::*[contains(local-name(),'${attribute}')]`, not));
    return this;
  }

  public attributeContains(attribute: string, value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`contains(@${attribute},'${value}')`, not));
    return this;
  }

  public attributeEquals(attribute: string, value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`@${attribute}='${value}'`, not));
    return this;
  }

  public nameContains(value: string, not?: boolean) {
    this.attributeContains("name", value, not);
    return this;
  }

  public nameEquals(value: string, not?: boolean) {
    this.attributeEquals("name", value, not);
    return this;
  }

  public idContains(value: string, not?: boolean) {
    this.attributeContains("id", value, not);
    return this;
  }

  public idEquals(value: string, not?: boolean) {
    this.attributeEquals("id", value, not);
    return this;
  }

  public classContains(value: string, not?: boolean) {
    this.attributeContains("class", value, not);
    return this;
  }

  public classOrTagContains(value: string, not?: boolean) {
    this.conditionals.push(this.wrap(`contains(@class,${value}) or contains(name(),${value})`, not));
    return this;
  }

  public classEquals(value: string, not?: boolean) {
    this.attributeEquals("class", value, not);
    return this;
  }

  public textContains(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(text(),${value}) or text()[contains(.,${value})]`, not));
    return this;
  }

  public textEquals(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`text()=${value} or normalize-space()=${value}`, not));
    return this;
  }

  public innerHtmlContains(value: string, not?: boolean) {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(.,${value})`, not));
    return this;
  }

  public ancestor(tag = this.ANY) {
    this.conditionals.push(`/ancestor::${this.unslash(tag)}`);
    return this;
  }

  public hasAncestor(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`ancestor::${this.unslash(tag)}`, not));
    return this;
  }

  public ancestorOrSelf(tag = this.ANY) {
    this.conditionals.push(`/ancestor-or-self::${this.unslash(tag)}`);
    return this;
  }

  public hasAncestorOrSelf(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`ancestor-or-self::${this.unslash(tag)}`, not));
    return this;
  }

  public child(tag = this.ANY) {
    this.conditionals.push(`/child::${this.unslash(tag)}`);
    return this;
  }

  public hasChild(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`child::${this.unslash(tag)}`, not));
    return this;
  }

  public descendant(tag = this.ANY) {
    this.conditionals.push(`/descendant::${this.unslash(tag)}`);
    return this;
  }

  public hasDescendant(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`descendant::${this.unslash(tag)}`, not));
    return this;
  }

  public descendantOrSelf(tag = this.ANY) {
    this.conditionals.push(`/descendant-or-self::${this.unslash(tag)}`);
    return this;
  }

  public hasDescendantOrSelf(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`descendant-or-self::${this.unslash(tag)}`, not));
    return this;
  }

  public following(tag = this.ANY) {
    this.conditionals.push(`/following::${this.unslash(tag)}`);
    return this;
  }

  public hasFollowing(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`following::${this.unslash(tag)}`, not));
    return this;
  }

  public followingSibling(tag = this.ANY) {
    this.conditionals.push(`/following-sibling::${this.unslash(tag)}`);
    return this;
  }

  public hasFollowingSibling(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`following-sibling::${this.unslash(tag)}`, not));
    return this;
  }

  public namespace(tag = this.ANY) {
    this.conditionals.push(`/namespace::${this.unslash(tag)}`);
    return this;
  }

  public hasNamespace(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`namespace::${this.unslash(tag)}`, not));
    return this;
  }

  public parent(tag = this.ANY) {
    this.conditionals.push(`/parent::${this.unslash(tag)}`);
    return this;
  }

  public hasParent(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`parent::${this.unslash(tag)}`, not));
    return this;
  }

  public preceding(tag = this.ANY) {
    this.conditionals.push(`/preceding::${this.unslash(tag)}`);
    return this;
  }

  public hasPreceding(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`preceding::${this.unslash(tag)}`, not));
    return this;
  }

  public precedingSibling(tag = this.ANY) {
    this.conditionals.push(`/preceding-sibling::${this.unslash(tag)}`);
    return this;
  }

  public hasPrecedingSibling(tag = this.ANY, not?: boolean) {
    this.conditionals.push(this.wrap(`preceding-sibling::${this.unslash(tag)}`, not));
    return this;
  }

  public build(index?: number | string) {
    const selector = this.selector + this.conditionals.join("");
    return this.index(selector, index as any);
  }
}
