const userExpenseValidation = (data) => {

    const allowedFileds = ["text", "amount"];
    const dataFields = Object.keys(data).every((field) => allowedFileds.includes(field));

    if (!dataFields) {
        throw new Error("Invalid fields in request body");
    }

    const { text, amount } = data;

    if (text === "") {
        throw new Error("Desc text is not valid");
    }

    if (amount === 0) {
        throw new Error("Amount can't be 0.")
    }

}

module.exports = {
    userExpenseValidation
}