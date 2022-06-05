export const routes : string[] = ["auth", "student", "course"]
export const BASE_FILE_PATH: string = __dirname + "/files";

export const PERMISSIONS = {
    "/api/auth/create": {
        POST: ["professor"]
    },
    "/api/auth": {
        GET: ["professor", "student"],
        PUT: ["professor", "student"]
    },
    "/api/auth/logout": {
        GET: ["professor", "student"]
    },
    "/api/student": {
        GET: ["professor"],
        POST: ["professor"],
        PUT: ["professor"],
        DELETE: ["professor"]
    },
    "/api/solution": {
        POST: ["student"],
        DELETE: ["student"],
        GET: ["professor", "student"]
    },
    "/api/dashboard": {
        GET: ["professor", "student"]
    },
    "/api/task": {
        GET: ["professor"],
        DELETE: ["professor"],
        POST: ["professor"],
        PUT: ["profesor"]
    }
}
