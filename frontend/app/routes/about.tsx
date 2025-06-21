import { Link } from 'react-router';
import { Button } from "~/components/ui/button";
import { Users, School, BookOpen, Calendar, History, UserPlus } from "lucide-react";
import { Layout } from "~/components/Layout";

export function meta() {
  return [
    { title: "À propos - La Tocarde" },
    { name: "description", content: "Découvrez l'histoire et les valeurs de La Tocarde, association étudiante falucharde" },
  ];
}

export default function AboutUs() {
  return (
    <Layout className="bg-gradient-to-br from-royal-blue-100 to-gold-50">
      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-10 w-10 text-royal-blue-800" />
            <h1 className="text-4xl font-bold text-royal-blue-900">À propos de La Tocarde</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-royal-blue-800 mb-4 flex items-center gap-2">
              <History className="h-6 w-6 text-royal-blue-700" />
              Notre histoire
            </h2>
            <p className="text-royal-blue-700 mb-6">
              La Tocarde est une association étudiante falucharde fondée pour enrichir la vie universitaire
              et perpétuer les traditions estudiantines. Depuis notre création, nous œuvrons à maintenir
              vivant l'esprit de camaraderie et de tradition au sein de la communauté étudiante.
            </p>

            <h2 className="text-2xl font-bold text-royal-blue-800 mb-4 flex items-center gap-2">
              <School className="h-6 w-6 text-royal-blue-700" />
              Notre mission
            </h2>
            <p className="text-royal-blue-700 mb-8">
              Nous nous engageons à préserver et à transmettre les valeurs et les traditions
              propres au patrimoine étudiant français. La Tocarde organise des événements culturels,
              des rencontres et des célébrations qui rassemblent les étudiants autour de moments conviviaux
              et d'échanges enrichissants.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gold-50 rounded-lg p-6 shadow-sm border border-gold-100">
                <h3 className="text-xl font-semibold text-royal-blue-800 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gold-600" />
                  Nos valeurs
                </h3>
                <ul className="space-y-2 text-royal-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>Camaraderie et entraide entre étudiants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>Respect des traditions faluchardes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>Partage des connaissances et expériences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>Promotion de la culture et du patrimoine étudiant</span>
                  </li>
                </ul>
              </div>
              <div className="bg-royal-blue-50 rounded-lg p-6 shadow-sm border border-royal-blue-100">
                <h3 className="text-xl font-semibold text-royal-blue-800 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-royal-blue-600" />
                  Nos activités
                </h3>
                <ul className="space-y-2 text-royal-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-royal-blue-500 font-bold">•</span>
                    <span>Congrès et rencontres interrégionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-royal-blue-500 font-bold">•</span>
                    <span>Soirées conviviales et "apérals"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-royal-blue-500 font-bold">•</span>
                    <span>Événements culturels et historiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-royal-blue-500 font-bold">•</span>
                    <span>Fabrication et/ou distribution d'insignes, de pins et de faluches</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-royal-blue-800 mb-4 flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-royal-blue-700" />
              Rejoindre La Tocarde
            </h2>
            <p className="text-royal-blue-700 mb-6">
              Que vous soyez un étudiant curieux des traditions faluchardes ou déjà initié,
              La Tocarde vous accueille à bras ouverts. Rejoindre notre association, c'est faire partie
              d'une communauté soudée et participer à la perpétuation d'un riche patrimoine culturel.
            </p>

            <div className="flex justify-center mt-8">
              <Link to="/signup">
                <Button size="lg" className="bg-royal-blue-800 hover:bg-royal-blue-900 text-gold-300">
                  Nous rejoindre
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
