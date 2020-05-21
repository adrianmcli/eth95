declare global {
  interface Window {
    ethereum: any;
  }
}

// See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/24419
interface Element { }
interface Node { }
interface NodeListOf<TNode = Node> { }

export {};
