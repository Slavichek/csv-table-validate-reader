import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./style.module.scss";

/**
 *
 */
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 *
 */
const isEmailValid = (email) => EMAIL_REGEXP.test(String(email).toLowerCase());
const isExperienceValid = (age, experience) => experience > age - 18;
const isAgeValid = (age) => age >= 18;
const isPhoneValid = (phone) => true; // TODO: add check is phone valid

/**
 *
 */
const getHeaderCellData = (key) => {
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

/**
 *
 */
const getValidatedCellData = (key, item) => {
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
const getTransformedTableData = (csvData) => {
    const headerRow = {
        id: "header",
        items: Object.keys(csvData[0]).map(getHeaderCellData),
    };
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

/**
 *
 */
const TableCell = ({ data: { value, err } }) => (
    <div className={cx(styles.cell, { [styles.cellError]: err })}>{value}</div>
);

TableCell.propTypes = {
    data: PropTypes.object.isRequired,
};

/**
 *
 */
const Table = ({ data }) => {
    if (!data) return <div>No data</div>;

    return (
        <div className={styles.table}>
            {data.map(({ id, isDuplicated, items }, index) => (
                <div
                    key={id}
                    className={cx(styles.row, {
                        [styles.headerRow]: index === 0,
                    })}
                >
                    {items.map((cellData) => (
                        <TableCell key={cellData.key} data={cellData} />
                    ))}
                </div>
            ))}
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array,
};

Table.defaultProps = {
    data: null,
};

/**
 *
 */
const CsvInput = () => {
    const [tableData, setTableData] = useState([]);
    const handleForce = (csvData) =>
        setTableData(getTransformedTableData(csvData));

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
    };

    return (
        <div className={styles.container}>
            <div className={styles.input__wrapper}>
                <CSVReader
                    cssClass={styles.input}
                    onFileLoaded={handleForce}
                    parserOptions={papaparseOptions}
                    cssInputClass={styles.input__btn}
                    cssLabelClass="custom-csv-ssssss"
                />
            </div>
            <Table data={tableData} />
        </div>
    );
};

export default CsvInput;
