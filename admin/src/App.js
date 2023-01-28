import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  businessInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { businessColumns, orderColumns } from "./datatablesource";
import NewOrder from "./pages/newOrder/NewOrder";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="business">
              <Route index element={<ProtectedRoute>
                  <List columns={businessColumns} />
                </ProtectedRoute>} />
              <Route path=":businessId" element={<ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute> <New inputs={businessInputs} title="Add Business User" /> </ProtectedRoute>}
              />
            </Route>
            <Route path="order">
              <Route index element={<ProtectedRoute>
                  <List columns={orderColumns}/>
                </ProtectedRoute>} />
              <Route path=":businessId" element={<ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute> <NewOrder /> </ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
