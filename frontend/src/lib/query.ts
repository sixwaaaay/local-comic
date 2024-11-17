



/**
 * Builds a query string from a map of params
 * @param url base url
 * @param params query params
 * @returns the url with query params
 */
export function buildQueryString(url: string, params: Record<string, string>) {
    const query = new URL(url);
    // params.forEach((value, key) => {
    Object.entries(params).forEach(([key, value]) => {
        query.searchParams.append(key, value);
    })
    return query.toString();
}