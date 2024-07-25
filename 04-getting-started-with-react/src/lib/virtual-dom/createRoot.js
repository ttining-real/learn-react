import VirtualDomRoot from './VirtualDomRoot.js';

// React DOM
function createRoot(rootElement) {
  return new VirtualDomRoot(rootElement);
}

export default createRoot;