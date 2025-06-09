/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/google/route";
exports.ids = ["app/api/google/route"];
exports.modules = {

/***/ "(rsc)/./app/api/google/route.ts":
/*!*********************************!*\
  !*** ./app/api/google/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var google_auth_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-auth-library */ \"(rsc)/./node_modules/google-auth-library/build/src/index.js\");\n/* harmony import */ var _supabase_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supabase-server */ \"(rsc)/./app/api/google/supabase-server.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n// app/api/google/route.ts\n\n\n\nconst client = new google_auth_library__WEBPACK_IMPORTED_MODULE_0__.OAuth2Client(\"966312611807-trjbfkl3n602dd4rkqvgf8hbfbggi2a0.apps.googleusercontent.com\");\nasync function POST(request) {\n    // const cookieStore = await cookies() // Get cookies async\n    const { token } = await request.json();\n    try {\n        const ticket = await client.verifyIdToken({\n            idToken: token,\n            audience: \"966312611807-trjbfkl3n602dd4rkqvgf8hbfbggi2a0.apps.googleusercontent.com\"\n        });\n        const payload = ticket.getPayload();\n        if (!payload) throw new Error(\"No payload from Google\");\n        const { email, name, picture, sub } = payload;\n        const supabase = await (0,_supabase_server__WEBPACK_IMPORTED_MODULE_1__.supabaseServer)() // Now properly awaited\n        ;\n        // Rest of your code remains the same...\n        const { data, error } = await supabase.auth.signInWithOAuth({\n            provider: 'google',\n            options: {\n                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,\n                skipBrowserRedirect: true\n            }\n        });\n        if (error) throw error;\n        if (!data?.url) throw new Error(\"No redirect URL returned\");\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            url: data.url,\n            email,\n            name,\n            picture\n        });\n    } catch (error) {\n        console.error('Google auth error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: 'Authentication failed'\n        }, {\n            status: 401\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dvb2dsZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEJBQTBCO0FBQ3dCO0FBQ0E7QUFDUjtBQUcxQyxNQUFNRyxTQUFTLElBQUlILDZEQUFZQSxDQUFDSSwwRUFBd0M7QUFFakUsZUFBZUcsS0FBS0MsT0FBZ0I7SUFDdkMsMkRBQTJEO0lBQzNELE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTUQsUUFBUUUsSUFBSTtJQUVwQyxJQUFJO1FBQ0EsTUFBTUMsU0FBUyxNQUFNUixPQUFPUyxhQUFhLENBQUM7WUFDdENDLFNBQVNKO1lBQ1RLLFVBQVVWLDBFQUF3QztRQUN0RDtRQUVBLE1BQU1XLFVBQVVKLE9BQU9LLFVBQVU7UUFDakMsSUFBSSxDQUFDRCxTQUFTLE1BQU0sSUFBSUUsTUFBTTtRQUU5QixNQUFNLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxPQUFPLEVBQUVDLEdBQUcsRUFBRSxHQUFHTjtRQUN0QyxNQUFNTyxXQUFXLE1BQU1yQixnRUFBY0EsR0FBRyx1QkFBdUI7O1FBRS9ELHdDQUF3QztRQUN4QyxNQUFNLEVBQUVzQixJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1GLFNBQVNHLElBQUksQ0FBQ0MsZUFBZSxDQUFDO1lBQ3hEQyxVQUFVO1lBQ1ZDLFNBQVM7Z0JBQ0xDLFlBQVksR0FBR3pCLFFBQVFDLEdBQUcsQ0FBQ3lCLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztnQkFDL0RDLHFCQUFxQjtZQUN6QjtRQUNKO1FBRUEsSUFBSVAsT0FBTyxNQUFNQTtRQUNqQixJQUFJLENBQUNELE1BQU1TLEtBQUssTUFBTSxJQUFJZixNQUFNO1FBRWhDLE9BQU9mLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFDckJzQixLQUFLVCxLQUFLUyxHQUFHO1lBQ2JkO1lBQ0FDO1lBQ0FDO1FBQ0o7SUFFSixFQUFFLE9BQU9JLE9BQU87UUFDWlMsUUFBUVQsS0FBSyxDQUFDLHNCQUFzQkE7UUFDcEMsT0FBT3RCLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3BCO1lBQUVjLE9BQU87UUFBd0IsR0FDakM7WUFBRVUsUUFBUTtRQUFJO0lBRXRCO0FBQ0oiLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWMvRGVza3RvcC9wcm9qZWN0cy9mb21vLWZpbmRlci9hcHAvYXBpL2dvb2dsZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2dvb2dsZS9yb3V0ZS50c1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSAnZ29vZ2xlLWF1dGgtbGlicmFyeSdcbmltcG9ydCB7IHN1cGFiYXNlU2VydmVyIH0gZnJvbSAnLi9zdXBhYmFzZS1zZXJ2ZXInXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnXG5cbmNvbnN0IGNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR09PR0xFX0NMSUVOVF9JRClcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIC8vIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpIC8vIEdldCBjb29raWVzIGFzeW5jXG4gICAgY29uc3QgeyB0b2tlbiB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRpY2tldCA9IGF3YWl0IGNsaWVudC52ZXJpZnlJZFRva2VuKHtcbiAgICAgICAgICAgIGlkVG9rZW46IHRva2VuLFxuICAgICAgICAgICAgYXVkaWVuY2U6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dPT0dMRV9DTElFTlRfSUQsXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRpY2tldC5nZXRQYXlsb2FkKClcbiAgICAgICAgaWYgKCFwYXlsb2FkKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBwYXlsb2FkIGZyb20gR29vZ2xlXCIpXG5cbiAgICAgICAgY29uc3QgeyBlbWFpbCwgbmFtZSwgcGljdHVyZSwgc3ViIH0gPSBwYXlsb2FkXG4gICAgICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgc3VwYWJhc2VTZXJ2ZXIoKSAvLyBOb3cgcHJvcGVybHkgYXdhaXRlZFxuXG4gICAgICAgIC8vIFJlc3Qgb2YgeW91ciBjb2RlIHJlbWFpbnMgdGhlIHNhbWUuLi5cbiAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduSW5XaXRoT0F1dGgoe1xuICAgICAgICAgICAgcHJvdmlkZXI6ICdnb29nbGUnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICAgICAgICBza2lwQnJvd3NlclJlZGlyZWN0OiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3JcbiAgICAgICAgaWYgKCFkYXRhPy51cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIHJlZGlyZWN0IFVSTCByZXR1cm5lZFwiKVxuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgICAgICB1cmw6IGRhdGEudXJsLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcGljdHVyZVxuICAgICAgICB9KVxuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignR29vZ2xlIGF1dGggZXJyb3I6JywgZXJyb3IpXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgIHsgZXJyb3I6ICdBdXRoZW50aWNhdGlvbiBmYWlsZWQnIH0sXG4gICAgICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICAgKVxuICAgIH1cbn0iXSwibmFtZXMiOlsiT0F1dGgyQ2xpZW50Iiwic3VwYWJhc2VTZXJ2ZXIiLCJOZXh0UmVzcG9uc2UiLCJjbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfR09PR0xFX0NMSUVOVF9JRCIsIlBPU1QiLCJyZXF1ZXN0IiwidG9rZW4iLCJqc29uIiwidGlja2V0IiwidmVyaWZ5SWRUb2tlbiIsImlkVG9rZW4iLCJhdWRpZW5jZSIsInBheWxvYWQiLCJnZXRQYXlsb2FkIiwiRXJyb3IiLCJlbWFpbCIsIm5hbWUiLCJwaWN0dXJlIiwic3ViIiwic3VwYWJhc2UiLCJkYXRhIiwiZXJyb3IiLCJhdXRoIiwic2lnbkluV2l0aE9BdXRoIiwicHJvdmlkZXIiLCJvcHRpb25zIiwicmVkaXJlY3RUbyIsIk5FWFRfUFVCTElDX1NJVEVfVVJMIiwic2tpcEJyb3dzZXJSZWRpcmVjdCIsInVybCIsImNvbnNvbGUiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/google/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/google/supabase-server.ts":
/*!*******************************************!*\
  !*** ./app/api/google/supabase-server.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabaseServer: () => (/* binding */ supabaseServer)\n/* harmony export */ });\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/auth-helpers-nextjs */ \"(rsc)/./node_modules/@supabase/auth-helpers-nextjs/dist/index.js\");\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n// app/utils/supabase-server.ts\n\n\nasync function supabaseServer() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)() // This must be awaited\n    ;\n    return (0,_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_0__.createServerComponentClient)({\n        cookies: ()=>cookieStore\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dvb2dsZS9zdXBhYmFzZS1zZXJ2ZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLCtCQUErQjtBQUM0QztBQUNyQztBQUkvQixlQUFlRTtJQUNwQixNQUFNQyxjQUFjRixxREFBT0EsR0FBRyx1QkFBdUI7O0lBQ3JELE9BQU9ELDBGQUEyQkEsQ0FBVztRQUFFQyxTQUFTLElBQU1FO0lBQVk7QUFDNUUiLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWMvRGVza3RvcC9wcm9qZWN0cy9mb21vLWZpbmRlci9hcHAvYXBpL2dvb2dsZS9zdXBhYmFzZS1zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL3V0aWxzL3N1cGFiYXNlLXNlcnZlci50c1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyQ29tcG9uZW50Q2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2F1dGgtaGVscGVycy1uZXh0anMnXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJ1xuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tICcuL3R5cGVzJ1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdXBhYmFzZVNlcnZlcigpIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCkgLy8gVGhpcyBtdXN0IGJlIGF3YWl0ZWRcbiAgcmV0dXJuIGNyZWF0ZVNlcnZlckNvbXBvbmVudENsaWVudDxEYXRhYmFzZT4oeyBjb29raWVzOiAoKSA9PiBjb29raWVTdG9yZSB9KVxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZVNlcnZlckNvbXBvbmVudENsaWVudCIsImNvb2tpZXMiLCJzdXBhYmFzZVNlcnZlciIsImNvb2tpZVN0b3JlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/google/supabase-server.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive":
/*!************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/main/ sync ***!
  \************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/@supabase/realtime-js/dist/main sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgoogle%2Froute&page=%2Fapi%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoogle%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgoogle%2Froute&page=%2Fapi%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoogle%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mac_Desktop_projects_fomo_finder_app_api_google_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/google/route.ts */ \"(rsc)/./app/api/google/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/google/route\",\n        pathname: \"/api/google\",\n        filename: \"route\",\n        bundlePath: \"app/api/google/route\"\n    },\n    resolvedPagePath: \"/Users/mac/Desktop/projects/fomo-finder/app/api/google/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mac_Desktop_projects_fomo_finder_app_api_google_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnb29nbGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmdvb2dsZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmdvb2dsZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hYyUyRkRlc2t0b3AlMkZwcm9qZWN0cyUyRmZvbW8tZmluZGVyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hYyUyRkRlc2t0b3AlMkZwcm9qZWN0cyUyRmZvbW8tZmluZGVyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNlO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvcHJvamVjdHMvZm9tby1maW5kZXIvYXBwL2FwaS9nb29nbGUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dvb2dsZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2dvb2dsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ29vZ2xlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hYy9EZXNrdG9wL3Byb2plY3RzL2ZvbW8tZmluZGVyL2FwcC9hcGkvZ29vZ2xlL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgoogle%2Froute&page=%2Fapi%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoogle%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/google-auth-library","vendor-chunks/gaxios","vendor-chunks/ws","vendor-chunks/whatwg-url","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/tr46","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/webidl-conversions","vendor-chunks/supports-color","vendor-chunks/set-cookie-parser","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/is-stream","vendor-chunks/has-flag","vendor-chunks/gtoken","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgoogle%2Froute&page=%2Fapi%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoogle%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();