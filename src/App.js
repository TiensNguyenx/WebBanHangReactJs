import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment, useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </>
  );
}

export default App;
