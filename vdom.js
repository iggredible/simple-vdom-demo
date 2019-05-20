const app = document.querySelector("#app");

const vAppStructure = {
  tagName: "ul",
  text: "",
  attrs: { class: "parent-class", id: "parent-id" },
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
      children: []
    }
  ]
};

const renderer = node => {
  const { tagName, text, attrs, children } = node;
  const $elem = document.createElement(tagName);

  for (const attr in attrs) {
    $elem.setAttribute(attr, attrs[attr]);
  }

  if (text) {
    console.log("text: ", text);
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

const $vApp = renderer(vAppStructure);
app.replaceWith($vApp);
