export const baseRoute: string = "http://localhost:8080/api";
export const routes = (role: string) => {
    if(role === "professor")
        return [
            {
                text: "Courses",
                icon: "School",
            },
            {
                text: "Reports",
                icon: "Assignment"
            },
            {   
                text: "Students",
                icon: "Person"
            }]

    return [
        {
            text: "Tasks",
            icon: "Assignment"

        },
        {
            text: "Progress",
            icon: "SsidChartRounded"
        },

    ]
}
