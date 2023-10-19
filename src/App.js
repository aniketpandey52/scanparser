import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Scans from "./components/scans";
import Criteria from "./components/criteria";
import Form from "./components/form";

function App() {
  return (
    <Routes>
      <Route path="/top_gainers.html" element={<Criteria />} />
      <Route path="/intraday_buying.html" element={<Criteria />} />
      <Route path="/open_high.html" element={<Criteria />} />
      <Route path="/cci_reversal.html" element={<Criteria />} />
      <Route path="/rsi_overbought.html" element={<Criteria />} />
      <Route path="/open_high_params.html" element={<Form />} />
      <Route path="/cci_period_params.html" element={<Form />} />
      <Route path="/cci_array_params.html" element={<Form />} />
      <Route path="/rsi_params_one.html" element={<Form />} />
      <Route path="/rsi_params_two.html" element={<Form />} />
      <Route path="/rsi_params_three.html" element={<Form />} />
      <Route path="/rsi_period_params.html" element={<Form />} />
      <Route path="/" element={<Scans />} />
    </Routes>
  );
}

export default App;
