import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/home/todo");
  }, []);

  return <div className="App"></div>;
}

export default Redirect;
