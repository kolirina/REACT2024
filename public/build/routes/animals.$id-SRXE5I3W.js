import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-3EL3KC52.js";
import {
  useTheme
} from "/build/_shared/chunk-QJSBSD7W.js";
import "/build/_shared/chunk-BFVO6P4Y.js";
import {
  Link2 as Link,
  useLoaderData
} from "/build/_shared/chunk-QLLXX7SC.js";
import {
  createHotContext
} from "/build/_shared/chunk-D7BU4XKW.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/routes/animals.$id.tsx
var import_react = __toESM(require_react(), 1);

// loaders/animalLoader.tsx
var import_node = __toESM(require_node(), 1);

// src/routes/animals.$id.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\routes\\\\animals.$id.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\routes\\animals.$id.tsx"
  );
  import.meta.hot.lastModified = "1723415839448.5825";
}
function AnimalDetails() {
  _s();
  const {
    data
  } = useLoaderData();
  const [descriptions, setDescriptions] = (0, import_react.useState)([]);
  const darkTheme = useTheme();
  (0, import_react.useEffect)(() => {
    if (data) {
      const newDescriptions = [];
      if (data.animal.earthAnimal)
        newDescriptions.push("Earth Animal \u{1F43E}");
      if (data.animal.earthInsect)
        newDescriptions.push("Earth Insect \u{1F997}");
      if (data.animal.avian)
        newDescriptions.push("Avian \u{1F99C}");
      if (data.animal.canine)
        newDescriptions.push("Canine \u{1F436}");
      if (data.animal.feline)
        newDescriptions.push("Feline \u{1F63A}");
      if (newDescriptions.length === 0) {
        newDescriptions.push("an infinitely cute animal \u{1F47B}");
      }
      setDescriptions(newDescriptions);
    }
  }, [data]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animal-details", children: data ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: data.animal.name }, void 0, false, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 50,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: descriptions.join(", ") }, void 0, false, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 51,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/`, className: darkTheme ? "dark-link" : "light-link", children: "Hide Details" }, void 0, false, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 52,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 49,
    columnNumber: 15
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "No details available" }, void 0, false, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 55,
    columnNumber: 18
  }, this) }, void 0, false, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 48,
    columnNumber: 10
  }, this);
}
_s(AnimalDetails, "hXBAwvaZF5mfemR6mw9wMLpQunc=", false, function() {
  return [useLoaderData, useTheme];
});
_c = AnimalDetails;
var _c;
$RefreshReg$(_c, "AnimalDetails");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AnimalDetails as default
};
//# sourceMappingURL=/build/routes/animals.$id-SRXE5I3W.js.map
