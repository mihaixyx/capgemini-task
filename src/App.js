import { Route, Routes } from "react-router-dom";
import FormPage from "./components/FormPage";
import TablePage from "./components/TablePage";
import Layout from "./components/Layout";
import { ReadOnlyContext } from "./context/ReadOnlyContext";
import { useState } from "react";

function App() {
  const [checkboxReadOnly, setCheckboxReadOnly] = useState(false);

  return (
    <ReadOnlyContext.Provider value={{ checkboxReadOnly, setCheckboxReadOnly }}>
      <Layout>
        <Routes>
          <Route path="/" element={<FormPage checkBox={checkboxReadOnly} />} />
          <Route
            path="/table"
            element={<TablePage checkBox={checkboxReadOnly} />}
          />
        </Routes>
      </Layout>
    </ReadOnlyContext.Provider>
  );
}

export default App;
