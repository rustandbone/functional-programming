// --------------------------------------------------------------------------
// ✅ [사용법]
// --------------------------------------------------------------------------
// 라이브러리를 사용할 파일 상단에 디렉티브 추가
// @jsx y9.h
//
// 라이브러리 모듈 호출
// import y9, { createRoot } from './lib/y9';
//
// DOM 요소를 사용해 루트 요소 생성
// const root = createRoot(document.getElementById('root'));
//
// 루트 요소 render 메서드를 사용해 JSX 요소 → DOM 생성
// root.render(<App />);
// --------------------------------------------------------------------------

/* loadBabelStandalone */ (() => {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<script 
      src="https://unpkg.com/@babel/standalone/babel.min.js" 
      crossorigin defer></script>`
  );
})();

/* -------------------------------------------------------------------------- */

const _y9 = {};
const componentHooks = [];
let currentHookIndex = 0;

function parse(vNode) {
  if (
    typeof vNode === 'string' ||
    (typeof vNode === 'number' && !isNaN(vNode))
  ) {
    return vNode;
  }

  if (typeof vNode.type === 'string') {
    const elementNode = document.createElement(vNode.type);
    const { children, ...props } = vNode.props;

    Object.entries(props).forEach(([key, value]) => {
      if (/^on/.test(key)) {
        const eventType = key.replace(/^on./, ($1) =>
          $1.replace('on', '').toLowerCase()
        );
        elementNode.addEventListener(eventType, value);
      } else {
        if (key === 'className') key === 'class';
        elementNode.setAttribute(key, value);
      }
    });

    children.forEach((child) => {
      if (typeof child === 'string') {
        elementNode.append(child);
      } else if (Array.isArray(child)) {
        const children = child;
        children.forEach((child) => elementNode.append(parse(child)));
      } else {
        elementNode.append(parse(child));
      }
    });

    return elementNode;
  }

  if (typeof vNode.type === 'function') {
    return parse(vNode.type(vNode.props));
  }

  return null;
}

function updateDOM() {
  const { domRoot, view } = _y9;
  currentHookIndex = 0;
  domRoot.render(view);
}

export function createElement(type, props, ...children) {
  return {
    '@@typeof': Symbol('y9.element'),
    type,
    props: {
      ...props,
      children,
    },
  };
}

export function createRoot(container) {
  const y9DomRoot = {
    render(vNode) {
      this.unmount();
      _y9.view = vNode;
      container.append(parse(_y9.view));
    },
    unmount() {
      container.innerHTML = '';
    },
  };

  _y9.domRoot = y9DomRoot;

  return y9DomRoot;
}

export function useState(initialState) {
  let pair = componentHooks[currentHookIndex];

  if (pair) {
    currentHookIndex++;
    return pair;
  }

  pair = [initialState, setState];

  function setState(nextState) {
    pair[0] = nextState;
    updateDOM();
  }

  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;

  return pair;
}

const y9 = {
  h: createElement,
  createElement,
  createRoot,
  useState,
};

export default y9;
