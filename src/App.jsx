import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problems from "./pages/Problems";
import ProblemSlug from "./pages/ProblemSlug";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";

/*
 * Temporary problems array schema
 */
const problems = [
  {
    title: "201. Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "42%",
  },
  {
    title: "201. Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "412%",
  },
  {
    title: "202. Happy Number",
    difficulty: "Easy",
    acceptance: "54.9%",
  },
  {
    title: "203. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "42%",
  },
];

function App() {
  const navigate = useNavigate();
  const location=useLocation()
  useEffect(() => {
    if(location.pathname==="/"){
      navigate("/problemset/all")
    }
  }, [location.pathname])


 

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  /* Add routing here, routes look like -
       /login - Login page
       /signup - Signup page
       /problemset/all/ - All problems (see problems array above)
       /problems/:problem_slug - A single problem page
     */

  return (
    <>
    <Navbar/>
    <div className="bg-[#2e2e2e] text-white min-h-screen ">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />


          <Route path="/problemset/all" exact element={<RequireAuth><Problems /></RequireAuth>} />
          <Route
            path="/problems/:problem_slug"
            exact
            element={<RequireAuth><ProblemSlug /></RequireAuth>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </div>
    </>
  );
}



export default App;
