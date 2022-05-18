export const generatePassword = (fullName: string) => {
    const currentYear = new Date().getFullYear().toString();
    const splittedFullName = fullName.toLowerCase().split(" ");

    return `${splittedFullName[0].slice(0,3)}${splittedFullName[1].slice(0,3)}${currentYear[2]}${currentYear[3]}`
}