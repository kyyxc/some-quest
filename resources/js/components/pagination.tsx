import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    viewMode: 'card' | 'table';
}

export default function Pagination({ links, viewMode }: PaginationProps) {
    if (!links.length) return null;
    const pages = links.filter((link) => link.url !== null);

    if (pages.length <= 1) return null;

    return (
        <div className="mt-6 flex justify-end">
            <div className="flex gap-1">
                {links.map(
                    (link, index) =>
                        link.url && (
                            <Link
                                key={`${index}-${link.label}`}
                                href={`${link.url}${link.url.includes('?') ? '&' : '?'}view=${viewMode}`}
                                className={`rounded-md px-3 py-1 ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                                aria-label={`Go to page ${link.label}`}
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                )}
            </div>
        </div>
    );
}
