import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              What&apos;s next?
            </p>
            <ul>
              {resources.map(({ href, text, icon }) => (
                <li key={href}>
                  <a
                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

const resources = [
  {
    href: "https://faluche.app/",
    text: "Code Faluchard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="28"
        viewBox="0 0 32 28"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        {/* Note à moi même : Ne plus demander a ChatGPT de faire des svg de chapeaux, voyez vous même : */}
        {/* Faluche étudiante traditionnelle */}
        <ellipse
          cx="16"
          cy="12"
          rx="12"
          ry="4"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Cercle intérieur - creux caractéristique */}
        <ellipse
          cx="16"
          cy="12"
          rx="5"
          ry="1.5"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Rubans de couleur pendants - caractéristiques des faluches */}
        <path
          d="M22 12.5C23 15 25 19 27 20"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 12.5C21 16 22 19 23 21"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12.5C11 15 9 19 7 20"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 12.5C9 16 8 19 7 21"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];
