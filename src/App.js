import QuizInterface from './components/QuizInterface';
import SignIn from './components/SignIn';
import { Routes, Route } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import { ContextProvider } from "./context/Context.js";
import { Exams } from "./components/Exams.js";
import { ControlPage } from './components/ControlPage.js';
import { PrivateRoute } from './context/PrivateRoute.js';

function App() {
  return (
      <ContextProvider>
        <Routes>
            <Route path="/" element={ <SignIn /> } />
            <Route path="/UserDetails" element={<PrivateRoute>  <UserDetails /> </PrivateRoute>} />
            <Route path="/Exams" element={<PrivateRoute> <Exams /> </PrivateRoute>} />
            <Route path="/QuizInterface" element={<PrivateRoute> <QuizInterface /> </PrivateRoute> } />
            <Route path="/ControlPage" element={<PrivateRoute> <ControlPage /> </PrivateRoute>} />
        </Routes>
      </ContextProvider>
  );
}

export default App;