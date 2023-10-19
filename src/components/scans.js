import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SCAN_URL = "http://localhost:3000/scans";

function getScans() {
  return axios.get(SCAN_URL).then((response) => {
    return response.data;
  });
}

function Scans() {
  let [scans, setScans] = useState([]);

  useEffect(() => {
    let mounted = true;

    getScans().then((items) => {
      if (mounted) {
        setScans(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ul className="headers">
      {scans.map((scan) => {
        return (
          <li
            key={scan.id}
            style={{ padding: "10px", borderBottom: "1px dotted #ececec" }}
          >
            <Link to={`${scan.url}.html`} style={{ color: "#fff" }}>
              <div>{scan.name}</div>
              <div className={`subtext ${scan.color}`}>{scan.tag}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Scans;
