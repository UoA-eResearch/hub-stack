/* SystemJS module definition */
// eslint-disable-next-line no-var
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Window { dataLayer: any; }
