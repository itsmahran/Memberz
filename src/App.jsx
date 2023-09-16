import { useEffect, Suspense, lazy, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Member from "./pages/Member/Member";
import Payments from "./pages/Payments";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { store } from "./store";
import Auth from "./components/auth/Auth";
import { auth } from "./config/firebase";
import { setIsUserSignedIn } from "./app/auth/authSlice";
import { setIsAppLoading } from "./app/appSlice";
import Expenses from "./pages/Expenses";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/member" element={<Member />} >
          
        </Route>
        <Route path="/payment" element={<Payments />} />
        <Route path="/expense" element={<Expenses />} />
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
  const dispatch = useDispatch();
  const { isUserSignedIn } = useSelector((state) => state.auth);
  const { isAppLoading } = useSelector((state) => state.app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setIsUserSignedIn({ isUserSignedIn: true }));
      } else {
        dispatch(setIsUserSignedIn({ isUserSignedIn: false }));
      }
      dispatch(setIsAppLoading(false));
    });
  }, [isAppLoading]);

  return (
    <main>
      {isAppLoading ? (
        <div>Loading..</div>
      ) : isUserSignedIn ? (
        <>
          <Sidebar />
          <div className="flex">
            <aside className="w-1/6 h-screen hidden sm:block"></aside>
            <div className="flex-1">
              <Navbar />
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </main>
  );
};

export default App;
