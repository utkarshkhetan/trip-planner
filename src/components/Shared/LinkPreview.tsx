import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkPreviewProps {
    url: string;
}

interface PreviewData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
    const [data, setData] = useState<PreviewData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                // Using a public CORS proxy to fetch the HTML
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
                const json = await response.json();

                if (!json.contents) throw new Error('No content');

                const parser = new DOMParser();
                const doc = parser.parseFromString(json.contents, 'text/html');

                const getMeta = (prop: string) =>
                    doc.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') ||
                    doc.querySelector(`meta[name="${prop}"]`)?.getAttribute('content') ||
                    undefined;

                const title = getMeta('og:title') || doc.title;
                const description = getMeta('og:description') || getMeta('description');
                const image = getMeta('og:image');
                const siteName = getMeta('og:site_name');

                if (title || description || image) {
                    setData({ title, description, image, siteName });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to fetch link preview:', err);
                setError(true);
            }
        };

        if (url) {
            fetchPreview();
        }
    }, [url]);

    if (error || !data) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline text-sm mt-1"
            >
                <ExternalLink className="w-3 h-3" />
                {url}
            </a>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 group"
        >
            <div className="glass border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                {data.image && (
                    <div className="h-32 w-full overflow-hidden bg-black/20">
                        <img
                            src={data.image}
                            alt={data.title || 'Link preview'}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                )}
                <div className="p-3">
                    <h4 className="font-medium text-sm text-white line-clamp-1 mb-1">
                        {data.title || url}
                    </h4>
                    {data.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                            {data.description}
                        </p>
                    )}
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider">
                        <ExternalLink className="w-3 h-3" />
                        {data.siteName || new URL(url).hostname}
                    </div>
                </div>
            </div>
        </a>
    );
};
