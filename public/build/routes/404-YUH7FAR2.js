import {
  useTheme
} from "/build/_shared/chunk-K7PQKRHU.js";
import "/build/_shared/chunk-JBUPV3AI.js";
import {
  createHotContext
} from "/build/_shared/chunk-D7BU4XKW.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/routes/404.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\routes\\\\404.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\routes\\404.tsx"
  );
  import.meta.hot.lastModified = "1723388151826.901";
}
var NotFound = () => {
  _s();
  const darkTheme = useTheme();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: darkTheme ? "dark-NotFound" : "light-NotFound", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "404 Not Found \u{1F63F}" }, void 0, false, {
      fileName: "src/routes/404.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "The page you are looking for does not exist." }, void 0, false, {
      fileName: "src/routes/404.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/routes/404.tsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
};
_s(NotFound, "gniiV1rpPZvNm+k2DKSspcy7hGY=", false, function() {
  return [useTheme];
});
_c = NotFound;
var __default = NotFound;
var _c;
$RefreshReg$(_c, "NotFound");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  __default as default
};
//# sourceMappingURL=/build/routes/404-YUH7FAR2.js.map
