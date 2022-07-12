export const generatePassword = (fullName: string) => {
    const currentYear = new Date().getFullYear().toString();
    const splittedFullName = fullName.toLowerCase().split(" ");

    return `${splittedFullName[0].slice(0,3)}${splittedFullName[1].slice(0,3)}${currentYear[2]}${currentYear[3]}`
}

// export const checkIfDateIsValid = (date: Date) => {
    
//     const currentDate = new Date();

//     if(currentDate.getTime() > new Date(date).getTime())
//         return false;
//     return true;
// }

export const convertDate = (date: Date) => {
    let dateToString = date.toString();
    if(dateToString.includes("T"))
        return `${dateToString.split("T")[0]} ${dateToString.split("T")[1].split(".")[0]}`
    else
        return `${dateToString.split(" ")[0]} ${dateToString.split(" ")[1].split(".")[0]}`
}   

export const testIfDateIsInPast = (date) => {
    const givenDate = new Date(date);
    const currentDate = new Date();
    if (givenDate.getTime() < currentDate.getTime()) {
      return true;
    }
    return false;
}