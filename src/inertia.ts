import { Request, Response } from "express";
import viewTemplate from "./template";

export default class Inertia implements InertiaInterface {
  private req: Request;
  private res: Response;

  private component: string;
  private version: string | number = null;
  private sharedProps: object = {};

  constructor(req: Request, res: Response, version: string | number = '1') {
    this.version = version;
    this.req = req;
    this.res = res;
  }

  checkVersion(): boolean {
    if (
      this.req.method === 'GET' &&
      this.req.headers['x-inertia'] &&
      this.req.headers['x-inertia-version'] !== this.version
    ) {
      this.res.writeHead(409, { 'X-Inertia-Location': this.req.url }).end();
      return false;
    }
    return true;
  }

  flushShared(): void {
    this.sharedProps = {};
  }

  getShared(key?: string | number, defaultKey?: string | number): object {
    if (key) {
      return this.sharedProps[key] ?? this.sharedProps[defaultKey]
    }
    return this.sharedProps
  }

  getVersion(): string | number {
    return this.version;
  }

  location(url: string): void {
    this.res.writeHead(409, { 'X-Inertia-Location': url }).end();
  }

  share(props: object): void {
    this.sharedProps = { ...this.sharedProps, ...props }
  }

  async render(component: string = this.component, props?: any): Promise<void> {
    let page = {
      component,
      props: {},
      url: this.req.originalUrl || this.req.url,
      version: this.version
    };

    const allProps = { ...this.sharedProps, ...props };
    let dataKeys: string[];

    if (
      this.req.headers['x-inertia-partial-data'] &&
      this.req.headers['x-inertia-partial-component'] === component
    ) {
      dataKeys = (<string>this.req.headers['x-inertia-partial-data']).split(
        ',',
      );
    } else {
      dataKeys = Object.keys(allProps);
    }

    for (const key of dataKeys) {
      if (typeof allProps[key] === 'function') {
        page.props[key] = await allProps[key]();
      } else {
        page.props[key] = allProps[key];
      }
    }

    if (this.req.headers['x-inertia']) {
      this.res.writeHead(200, {
        Vary: 'Accept',
        'X-Inertia': 'true',
        'Content-Type': 'application/json',
      })
        .end(JSON.stringify(page));
    } else {
      const encodedPageString = JSON.stringify(page)
        .replace(/'/g, '&quot;')
        .replace(/'/g, '&#039;');

      this.res.writeHead(200, {
        'Content-Type': 'text/html',
      })
        .end(viewTemplate(encodedPageString));
    }
  }

  redirect(url: string): void {
    const statusCode = ['PUT', 'PATCH', 'DELETE'].includes(this.req.method)
      ? 303
      : 302;

    this.res.writeHead(statusCode, { Location: url }).end();
  }
}