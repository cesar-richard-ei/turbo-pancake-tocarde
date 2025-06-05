import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tocarde - Compiègne" },
    { name: "description", content: "Bienvenue en capitale de la Tocardie !" },
  ];
}

export default function Home() {
  return <Welcome />;
}
