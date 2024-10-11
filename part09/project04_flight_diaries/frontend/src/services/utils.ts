import { BACKEND_URL } from "./config";

/**
 * 
 * Get url based on `path` that is relative to the backend url.
 * `path` should begin with a /.
 */
export function relativeUrl(path: string): string
{
    return BACKEND_URL + path;
}