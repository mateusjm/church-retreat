import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "@/pages/form/Form.tsx";
import Confirmation from "@/pages/form/Confirmation.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/confirmacao" element={<Confirmation />} />
    </Routes>
  );
}

export default App;
