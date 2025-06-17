import { type Route } from ".+types/well-known";

export function loader({ }: Route.LoaderArgs) {
  return new Response(null, {
    status: 204,
    statusText: "No Content"
  });
}

export default function WellKnown() {
  return null;
}
