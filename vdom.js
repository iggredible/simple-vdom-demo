import diff from "./diff";

const app = document.querySelector("#app");

const vAppStructure = num => {
  return {
    tagName: "ul",
    text: "",
    attrs: { class: "parent-class", id: `parent-id-${num}` },
    children: [
      {
        tagName: "li",
        attrs: "",
        text: "list 1",
        attrs: { class: "child-class" },
        children: []
      },
      {
        tagName: "li",
        attrs: "",
        text: "list 2",
        attrs: { class: "child-class" },
        children: [{ tagName: "input", attrs: "", text: "", children: [] }]
      }
    ]
  };
};

const renderer = node => {
  const { tagName, text, attrs, children } = node;
  const $elem = document.createElement(tagName);

  for (const attr in attrs) {
    $elem.setAttribute(attr, attrs[attr]);
  }

  if (text) {
    const $text = document.createTextNode(text);
    $elem.appendChild($text);
  }

  if (children && children.length > 0) {
    for (const child of children) {
      const $child = renderer(child);
      $elem.appendChild($child);
    }
  }

  return $elem;
};

const mount = ($nodeToReplace, $nodeTarget) => {
  $nodeTarget.replaceWith($nodeToReplace);
  return $nodeToReplace;
};

let num = 10;
let currentVApp = vAppStructure(num);
let $vApp = renderer(currentVApp);
let $rootElem = mount($vApp, app);
let newVApp;

setInterval(() => {
  num++;
  newVApp = vAppStructure(num);
  // let $newVApp = renderer(newVApp);
  // $rootElem = mount($newVApp, $rootElem); // problem is, it is still mounting
  const patch = diff(currentVApp, newVApp);
  $rootElem = patch($rootElem);

  currentVApp = newVApp;
}, 1000);
