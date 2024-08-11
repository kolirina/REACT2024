import {
  createHotContext
} from "/build/_shared/chunk-D7BU4XKW.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/context/ThemeContext.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\context\\\\ThemeContext.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\context\\ThemeContext.tsx"
  );
  import.meta.hot.lastModified = "1723415839445.5923";
}
var ThemeContext = (0, import_react.createContext)(false);
var ThemeContextUpdate = (0, import_react.createContext)(_c = () => {
});
_c2 = ThemeContextUpdate;
var ThemeProvider = ({
  children
}) => {
  _s();
  const [darkTheme, setDarkTheme] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setDarkTheme(JSON.parse(savedTheme));
      }
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(darkTheme));
    }
  }, [darkTheme]);
  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeContext.Provider, { value: darkTheme, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeContextUpdate.Provider, { value: toggleTheme, children }, void 0, false, {
    fileName: "src/context/ThemeContext.tsx",
    lineNumber: 48,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "src/context/ThemeContext.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
};
_s(ThemeProvider, "GMHuRgpno5gG0DjbT1TYsvZU/rA=");
_c3 = ThemeProvider;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "ThemeContextUpdate$createContext");
$RefreshReg$(_c2, "ThemeContextUpdate");
$RefreshReg$(_c3, "ThemeProvider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  ThemeContext,
  ThemeContextUpdate,
  ThemeProvider
};
//# sourceMappingURL=/build/_shared/chunk-BFVO6P4Y.js.map
