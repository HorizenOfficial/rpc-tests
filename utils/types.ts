type JSONRPC = {
  jsonrpc: string;
  id: number;
  result: string;
  error?: {
    code: number;
    message: string;
    data: string;
  };
}

type Options = {
  [ key: string ]: string | number;
}

export type {
  JSONRPC,
  Options,
}
