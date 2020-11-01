import { loadScriptFile } from "./loadScriptFile";

type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

export const dynamicFederation = async (
  scope: string,
  module: string,
  url?: string
) => {
  if (url) {
    await loadScriptFile(module, url);
  }
  const container: any = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then((factory) => {
    const Module = factory();
    return Module;
  });
};
