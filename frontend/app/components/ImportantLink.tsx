import { ExternalLink } from "lucide-react"
import { Card } from "./ui/card"

interface ImportantLinkProps {
    title: string;
    description: string;
    url: string;
}

export const ImportantLink = ({ title, description, url }: ImportantLinkProps) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-4 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold">{title}</h4>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
            </Card>
        </a>
    )
}
