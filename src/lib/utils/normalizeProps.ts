import type { Dict } from "@zag-js/core/dist/types";
import { createNormalizer } from "@zag-js/types";

// TODO hoping to get element types from svelte
type IntrinsicAttributes = Record<
  "button" | "label" | "input" | "output" | "element" | "select" | "style",
  any
>;

type PropTypes = IntrinsicAttributes & {
  element: any;
  style: any;
};

const eventMap = {
  htmlFor: "for",
  className: "class",
  onDoubleClick: "on:dblclick",
  onChange: "on:input",
  onFocus: "on:focusin",
  onBlur: "on:focusout",
};

function toSvelteProp(prop: string) {
  if (prop in eventMap) return eventMap[prop];

  if (prop.startsWith("on")) {
    return `on:${prop.substr(2).toLowerCase()}`;
  }

  return prop.toLowerCase();
}

export const normalizeProps = createNormalizer<PropTypes>((props: Dict) => {
  // console.log('in')
  const normalized: Dict = {};
  for (const key in props) {
    if (key === "children") {
      // if (typeof props[key] === "string") {
      // normalized["innerHTML"] = props[key];
      // } else if (process.env.NODE_ENV !== "production") {
      //   console.warn(
      //     "[Svelte Normalize Prop] : avoid passing non-primitive value as `children`"
      //   );
      // }
    } else {
      if (props[key]) normalized[toSvelteProp(key)] = props[key];
      else if (key !== 'disabled') normalized[toSvelteProp(key)] = !!props[key];
    }
  }
  return normalized;
});
