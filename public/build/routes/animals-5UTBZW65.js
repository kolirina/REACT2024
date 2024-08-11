import {
  setPage,
  setTotalPages,
  toggleItem,
  unselectAll,
  useDispatch,
  useSelector
} from "/build/_shared/chunk-FBEIXTW6.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-3EL3KC52.js";
import {
  Link,
  Outlet,
  init_dist,
  useLoaderData,
  useNavigate,
  useSearchParams
} from "/build/_shared/chunk-4A4AD2BB.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  useTheme,
  useThemeUpdate
} from "/build/_shared/chunk-K7PQKRHU.js";
import "/build/_shared/chunk-JBUPV3AI.js";
import {
  createHotContext
} from "/build/_shared/chunk-D7BU4XKW.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/routes/animals.tsx
var import_react2 = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);

// src/components/Search.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\components\\\\Search.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\components\\Search.tsx"
  );
  import.meta.hot.lastModified = "1723412537849.8337";
}
var Search = ({
  onSearch,
  defaultValue = ""
}) => {
  _s();
  const [searchTerm, setSearchTerm] = (0, import_react.useState)(defaultValue);
  (0, import_react.useEffect)(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);
  const handleSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "top-section", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Find an Animal \u{1F50D}" }, void 0, false, {
      fileName: "src/components/Search.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleSubmit, children: "Search" }, void 0, false, {
      fileName: "src/components/Search.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/components/Search.tsx",
    lineNumber: 41,
    columnNumber: 10
  }, this);
};
_s(Search, "xNWvjwlTVPlJaZfEB3WKBewn6YE=");
_c = Search;
var Search_default = Search;
var _c;
$RefreshReg$(_c, "Search");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/components/SearchResults.tsx
init_dist();

// src/components/Checkbox.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\components\\\\Checkbox.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\components\\Checkbox.tsx"
  );
  import.meta.hot.lastModified = "1723380617163.8684";
}
var Checkbox = ({
  item
}) => {
  _s2();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.items);
  const isChecked = selectedItems.some((i) => i.uid === item.uid);
  const handleChange = () => {
    dispatch(toggleItem(item));
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "light-checkbox", type: "checkbox", checked: isChecked, onChange: handleChange }, void 0, false, {
    fileName: "src/components/Checkbox.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
};
_s2(Checkbox, "FzHVeXltEM4xjwFBOPqkwW7TSFI=", false, function() {
  return [useDispatch, useSelector];
});
_c2 = Checkbox;
var Checkbox_default = Checkbox;
var _c2;
$RefreshReg$(_c2, "Checkbox");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/components/SearchResults.tsx
init_dist();
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\components\\\\SearchResults.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\components\\SearchResults.tsx"
  );
}
var SearchResults = ({
  results
}) => {
  _s3();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const darkTheme = useTheme();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "search-results", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { children: "Search Results" }, void 0, false, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    results.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { children: results.map((result) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { style: {
      display: "flex",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Checkbox_default, { item: result }, void 0, false, {
        fileName: "src/components/SearchResults.tsx",
        lineNumber: 44,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link, { to: `/animals/${result.uid}?search=${searchTerm}&page=${currentPage}`, className: darkTheme ? "dark-animalLink" : "light-animalLink", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("strong", { children: result.name }, void 0, false, {
        fileName: "src/components/SearchResults.tsx",
        lineNumber: 47,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "src/components/SearchResults.tsx",
        lineNumber: 45,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 40,
      columnNumber: 15
    }, this) }, result.uid, false, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 39,
      columnNumber: 34
    }, this)) }, void 0, false, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 38,
      columnNumber: 29
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: "No animal found. Try again\u{1F638}" }, void 0, false, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 51,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "src/components/SearchResults.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
};
_s3(SearchResults, "cC/mzHxXB26Lkp38L91HXmmQ31A=", false, function() {
  return [useSearchParams, useTheme, useSelector];
});
_c3 = SearchResults;
var SearchResults_default = SearchResults;
var _c3;
$RefreshReg$(_c3, "SearchResults");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/components/Pagination.tsx
init_dist();
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\components\\\\Pagination.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s4 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\components\\Pagination.tsx"
  );
  import.meta.hot.lastModified = "1723380617167.8557";
}
var Pagination = ({
  currentPage,
  totalPages
}) => {
  _s4();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const darkTheme = useTheme();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "pagination", children: [
    currentPage > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link, { to: `?search=${searchTerm}&page=${currentPage - 1}`, className: darkTheme ? "dark-link" : "light-link", children: "Previous" }, void 0, false, {
      fileName: "src/components/Pagination.tsx",
      lineNumber: 34,
      columnNumber: 27
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] }, void 0, true, {
      fileName: "src/components/Pagination.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    currentPage < totalPages && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link, { to: `?search=${searchTerm}&page=${currentPage + 1}`, className: darkTheme ? "dark-link" : "light-link", children: "Next" }, void 0, false, {
      fileName: "src/components/Pagination.tsx",
      lineNumber: 40,
      columnNumber: 36
    }, this)
  ] }, void 0, true, {
    fileName: "src/components/Pagination.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
};
_s4(Pagination, "B2/RqNsUrbCJe7vn9VkGkdUFv2c=", false, function() {
  return [useSearchParams, useTheme];
});
_c4 = Pagination;
var Pagination_default = Pagination;
var _c4;
$RefreshReg$(_c4, "Pagination");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/utils/csx.tsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\utils\\csx.tsx"
  );
  import.meta.hot.lastModified = "1723380781666.1438";
}
var downloadCSV = (items) => {
  const headers = ["UID", "Name", "Description"];
  const rows = items.map((item) => {
    const descriptions = [];
    if (item.earthAnimal)
      descriptions.push("Earth Animal");
    if (item.earthInsect)
      descriptions.push("Earth Insect");
    if (item.avian)
      descriptions.push("Avian");
    if (item.canine)
      descriptions.push("Canine");
    if (item.feline)
      descriptions.push("Feline");
    if (descriptions.length === 0) {
      descriptions.push("an infinitely cute animal");
    }
    return [item.uid, item.name, descriptions.join(", ")];
  });
  const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${items.length}_animals.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// src/components/Flyout.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\components\\\\Flyout.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s5 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\components\\Flyout.tsx"
  );
  import.meta.hot.lastModified = "1723380617165.8613";
}
var Flyout = () => {
  _s5();
  const darkTheme = useTheme();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.items);
  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };
  const handleDownload = () => {
    downloadCSV(selectedItems);
  };
  if (selectedItems.length === 0)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: darkTheme ? "dark-flyout" : "light-flyout", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
      selectedItems.length,
      " animals are selected"
    ] }, void 0, true, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: handleUnselectAll, children: "Unselect all" }, void 0, false, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: handleDownload, children: "Download" }, void 0, false, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/components/Flyout.tsx",
    lineNumber: 39,
    columnNumber: 10
  }, this);
};
_s5(Flyout, "QnFfO+E3Qw1woyQDp+nG4GuXrOs=", false, function() {
  return [useTheme, useDispatch, useSelector];
});
_c5 = Flyout;
var Flyout_default = Flyout;
var _c5;
$RefreshReg$(_c5, "Flyout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/services/fetchAnimalData.tsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\services\\fetchAnimalData.tsx"
  );
  import.meta.hot.lastModified = "1723412602598.4194";
}

// src/routes/animals.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\routes\\\\animals.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s6 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\routes\\animals.tsx"
  );
  import.meta.hot.lastModified = "1723409360787.4192";
}
function Index() {
  _s6();
  const {
    animals,
    searchTerm,
    page,
    totalPages
  } = useLoaderData();
  const dispatch = useDispatch();
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = (0, import_react2.useState)(true);
  (0, import_react2.useEffect)(() => {
    setIsLoading(false);
    dispatch(setPage(page));
    dispatch(setTotalPages(totalPages));
  }, [page, totalPages, dispatch]);
  const handleSearch = (term) => {
    setIsLoading(true);
    navigate(`?search=${encodeURIComponent(term)}&page=1`);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: darkTheme ? "dark-MainWrapper" : "light-MainWrapper", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { onClick: toggleTheme, className: "themeButton", children: darkTheme ? "\u{1F31E} Light Mode" : "\u{1F31C} Dark Mode" }, void 0, false, {
      fileName: "src/routes/animals.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { "data-testid": "home", className: darkTheme ? "dark-App" : "light-App", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "top-section", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Search_default, { onSearch: handleSearch, defaultValue: searchTerm }, void 0, false, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "content-section", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "left-section", children: [
          isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "loader-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "loader", children: "Loading..." }, void 0, false, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 86,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 85,
            columnNumber: 26
          }, this) : animals.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(SearchResults_default, { results: animals }, void 0, false, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 87,
            columnNumber: 45
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "no-results", children: "No animals found matching your search." }, void 0, false, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 87,
            columnNumber: 83
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Pagination_default, { currentPage: page, totalPages }, void 0, false, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 90,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "right-section", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Outlet, {}, void 0, false, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Flyout_default, {}, void 0, false, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/routes/animals.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/routes/animals.tsx",
    lineNumber: 75,
    columnNumber: 10
  }, this);
}
_s6(Index, "HgBQJsT4kSkh2WJmn2oJXTw6sME=", false, function() {
  return [useLoaderData, useDispatch, useTheme, useThemeUpdate, useNavigate];
});
_c6 = Index;
var _c6;
$RefreshReg$(_c6, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/animals-5UTBZW65.js.map
