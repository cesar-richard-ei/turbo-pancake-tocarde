import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProjectDetailComponent } from '@cesar-richard/projito-components';

let cachedVersion: string | null = null;

export default function VersionPage() {
    const [version, setVersion] = useState<string>('');

    useEffect(() => {
        if (cachedVersion === null) {
            fetch('/api/version/')
                .then(response => response.json())
                .then(data => {
                    cachedVersion = data.version;
                    setVersion(data.version);
                })
                .catch(() => {
                    cachedVersion = 'N/A';
                    setVersion('N/A');
                })
        } else {
            setVersion(cachedVersion);
        }
    }, []);

    return (
        <Layout className="bg-gradient-to-br from-royal-blue-100 to-gold-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Informations de Version</h1>
                            <p className="text-gray-600">Détails sur la version actuelle de l'application</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Retour à l'accueil
                            </Link>
                        </Button>
                    </div>
                    <Card className="p-6 mb-10 shadow-md">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Version actuelle</h2>
                            <div className="text-4xl font-bold text-royal-blue-600 mb-4">
                                {version || "Chargement..."}
                            </div>
                        </div>
                    </Card>
                    <ProjectDetailComponent
                        projectId="2"
                        useParentTheme={false}
                        isDarkMode={false}
                    />
                </div>
            </div>
        </Layout>
    );
}
