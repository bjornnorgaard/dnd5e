export interface Breadcrumb {
    label: string;
    route: string;
}

export function getBreadcrumbs(pageUrl: string): Breadcrumb[] {
    const url = pageUrl.split("/").filter(u => !!u);
    return url.map((_, i) => {
        return {
            label: url[i],
            route: "/" + url.slice(0, i + 1).join("/"),
        };
    });
}
