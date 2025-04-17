import { createContext } from "react"

export const AppContext = createContext();

const AppContextProvider = (props) => {

    //  This is also context file and it stores all the states for the admin and doctor login for both  

    const currency = "₹"

    //   As patients is directly entering the Date of birth in Profile so we have to calculate age of patient to show an appoinment

    const CalculateAge = (dob) => {
        console.log("Received dob:", dob); // Log received dob

        // Check if dob is undefined or empty
        if (!dob) {
            console.error("Date of birth (dob) is not provided or is undefined");
            return "Invalid date format";
        }

        // Ensure dob is a string and remove any surrounding whitespace
        const dobirth = String(dob).trim();

        // Check if dob is in yyyy-mm-dd format (this is the format we are getting)
        let dobParts;
        if (dobirth.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // Split yyyy-mm-dd format into [yyyy, mm, dd]
            dobParts = dobirth.split('-');
        } else if (dobirth.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            // Split dd/mm/yyyy format into [dd, mm, yyyy]
            dobParts = dobirth.split('/');
        } else {
            console.error("Invalid date format. Expected dd/mm/yyyy or yyyy-mm-dd.");
            return "Invalid date format";
        }

        console.log("Date parts:", dobParts);

        // Convert to date in yyyy-mm-dd format (JavaScript can parse this format)
        const birthDate = new Date(`${dobParts[0]}-${dobParts[1]}-${dobParts[2]}`);

        // If birthDate is invalid, return an error
        if (isNaN(birthDate.getTime())) {
            console.error("Invalid date:", dob);
            return "Invalid date";
        }

        const today = new Date();
        console.log("Today:", today);
        console.log("Birth Date:", birthDate);

        let age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if the birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        console.log("Calculated Age:", age);
        return age;
    };


    //   Initialising an array for the function slotDateFormat  because it shows directly months in dates format 
    //  for showing actual month name i have to write this function

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
    }

    const value = {
        // your context values will go here
        CalculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider