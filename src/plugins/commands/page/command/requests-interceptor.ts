import type { Page, Request } from "playwright";

export function requestsInterceptor(this: Page | any, options?: { teardown?: boolean }) {
  this.requestsIntercepted = this.requestsIntercepted || [];
  const listener = (request: Request) => this.requestsIntercepted.push(request);
  if (options?.teardown) {
    const requests = [...this.requestsIntercepted];
    this.removeListener("request", listener);
    delete this.requestsIntercepted;
    return requests;
  } else {
    this.on("request", listener);
  }
}
