import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage";
import SubjectPage from "./pages/subjectPage";
import WorkSpace from "./pages/workspacePage";
import SignUp from "./pages/signUpPage";
import Login from "./pages/loginPage";
import MainLayout from "./components/layout/mainLayout";

// const router = createBrowserRouter(
//   createRoutesFromElements( //v6
//      <Router>
//   <Routes>
//     <Route element={<MainLayout />}>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/auth/login" element={<LoginPage />} />
//       <Route path="/auth/signup" element={<SignUpPage />} />
//       <Route path="/:subject" element={<SubjectPage />} />
//     </Route>
//     <Route path="/:subject/:problemId" element={<WorkspacePage />} />
//   </Routes>
// </Router>
//   )
// );
//v6.4
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:subject",
        element: <SubjectPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/SignUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/:subject/:problemId",
    element: <WorkSpace />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
