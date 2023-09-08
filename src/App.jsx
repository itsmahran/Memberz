import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import {
  Link,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { store } from "./store";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/members" element={<Members />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

const Root = () => {
  return (
    <>
      <main>
        <Sidebar />
        <div className="flex">
          <aside className="w-1/6 h-screen"></aside>
          <div className="flex-1">
            <Navbar />
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
