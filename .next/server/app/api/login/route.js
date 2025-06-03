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
exports.id = "app/api/login/route";
exports.ids = ["app/api/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/login/route.ts":
/*!********************************!*\
  !*** ./app/api/login/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// import { checkRateLimit } from '../rateLimiter';\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://nciwkwzwiiscltkoacin.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaXdrd3p3aWlzY2x0a29hY2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNzg5MDIsImV4cCI6MjA2Mzk1NDkwMn0.iz_NnSP9DM42BUdQuMrRRQqAC2it4OCZEIs54uc3iEQ\", {\n    auth: {\n        autoRefreshToken: false,\n        persistSession: false,\n        detectSessionInUrl: false\n    }\n});\nasync function POST(req) {\n    async function isEmailAvailable(email) {\n        const { data, error } = await supabase.from('profiles').select('id').eq('email', email).maybeSingle();\n        if (error) {\n            console.error('Database error:', error);\n            return {\n                available: false,\n                error: 'Database error'\n            };\n        }\n        return {\n            available: !data\n        };\n    }\n    try {\n        const userInfo = await req.json();\n        // returns true if user isn't in db , and flase if the user \n        // let findUser = await isEmailAvailable(userInfo.email);\n        const { available, error } = await isEmailAvailable(userInfo.email);\n        if (error) {\n            return new Response(JSON.stringify({\n                error: 'Service unavailable'\n            }), {\n                status: 503\n            });\n        }\n        if (available) {\n            return new Response(JSON.stringify({\n                error: 'Email does not exist, try making an account.'\n            }), {\n                status: 409\n            });\n        }\n        // user is in db\n        if (!available) {\n            let email = userInfo.email;\n            let password = userInfo.password;\n            const { data, error: signInError } = await supabase.auth.signInWithPassword({\n                email: email,\n                password: password\n            });\n            // sign in error \n            if (signInError) {\n                return new Response(JSON.stringify({\n                    error: signInError.message\n                }), {\n                    status: 400\n                });\n            }\n            // 3. Success response\n            return new Response(JSON.stringify({\n                success: true,\n                userId: data.user?.id\n            }), {\n                status: 201\n            });\n        }\n    } catch  {\n        return new Response(JSON.stringify({\n            error: \"Internal server error\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW9EO0FBQ3BELG1EQUFtRDtBQUVuRCxNQUFNQyxXQUFXRCxtRUFBWUEsQ0FBQ0UsMENBQW9DLEVBQVlBLGtOQUF5QyxFQUFZO0lBQy9ISSxNQUFNO1FBQ0ZDLGtCQUFrQjtRQUNsQkMsZ0JBQWdCO1FBQ2hCQyxvQkFBb0I7SUFDeEI7QUFDSjtBQUdPLGVBQWVDLEtBQUtDLEdBQVk7SUFFbkMsZUFBZUMsaUJBQWlCQyxLQUFhO1FBQ3pDLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNZCxTQUN6QmUsSUFBSSxDQUFDLFlBQ0xDLE1BQU0sQ0FBQyxNQUNQQyxFQUFFLENBQUMsU0FBU0wsT0FDWk0sV0FBVztRQUVoQixJQUFJSixPQUFPO1lBQ1BLLFFBQVFMLEtBQUssQ0FBQyxtQkFBbUJBO1lBQ2pDLE9BQU87Z0JBQUVNLFdBQVc7Z0JBQU9OLE9BQU87WUFBaUI7UUFDdkQ7UUFDQSxPQUFPO1lBQUVNLFdBQVcsQ0FBQ1A7UUFBSztJQUM5QjtJQUVBLElBQUk7UUFDQSxNQUFNUSxXQUFXLE1BQU1YLElBQUlZLElBQUk7UUFFL0IsNERBQTREO1FBQzVELHlEQUF5RDtRQUV6RCxNQUFNLEVBQUVGLFNBQVMsRUFBRU4sS0FBSyxFQUFFLEdBQUcsTUFBTUgsaUJBQWlCVSxTQUFTVCxLQUFLO1FBQ2xFLElBQUlFLE9BQU87WUFDUCxPQUFPLElBQUlTLFNBQ1BDLEtBQUtDLFNBQVMsQ0FBQztnQkFBRVgsT0FBTztZQUFzQixJQUM5QztnQkFBRVksUUFBUTtZQUFJO1FBRXRCO1FBQ0EsSUFBSU4sV0FBVztZQUNYLE9BQU8sSUFBSUcsU0FDUEMsS0FBS0MsU0FBUyxDQUFDO2dCQUFFWCxPQUFPO1lBQStDLElBQ3ZFO2dCQUFFWSxRQUFRO1lBQUk7UUFFdEI7UUFFQSxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDTixXQUFXO1lBQ1osSUFBSVIsUUFBZ0JTLFNBQVNULEtBQUs7WUFDbEMsSUFBSWUsV0FBbUJOLFNBQVNNLFFBQVE7WUFFeEMsTUFBTSxFQUFFZCxJQUFJLEVBQUVDLE9BQU9jLFdBQVcsRUFBRSxHQUFHLE1BQU01QixTQUFTSyxJQUFJLENBQUN3QixrQkFBa0IsQ0FBQztnQkFDeEVqQixPQUFPQTtnQkFDUGUsVUFBVUE7WUFDZDtZQUVBLGlCQUFpQjtZQUNqQixJQUFJQyxhQUFhO2dCQUNiLE9BQU8sSUFBSUwsU0FDUEMsS0FBS0MsU0FBUyxDQUFDO29CQUFFWCxPQUFPYyxZQUFZRSxPQUFPO2dCQUFDLElBQzVDO29CQUFFSixRQUFRO2dCQUFJO1lBRXRCO1lBRUEsc0JBQXNCO1lBQ3RCLE9BQU8sSUFBSUgsU0FDUEMsS0FBS0MsU0FBUyxDQUFDO2dCQUNYTSxTQUFTO2dCQUNUQyxRQUFRbkIsS0FBS29CLElBQUksRUFBRUM7WUFDdkIsSUFDQTtnQkFBRVIsUUFBUTtZQUFJO1FBR3RCO0lBRUosRUFDQSxPQUFNO1FBQ0YsT0FBTyxJQUFJSCxTQUNQQyxLQUFLQyxTQUFTLENBQUM7WUFBRVgsT0FBTztRQUF3QixJQUNoRDtZQUFFWSxRQUFRO1FBQUk7SUFFdEI7QUFDSiIsInNvdXJjZXMiOlsiL1VzZXJzL21hYy9EZXNrdG9wL3Byb2plY3RzL2ZvbW8tZmluZGVyL2FwcC9hcGkvbG9naW4vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xuLy8gaW1wb3J0IHsgY2hlY2tSYXRlTGltaXQgfSBmcm9tICcuLi9yYXRlTGltaXRlcic7XG5cbmNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCBhcyBzdHJpbmcsIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIGFzIHN0cmluZywge1xuICAgIGF1dGg6IHtcbiAgICAgICAgYXV0b1JlZnJlc2hUb2tlbjogZmFsc2UsXG4gICAgICAgIHBlcnNpc3RTZXNzaW9uOiBmYWxzZSxcbiAgICAgICAgZGV0ZWN0U2Vzc2lvbkluVXJsOiBmYWxzZVxuICAgIH1cbn0pXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBpc0VtYWlsQXZhaWxhYmxlKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHsgYXZhaWxhYmxlOiBib29sZWFuLCBlcnJvcj86IHN0cmluZyB9PiB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgICAuZnJvbSgncHJvZmlsZXMnKVxuICAgICAgICAgICAgLnNlbGVjdCgnaWQnKVxuICAgICAgICAgICAgLmVxKCdlbWFpbCcsIGVtYWlsKVxuICAgICAgICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4geyBhdmFpbGFibGU6IGZhbHNlLCBlcnJvcjogJ0RhdGFiYXNlIGVycm9yJyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGF2YWlsYWJsZTogIWRhdGEgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIHVzZXIgaXNuJ3QgaW4gZGIgLCBhbmQgZmxhc2UgaWYgdGhlIHVzZXIgXG4gICAgICAgIC8vIGxldCBmaW5kVXNlciA9IGF3YWl0IGlzRW1haWxBdmFpbGFibGUodXNlckluZm8uZW1haWwpO1xuXG4gICAgICAgIGNvbnN0IHsgYXZhaWxhYmxlLCBlcnJvciB9ID0gYXdhaXQgaXNFbWFpbEF2YWlsYWJsZSh1c2VySW5mby5lbWFpbCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnU2VydmljZSB1bmF2YWlsYWJsZScgfSksXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDUwMyB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0VtYWlsIGRvZXMgbm90IGV4aXN0LCB0cnkgbWFraW5nIGFuIGFjY291bnQuJyB9KSxcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDA5IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1c2VyIGlzIGluIGRiXG4gICAgICAgIGlmICghYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBsZXQgZW1haWw6IHN0cmluZyA9IHVzZXJJbmZvLmVtYWlsO1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkOiBzdHJpbmcgPSB1c2VySW5mby5wYXNzd29yZDtcblxuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvcjogc2lnbkluRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluV2l0aFBhc3N3b3JkKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gc2lnbiBpbiBlcnJvciBcbiAgICAgICAgICAgIGlmIChzaWduSW5FcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IHNpZ25JbkVycm9yLm1lc3NhZ2UgfSksXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDMuIFN1Y2Nlc3MgcmVzcG9uc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IGRhdGEudXNlcj8uaWRcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogMjAxIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSksXG4gICAgICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgICAgKTtcbiAgICB9XG59Il0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiYXV0aCIsImF1dG9SZWZyZXNoVG9rZW4iLCJwZXJzaXN0U2Vzc2lvbiIsImRldGVjdFNlc3Npb25JblVybCIsIlBPU1QiLCJyZXEiLCJpc0VtYWlsQXZhaWxhYmxlIiwiZW1haWwiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJtYXliZVNpbmdsZSIsImNvbnNvbGUiLCJhdmFpbGFibGUiLCJ1c2VySW5mbyIsImpzb24iLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGF0dXMiLCJwYXNzd29yZCIsInNpZ25JbkVycm9yIiwic2lnbkluV2l0aFBhc3N3b3JkIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJ1c2VySWQiLCJ1c2VyIiwiaWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mac_Desktop_projects_fomo_finder_app_api_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/login/route.ts */ \"(rsc)/./app/api/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/route\",\n        pathname: \"/api/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/route\"\n    },\n    resolvedPagePath: \"/Users/mac/Desktop/projects/fomo-finder/app/api/login/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mac_Desktop_projects_fomo_finder_app_api_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hYyUyRkRlc2t0b3AlMkZwcm9qZWN0cyUyRmZvbW8tZmluZGVyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hYyUyRkRlc2t0b3AlMkZwcm9qZWN0cyUyRmZvbW8tZmluZGVyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNjO0FBQzNGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvcHJvamVjdHMvZm9tby1maW5kZXIvYXBwL2FwaS9sb2dpbi9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbWFjL0Rlc2t0b3AvcHJvamVjdHMvZm9tby1maW5kZXIvYXBwL2FwaS9sb2dpbi9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

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

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

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

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDesktop%2Fprojects%2Ffomo-finder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();