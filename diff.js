const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  for (const attr in newAttrs) {
    patches.push($node => {
      $node.setAttribute(attr, newAttrs[attr]);
      // return $node;
    });
  }

  for (const attr in oldAttrs) {
    if (!(attr in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(attr);
        // return $node;
      });
    }
  }
  return $node => {
    for (const patch of patches) {
      patch($node);
    }
  };
};
const diff = (oldVApp, newVApp) => {
  const patchAttrs = diffAttrs(oldVApp.attrs, newVApp.attrs);

  return $node => {
    patchAttrs($node);
    return $node; // important to return $node, because after diffing, we patch($rootElem) and it expects to return some sort of element!
  };
};
export default diff;
