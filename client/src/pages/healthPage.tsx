"use client";
import { useEffect, useState } from "react";
import { Health } from "../entities";
const port = process.env.NEXT_PUBLIC_API_PORT || 3000;

export default function HealthPage() {
  const [health, setHealth] = useState<Health[]>();
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`http://localhost:${port}/api/v1/health`);
        const res = await response.json();
        if (res) {
          setHealth(res.data);
        }
      } catch {
        console.log("error");
        setHealth([{ id: 2, name: "pas de connexion" }]);
      }
    };

    fetchHealth();
  }, [toggle]);

  const changeToggleState = () => {
    setToggle(!toggle);
  };

  return (
    <div className="p-5 flex flex-col justify-start items-center h-100">
      <div className="flex flex-col justify-start items-center h-100 bg-white">
        <h1 className="abril-fatface-regular mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Surprise
        </h1>
        <p className="mb-6 p-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Une application dockerisée en Next.js, Node.js et Postgresql,
          appellant le port {port} en backend.
        </p>
        <a
          href="#"
          className="mt-3 mb-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Tester la connexion
          </h5>
          <p className="font-normal text-gray-700">
            Pour voir si le backend et la base de données sont bien connectés,
            cliquez sur le bouton ci-dessous.
          </p>
          <button
            onClick={changeToggleState}
            className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
          >
            Tester
          </button>
        </a>
        {toggle && health && health[0] && health[0].id === 1 && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 mt-5"
            role="alert"
          >
            <span className="font-medium">Succès ! </span> {health[0].name}
          </div>
        )}
        {toggle && health && health[0] && health[0].id === 2 && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-5"
            role="alert"
          >
            <span className="font-medium">Erreur ! </span> {health[0].name}
          </div>
        )}
      </div>
    </div>
  );
}
