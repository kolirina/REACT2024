var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// src/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// src/App.css
var App_default = "/build/_assets/App-W7B4QNLZ.css";

// src/root.tsx
import { Provider } from "react-redux";

// src/store.tsx
import { configureStore } from "@reduxjs/toolkit";

// src/services/apiSlice.tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// src/constants.tsx
var SEARCH_URL = "https://stapi.co/api/v1/rest/animal";

// src/services/apiSlice.tsx
var apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: SEARCH_URL }),
  endpoints: (builder) => ({
    searchAnimals: builder.query({
      query: ({ searchTerm, pageNumber, pageSize }) => ({
        url: `/search?pageNumber=${pageNumber}&pageSize=${pageSize}&title=${searchTerm}&name=${searchTerm}`,
        method: "POST"
      })
    }),
    getAnimalDetails: builder.query({
      query: (id) => `?uid=${id}`
    })
  })
}), { useSearchAnimalsQuery, useGetAnimalDetailsQuery } = apiSlice;

// src/slices/selectedItemsSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  items: []
}, selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.items.push(action.payload);
    },
    unselectItem: (state, action) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
    toggleItem: (state, action) => {
      let index = state.items.findIndex(
        (item) => item.uid === action.payload.uid
      );
      index === -1 ? state.items.push(action.payload) : state.items.splice(index, 1);
    }
  }
}), { selectItem, unselectItem, unselectAll, toggleItem } = selectedItemsSlice.actions, selectedItemsSlice_default = selectedItemsSlice.reducer;

// src/slices/paginationSlice.ts
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
var initialState2 = {
  currentPage: 1,
  totalPages: 0
}, paginationSlice = createSlice2({
  name: "pagination",
  initialState: initialState2,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    }
  }
}), { setPage, setTotalPages } = paginationSlice.actions, paginationSlice_default = paginationSlice.reducer;

// src/slices/loadingSlice.tsx
import { createSlice as createSlice3 } from "@reduxjs/toolkit";
var initialState3 = {
  isLoading: !1
}, loadingSlice = createSlice3({
  name: "loading",
  initialState: initialState3,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
}), { setLoading } = loadingSlice.actions, loadingSlice_default = loadingSlice.reducer;

// src/middleware/loadingMiddleware.tsx
var loadingMiddleware = (storeAPI) => (next) => (action) => (apiSlice.endpoints.searchAnimals.matchPending(action) || apiSlice.endpoints.getAnimalDetails.matchPending(action) ? storeAPI.dispatch(setLoading(!0)) : (apiSlice.endpoints.searchAnimals.matchFulfilled(action) || apiSlice.endpoints.getAnimalDetails.matchFulfilled(action) || apiSlice.endpoints.searchAnimals.matchRejected(action) || apiSlice.endpoints.getAnimalDetails.matchRejected(action)) && storeAPI.dispatch(setLoading(!1)), next(action)), loadingMiddleware_default = loadingMiddleware;

// src/store.tsx
var store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsSlice_default,
    pagination: paginationSlice_default,
    loading: loadingSlice_default
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, loadingMiddleware_default)
});

// src/context/ThemeContext.tsx
import { createContext, useState, useEffect } from "react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var ThemeContext = createContext(!1), ThemeContextUpdate = createContext(() => {
}), ThemeProvider = ({ children }) => {
  let [darkTheme, setDarkTheme] = useState(!1);
  useEffect(() => {
    if (typeof window < "u") {
      let savedTheme = localStorage.getItem("theme");
      savedTheme && setDarkTheme(JSON.parse(savedTheme));
    }
  }, []), useEffect(() => {
    typeof window < "u" && localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);
  let toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };
  return /* @__PURE__ */ jsxDEV2(ThemeContext.Provider, { value: darkTheme, children: /* @__PURE__ */ jsxDEV2(ThemeContextUpdate.Provider, { value: toggleTheme, children }, void 0, !1, {
    fileName: "src/context/ThemeContext.tsx",
    lineNumber: 34,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "src/context/ThemeContext.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
};

// src/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links = () => [{ rel: "stylesheet", href: App_default }];
function App() {
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "src/root.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: /* @__PURE__ */ jsxDEV3(Provider, { store, children: /* @__PURE__ */ jsxDEV3(ThemeProvider, { children: [
      /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 28,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "src/root.tsx",
        lineNumber: 30,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "src/root.tsx",
      lineNumber: 26,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "src/root.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "src/root.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/root.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}

// src/routes/animals.$id.tsx
var animals_id_exports = {};
__export(animals_id_exports, {
  default: () => AnimalDetails,
  loader: () => loader
});
import { useEffect as useEffect2, useState as useState2 } from "react";
import { useLoaderData, Link } from "@remix-run/react";

// src/hooks/useTheme.tsx
import { useContext } from "react";
var useTheme = () => useContext(ThemeContext), useThemeUpdate = () => useContext(ThemeContextUpdate);

// loaders/animalLoader.tsx
import { json } from "@remix-run/node";
var animalLoader = async ({ params }) => {
  let { id } = params, response = await fetch(`${SEARCH_URL}?uid=${id}`);
  if (!response.ok)
    throw new Response("Error loading animal details", { status: 500 });
  let data = await response.json();
  return json({ data });
};

// src/routes/animals.$id.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var loader = animalLoader;
function AnimalDetails() {
  let { data } = useLoaderData(), [descriptions, setDescriptions] = useState2([]), darkTheme = useTheme();
  return useEffect2(() => {
    if (data) {
      let newDescriptions = [];
      data.animal.earthAnimal && newDescriptions.push("Earth Animal \u{1F43E}"), data.animal.earthInsect && newDescriptions.push("Earth Insect \u{1F997}"), data.animal.avian && newDescriptions.push("Avian \u{1F99C}"), data.animal.canine && newDescriptions.push("Canine \u{1F436}"), data.animal.feline && newDescriptions.push("Feline \u{1F63A}"), newDescriptions.length === 0 && newDescriptions.push("an infinitely cute animal \u{1F47B}"), setDescriptions(newDescriptions);
    }
  }, [data]), /* @__PURE__ */ jsxDEV4("div", { className: "animal-details", children: data ? /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { children: data.animal.name }, void 0, !1, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 35,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { children: descriptions.join(", ") }, void 0, !1, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 36,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4(Link, { to: "/", className: darkTheme ? "dark-link" : "light-link", children: "Hide Details" }, void 0, !1, {
      fileName: "src/routes/animals.$id.tsx",
      lineNumber: 37,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 34,
    columnNumber: 9
  }, this) : /* @__PURE__ */ jsxDEV4("p", { children: "No details available" }, void 0, !1, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 42,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "src/routes/animals.$id.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}

// src/routes/animals.tsx
var animals_exports = {};
__export(animals_exports, {
  default: () => Index,
  loader: () => loader2
});
import { useEffect as useEffect4, useState as useState4 } from "react";
import { useLoaderData as useLoaderData2, Outlet as Outlet2, useNavigate } from "@remix-run/react";
import { json as json2 } from "@remix-run/node";
import { useDispatch as useDispatch3 } from "react-redux";

// src/components/Search.tsx
import { useState as useState3, useEffect as useEffect3 } from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var Search = ({ onSearch, defaultValue = "" }) => {
  let [searchTerm, setSearchTerm] = useState3(defaultValue);
  return useEffect3(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]), /* @__PURE__ */ jsxDEV5("div", { className: "top-section", children: [
    /* @__PURE__ */ jsxDEV5(
      "input",
      {
        type: "text",
        value: searchTerm,
        onChange: (e) => {
          setSearchTerm(e.target.value);
        },
        placeholder: "Find an Animal \u{1F50D}"
      },
      void 0,
      !1,
      {
        fileName: "src/components/Search.tsx",
        lineNumber: 28,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV5("button", { onClick: () => {
      let trimmedSearchTerm = searchTerm.trim();
      setSearchTerm(trimmedSearchTerm), localStorage.setItem("searchTerm", trimmedSearchTerm), onSearch(trimmedSearchTerm);
    }, children: "Search" }, void 0, !1, {
      fileName: "src/components/Search.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/components/Search.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}, Search_default = Search;

// src/components/SearchResults.tsx
import { Link as Link2 } from "react-router-dom";

// src/components/Checkbox.tsx
import { useDispatch, useSelector } from "react-redux";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var Checkbox = ({ item }) => {
  let dispatch = useDispatch(), isChecked = useSelector(
    (state) => state.selectedItems.items
  ).some((i) => i.uid === item.uid);
  return /* @__PURE__ */ jsxDEV6(
    "input",
    {
      className: "light-checkbox",
      type: "checkbox",
      checked: isChecked,
      onChange: () => {
        dispatch(toggleItem(item));
      }
    },
    void 0,
    !1,
    {
      fileName: "src/components/Checkbox.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
}, Checkbox_default = Checkbox;

// src/components/SearchResults.tsx
import { useSearchParams } from "react-router-dom";
import { useSelector as useSelector2 } from "react-redux";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var SearchResults = ({ results }) => {
  let [searchParams] = useSearchParams(), searchTerm = searchParams.get("search") || "", darkTheme = useTheme(), currentPage = useSelector2(
    (state) => state.pagination.currentPage
  );
  return /* @__PURE__ */ jsxDEV7("div", { className: "search-results", children: [
    /* @__PURE__ */ jsxDEV7("h2", { children: "Search Results" }, void 0, !1, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    results.length > 0 ? /* @__PURE__ */ jsxDEV7("ul", { children: results.map(
      (result) => /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxDEV7(Checkbox_default, { item: result }, void 0, !1, {
          fileName: "src/components/SearchResults.tsx",
          lineNumber: 30,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV7(
          Link2,
          {
            to: `/animals/${result.uid}?search=${searchTerm}&page=${currentPage}`,
            className: darkTheme ? "dark-animalLink" : "light-animalLink",
            children: /* @__PURE__ */ jsxDEV7("strong", { children: result.name }, void 0, !1, {
              fileName: "src/components/SearchResults.tsx",
              lineNumber: 35,
              columnNumber: 19
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "src/components/SearchResults.tsx",
            lineNumber: 31,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "src/components/SearchResults.tsx",
        lineNumber: 29,
        columnNumber: 15
      }, this) }, result.uid, !1, {
        fileName: "src/components/SearchResults.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this)
    ) }, void 0, !1, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this) : /* @__PURE__ */ jsxDEV7("div", { children: "No animal found. Try again\u{1F638}" }, void 0, !1, {
      fileName: "src/components/SearchResults.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/components/SearchResults.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}, SearchResults_default = SearchResults;

// src/components/Pagination.tsx
import { Link as Link3, useSearchParams as useSearchParams2 } from "react-router-dom";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var Pagination = ({ currentPage, totalPages }) => {
  let [searchParams] = useSearchParams2(), searchTerm = searchParams.get("search") || "", darkTheme = useTheme();
  return /* @__PURE__ */ jsxDEV8("div", { className: "pagination", children: [
    currentPage > 1 && /* @__PURE__ */ jsxDEV8(
      Link3,
      {
        to: `?search=${searchTerm}&page=${currentPage - 1}`,
        className: darkTheme ? "dark-link" : "light-link",
        children: "Previous"
      },
      void 0,
      !1,
      {
        fileName: "src/components/Pagination.tsx",
        lineNumber: 18,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV8("span", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] }, void 0, !0, {
      fileName: "src/components/Pagination.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    currentPage < totalPages && /* @__PURE__ */ jsxDEV8(
      Link3,
      {
        to: `?search=${searchTerm}&page=${currentPage + 1}`,
        className: darkTheme ? "dark-link" : "light-link",
        children: "Next"
      },
      void 0,
      !1,
      {
        fileName: "src/components/Pagination.tsx",
        lineNumber: 29,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "src/components/Pagination.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}, Pagination_default = Pagination;

// src/components/Flyout.tsx
import { useDispatch as useDispatch2, useSelector as useSelector3 } from "react-redux";

// src/utils/csx.tsx
var downloadCSV = (items) => {
  let headers = ["UID", "Name", "Description"], rows = items.map((item) => {
    let descriptions = [];
    return item.earthAnimal && descriptions.push("Earth Animal"), item.earthInsect && descriptions.push("Earth Insect"), item.avian && descriptions.push("Avian"), item.canine && descriptions.push("Canine"), item.feline && descriptions.push("Feline"), descriptions.length === 0 && descriptions.push("an infinitely cute animal"), [item.uid, item.name, descriptions.join(", ")];
  }), csvContent = [headers, ...rows].map((e) => e.join(",")).join(`
`), blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" }), url = URL.createObjectURL(blob), link = document.createElement("a");
  link.href = url, link.download = `${items.length}_animals.csv`, link.click(), URL.revokeObjectURL(url);
};

// src/components/Flyout.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Flyout = () => {
  let darkTheme = useTheme(), dispatch = useDispatch2(), selectedItems = useSelector3(
    (state) => state.selectedItems.items
  ), handleUnselectAll = () => {
    dispatch(unselectAll());
  }, handleDownload = () => {
    downloadCSV(selectedItems);
  };
  return selectedItems.length === 0 ? null : /* @__PURE__ */ jsxDEV9("div", { className: darkTheme ? "dark-flyout" : "light-flyout", children: [
    /* @__PURE__ */ jsxDEV9("span", { children: [
      selectedItems.length,
      " animals are selected"
    ] }, void 0, !0, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("button", { onClick: handleUnselectAll, children: "Unselect all" }, void 0, !1, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("button", { onClick: handleDownload, children: "Download" }, void 0, !1, {
      fileName: "src/components/Flyout.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/components/Flyout.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}, Flyout_default = Flyout;

// src/services/fetchAnimalData.tsx
var fetchAnimalData = async (searchTerm = "", page = 1) => {
  try {
    if (typeof window < "u") {
      let storedSearchTerm = localStorage.getItem("searchTerm");
      storedSearchTerm && (searchTerm = storedSearchTerm);
    }
    let response = await fetch(
      `${SEARCH_URL}/search?pageNumber=${page - 1}&pageSize=${15}&title=${searchTerm}&name=${searchTerm}`,
      {
        method: "POST"
      }
    );
    if (!response.ok)
      throw new Error(`Error fetching data: ${response.statusText}`);
    let data = await response.json();
    return {
      initialSearchTerm: searchTerm,
      initialPage: page,
      initialAnimals: data.animals || [],
      totalPages: data.page.totalPages || 1
    };
  } catch (error) {
    return console.error("Failed to fetch animal data:", error), {
      initialSearchTerm: searchTerm,
      initialPage: page,
      initialAnimals: [],
      totalPages: 1
    };
  }
};

// src/routes/animals.tsx
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var loader2 = async ({ request }) => {
  let url = new URL(request.url), searchTerm = url.searchParams.get("search") || "";
  typeof window < "u" && (searchTerm = localStorage.getItem("searchTerm") || "");
  let page = parseInt(url.searchParams.get("page") || "1", 10), { initialAnimals, totalPages } = await fetchAnimalData(
    searchTerm,
    page
  );
  return json2({
    animals: initialAnimals,
    searchTerm,
    page,
    totalPages
  });
};
function Index() {
  let { animals, searchTerm, page, totalPages } = useLoaderData2(), dispatch = useDispatch3(), darkTheme = useTheme(), toggleTheme = useThemeUpdate(), navigate = useNavigate(), [isLoading, setIsLoading] = useState4(!0);
  return useEffect4(() => {
    setIsLoading(!1), dispatch(setPage(page)), dispatch(setTotalPages(totalPages));
  }, [page, totalPages, dispatch]), /* @__PURE__ */ jsxDEV10("div", { className: darkTheme ? "dark-MainWrapper" : "light-MainWrapper", children: [
    /* @__PURE__ */ jsxDEV10("button", { onClick: toggleTheme, className: "themeButton", children: darkTheme ? "\u{1F31E} Light Mode" : "\u{1F31C} Dark Mode" }, void 0, !1, {
      fileName: "src/routes/animals.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { "data-testid": "home", className: darkTheme ? "dark-App" : "light-App", children: [
      /* @__PURE__ */ jsxDEV10("div", { className: "top-section", children: /* @__PURE__ */ jsxDEV10(Search_default, { onSearch: (term) => {
        setIsLoading(!0), navigate(`?search=${encodeURIComponent(term)}&page=1`);
      }, defaultValue: searchTerm }, void 0, !1, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "content-section", children: [
        /* @__PURE__ */ jsxDEV10("div", { className: "left-section", children: [
          isLoading ? /* @__PURE__ */ jsxDEV10("div", { className: "loader-container", children: /* @__PURE__ */ jsxDEV10("div", { className: "loader", children: "Loading..." }, void 0, !1, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 75,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this) : animals.length > 0 ? /* @__PURE__ */ jsxDEV10(SearchResults_default, { results: animals }, void 0, !1, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 78,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV10("div", { className: "no-results", children: "No animals found matching your search." }, void 0, !1, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV10(Pagination_default, { currentPage: page, totalPages }, void 0, !1, {
            fileName: "src/routes/animals.tsx",
            lineNumber: 84,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV10("div", { className: "right-section", children: /* @__PURE__ */ jsxDEV10(Outlet2, {}, void 0, !1, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 87,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "src/routes/animals.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10(Flyout_default, {}, void 0, !1, {
        fileName: "src/routes/animals.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "src/routes/animals.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/routes/animals.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
}

// src/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  loader: () => loader3
});
import { redirect } from "@remix-run/node";
var loader3 = async () => redirect("/animals");

// src/routes/404.tsx
var __exports = {};
__export(__exports, {
  default: () => __default
});
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var NotFound = () => {
  let darkTheme = useTheme();
  return /* @__PURE__ */ jsxDEV11("div", { className: darkTheme ? "dark-NotFound" : "light-NotFound", children: [
    /* @__PURE__ */ jsxDEV11("h2", { children: "404 Not Found \u{1F63F}" }, void 0, !1, {
      fileName: "src/routes/404.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("p", { children: "The page you are looking for does not exist." }, void 0, !1, {
      fileName: "src/routes/404.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "src/routes/404.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}, __default = NotFound;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-E3HEGBWX.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-4A4AD2BB.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-D7BU4XKW.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-TPQH6JTW.js", imports: ["/build/_shared/chunk-FBEIXTW6.js", "/build/_shared/chunk-3EL3KC52.js", "/build/_shared/chunk-JBUPV3AI.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/404": { id: "routes/404", parentId: "root", path: "404", index: void 0, caseSensitive: void 0, module: "/build/routes/404-YUH7FAR2.js", imports: ["/build/_shared/chunk-K7PQKRHU.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-QW5LNJTG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/animals": { id: "routes/animals", parentId: "root", path: "animals", index: void 0, caseSensitive: void 0, module: "/build/routes/animals-5UTBZW65.js", imports: ["/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-K7PQKRHU.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/animals.$id": { id: "routes/animals.$id", parentId: "routes/animals", path: ":id", index: void 0, caseSensitive: void 0, module: "/build/routes/animals.$id-2XMTPY7E.js", imports: ["/build/_shared/chunk-3EL3KC52.js", "/build/_shared/chunk-JBUPV3AI.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "2a91d82f", hmr: { runtime: "/build/_shared\\chunk-D7BU4XKW.js", timestamp: 1723412705660 }, url: "/build/manifest-2A91D82F.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1, unstable_lazyRouteDiscovery: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/animals.$id": {
    id: "routes/animals.$id",
    parentId: "routes/animals",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: animals_id_exports
  },
  "routes/animals": {
    id: "routes/animals",
    parentId: "root",
    path: "animals",
    index: void 0,
    caseSensitive: void 0,
    module: animals_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
