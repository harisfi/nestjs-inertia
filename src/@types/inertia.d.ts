interface InertiaInterface {
  checkVersion(): boolean;
  flushShared(): void;
  getShared(key?: string | number, defaultKey?: string | number): object;
  getVersion(): number | string;
  location(url: string): void;
  share(props: object): void;
  render(component: string, props?: any): Promise<void>;
  redirect(url: string): void;
}

declare module Express {
  export interface Response {
    inertia: InertiaInterface
  }
}