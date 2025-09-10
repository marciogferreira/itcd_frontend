import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { useAuth } from "./context/AuthContext";
import AlunosPages from "./pages/AlunosPages";
import CursosPages from "./pages/CursosPages";
import EventosPages from "./pages/EventosPages";
import MatriculasPages from "./pages/MatriculasPages";
import TurmasPages from "./pages//TurmasPages";
import UsuariosPages from "./pages/UsuariosPages";
import LoadingScreen from "./components/LoadingScreen";
import DoadoresPages from "./pages/DoadoresPages";
import DoacoesPages from "./pages/DoacoesPages";
import DescartesPages from "./pages/DescartesPages";
import FormElements from "./pages/Forms/FormElements";
import DonatariosPages from "./pages/DoanatariosPages";

export default function App() {
  
  const { isLogged, loading } = useAuth()

  if(!isLogged) {
     return (
    <>
      
      <Router>
        {loading && <LoadingScreen />}
        <ScrollToTop />
        <Routes>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
      
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
  }

  return (
    <>
      
      <Router>
        {loading && <LoadingScreen />}
        
        <ScrollToTop />
        <Routes>

          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>

            <Route index path="/" element={<Home />} />

            {/*M. de Capacitação */}

            <Route path="/alunos" element={<AlunosPages />} />
            <Route path="/cursos" element={<CursosPages />} />
            <Route path="/turmas" element={<TurmasPages />} />
            <Route path="/matriculas" element={<MatriculasPages />} />
            <Route path="/eventos" element={<EventosPages />} />
            <Route path="/usuarios" element={<UsuariosPages />} />
            

            {/*M. R. de Equipamentos*/}

            <Route path="/doadores" element={<DoadoresPages />} />
            <Route path="/doacoes" element={<DoacoesPages />} />
            <Route path="/donatarios" element={<DonatariosPages />} />
            <Route path="/descartes" element={<DescartesPages />} />

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} /> */}

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

            {/* Ui Elements */}
            {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}

            {/* Charts */}
            {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}

          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
