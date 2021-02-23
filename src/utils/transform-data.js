const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 *
 */
const isEmailValid = (email) => EMAIL_REGEXP.test(String(email).toLowerCase());
const isExperienceValid = (age, experience) => experience > age - 18;
const isAgeValid = (age) => age >= 18;
const isPhoneValid = (phone) => true; // TODO: add check is phone valid

export const getHeaderCellData = (key) => {
    switch (key) {
        case "full_name": {
            return { key, value: "Full name" };
        }
        case "phone": {
            return { key, value: "Phone" };
        }
        case "email": {
            return { key, value: "Email" };
        }
        case "age": {
            return { key, value: "Age" };
        }
        case "experience": {
            return { key, value: "Experience" };
        }
        // TODO: add all columns
        default: {
            return { key, value: key.toUpperCase() };
        }
    }
};

export const getValidatedCellData = (key, item) => {
    const value = item[key];

    switch (key) {
        case "full_name": {
            return { key, value: value.trim().toUpperCase() };
        }
        case "phone": {
            return { key, value, err: isPhoneValid(value) };
        }
        case "email": {
            return { key, value, err: isEmailValid(value) };
        }
        case "age": {
            return { key, value, err: isAgeValid(value) };
        }
        case "experience": {
            return { key, value, err: isExperienceValid(value, item.age) };
        }
        // TODO: add all columns
        default: {
            return { key, value, err: false };
        }
    }
};

/**
 *
 */
export const getTransformedTableData = (csvData) => {
    console.log(csvData);
    const headerRow = {
        id: "header",
        items: Object.keys(csvData[0]).map(getHeaderCellData),
    };
    console.log(headerRow);
    return csvData.reduce(
        (acc, item) => {
            const { full_name: id } = item;
            const isDuplicated = acc.find((resItem) => !!resItem.id === id);
            const items = Object.keys(item).map((key) =>
                getValidatedCellData(key, item)
            ); // row cells
            return [...acc, { id, isDuplicated, items }];
        },
        [headerRow]
    );
};
