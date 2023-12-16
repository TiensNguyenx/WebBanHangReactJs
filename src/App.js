import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment, useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { ToastContainer, } from 'react-toastify';
import { UserContext } from "./context/UserContext";
import DefalutInformation from "./components/Layout/components/DefaultInformation";
function App() {
  const { loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('token'))
    }

  }, [])

  return (
    <>
      <PayPalScriptProvider options={{ "client-id": "ASTZlA7vExZP1LfA0qLiwOfFnRUvdBPfJlpcKPxxgnF0ldF8afKqjxWIMr1tbo3rsc1hp2gG2PmubaK5" }}>
        <Router>

          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout || DefaultLayout

                if (route.layout) {

                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                if (route.layout === DefalutInformation) {
                  Layout = DefalutInformation
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>   <Page /></Layout>

                    }
                  />
                );
              })}
            </Routes>
          </div>

        </Router>
      </PayPalScriptProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />


    </>
  );
}

export default App;
