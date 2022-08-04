export default function validate(data) {
    let errors = {};
    if (!data.email) {
        errors.email = "Please enter a valid Email address";
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Please enter a valid Email address";
    }
    return errors;
}