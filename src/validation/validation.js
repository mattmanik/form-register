export default function validate(data) {
    console.log(data);
    let errors = {};
    if (!data.email) {
        errors.email = "* Please enter a valid Email address";
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "* Please enter a valid Email address";
    }
    if (!data.name) {
        errors.name = "* Please enter a name";
    }
    if (!data.mobile || data.mobile.length != 10) {
        errors.mobile = "* Please enter a mobile number";
    }
    if (!data.country) {
        errors.country = "* Please select a country";
    }
    if (!data.state) {
        errors.state = "* Please select a state";
    }
    if (!data.city) {
        errors.city = "* Please select a city";
    }
    if (!data.message) {
        errors.message = "* Please type a message";
    }
    return errors;
}