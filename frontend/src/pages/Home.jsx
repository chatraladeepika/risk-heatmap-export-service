import React, { useEffect } from "react";
import api from "../services/api";

function Home() {
  useEffect(() => {
    api.get("/test")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="text-center mt-10 text-xl">
      Home Page Working 🚀
    </div>
  );
}

export default Home;