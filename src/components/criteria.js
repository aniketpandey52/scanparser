import "./criteria.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SCAN_URL = "http://localhost:3000/scans";

function getScans(url) {
  return axios.get(SCAN_URL + `/${url}`).then((response) => {
    return response.data;
  });
}

function Criteria() {
  let [scans, setScans] = useState([]);
  const current_url = useLocation();
  const regex = /^\/(\w+)\.html$/;
  const match = current_url.pathname.match(regex);
  const url = match[1];

  useEffect(() => {
    let mounted = true;

    getScans(url).then((items) => {
      if (mounted) {
        setScans(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, [url]);
  return (
    <>
      {scans ? (
        <div className="header-section">
          <div style={{ color: "#fff" }}>{scans ? scans.name : ""}</div>
          <div className={"subtext " + scans.color}>
            {scans ? scans.tag : ""}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="body-section">
        {scans && scans.criteria
          ? scans.criteria.map((crit, idx) => {
              const parts = crit.text.split(/\$(\d+)/g);

              const compeleteText = parts.map((part, index) => {
                if (index % 2 === 1) {
                  const number = parseInt(part, 10);
                  return (
                    <Link
                      key={index}
                      to={`/${crit.variable[`$${number}`].url}.html`}
                    >
                      {crit.variable[`$${number}`].type === "value"
                        ? `(${crit.variable[`$${number}`].values[0]})`
                        : `(${crit.variable[`$${number}`].default_value})`}
                    </Link>
                  );
                }
                return part;
              });
              if (scans.criteria.length - 1 !== idx) {
                return (
                  <div key={idx}>
                    <div className="margin-btm-10">{compeleteText}</div>
                    <div className="subtext margin-btm-10">and</div>
                  </div>
                );
              } else {
                return <div key={idx}>{compeleteText}</div>;
              }
            })
          : null}
      </div>
    </>
  );
}

export default Criteria;
