import * as React from "react";
import * as PropTypes from "prop-types";
import * as PapaParse from "papaparse";

const CSVReader = ({
    accept = ".csv, text/csv",
    cssClass = "csv-reader-input",
    cssInputClass = "csv-input",
    cssLabelClass = "csv-label",
    fileEncoding = "UTF-8",
    inputId = "react-csv-reader-input",
    inputName = "react-csv-reader-input",
    inputStyle = {},
    label,
    onError,
    onFileLoaded,
    parserOptions = {},
    disabled = false,
}) => {
    const handleChangeFile = (e) => {
        let reader = new FileReader();
        const files = e.target.files;
        if (files.length > 0) {
            const fileInfo = {
                name: files[0].name,
                size: files[0].size,
                type: files[0].type,
            };

            reader.onload = (_event) => {
                const csvData = PapaParse.parse(
                    reader.result,
                    Object.assign(parserOptions, {
                        error: onError,
                        encoding: fileEncoding,
                    })
                );
                onFileLoaded(csvData.data || [], fileInfo);
            };

            reader.readAsText(files[0], fileEncoding);
        }
    };

    return (
        <div className={cssClass}>
            {label && (
                <label className={cssLabelClass} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                className={cssInputClass}
                type="file"
                id={inputId}
                name={inputName}
                style={inputStyle}
                accept={accept}
                onChange={handleChangeFile}
                disabled={disabled}
            />
        </div>
    );
};

CSVReader.propTypes = {
    accept: PropTypes.string,
    cssClass: PropTypes.string,
    cssInputClass: PropTypes.string,
    cssLabelClass: PropTypes.string,
    fileEncoding: PropTypes.string,
    inputId: PropTypes.string,
    inputName: PropTypes.string,
    inputStyle: PropTypes.object,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onError: PropTypes.func,
    onFileLoaded: PropTypes.func.isRequired,
    parserOptions: PropTypes.object,
    disabled: PropTypes.bool,
};

export default CSVReader;
