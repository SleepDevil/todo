import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);

  return <div className="App"></div>;
}

export default Redirect;
