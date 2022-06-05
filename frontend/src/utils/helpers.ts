export const generatePassword = (fullName: string) => {
    const currentYear = new Date().getFullYear().toString();
    const splittedFullName = fullName.toLowerCase().split(" ");

    return `${splittedFullName[0].slice(0,3)}${splittedFullName[1].slice(0,3)}${currentYear[2]}${currentYear[3]}`
}

export const checkIfDateIsValid = (date: Date) => {
    
    const currentDate = new Date();

    console.log(date.getTime());
    console.log(currentDate.getTime())

    if(currentDate.getTime() > date.getTime())
        return false;
    return true;
}