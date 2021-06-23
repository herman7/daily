
function findComponentUpward (context, compoenntName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [compoenntName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}