import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./form.css";

const VARIABLE_URL = "http://localhost:3000/variables";

function getVariable(url) {
  return axios.get(VARIABLE_URL + `/${url}`).then((response) => {
    return response.data;
  });
}

function Form() {
  let [variable, setVariable] = useState({});
  const current_url = useLocation();
  const regex = /^\/(\w+)\.html$/;
  const match = current_url.pathname.match(regex);
  const url = match[1];
  const head = url.split("_")[0].toUpperCase();

  useEffect(() => {
    let mounted = true;

    getVariable(url).then((items) => {
      if (mounted) {
        setVariable(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, [url]);

  return variable.type ? (
    <>
      {variable.type === "value" ? (
        <div className="body-section">
          <ul className="headers params-array">
            {variable.properties.values.map((value) => {
              return (
                <li
                  key={value}
                  style={{
                    padding: "10px",
                    borderBottom: "1px dotted #ececec",
                  }}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <div className="margin-btm-10 indicator-header">{head}</div>
          <div className="margin-btm-10 indicator-subheader">
            Set Parameters
          </div>
          <div className="indicator-variable-section">
            <div className="left">Period</div>
            <input
              type="text"
              defaultValue={variable.properties["default_value"]}
              max={variable.properties["max_value"]}
              min={variable.properties["min_value"]}
              className="right"
            />
          </div>
        </div>
      )}
    </>
  ) : (
    <></>
  );
}

export default Form;
