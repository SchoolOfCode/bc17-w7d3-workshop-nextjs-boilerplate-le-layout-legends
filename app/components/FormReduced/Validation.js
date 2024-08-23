export default async function validateInput(inputName, inputValue) {
    let error = false

    if (inputName === 'fullName') {
        inputValue.length <= 3 ? error = true : error = false;
    }

    if (inputName === "postCode") {
        try {
            let data = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(inputValue)}`)
            let result = await data.json();
            result.status === 200 ? error = false : error = true;
        } catch(error) {
            /// dont wanna log anything tbh
        }
    }

    if (inputName === "streetAddress") {
        inputValue.length <= 3 ? error = true : error = false;
    }

    if (inputName === "city") {
        inputValue.length <= 3 ? error = true : error = false;
    }

    if (inputName === "phoneNumber") {
        inputValue.length !== 11 ? error = true : error = false;
    }

    if (inputName === "email") {
        !inputValue.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) ? error = true : error = false;
    }

    return error;
}
