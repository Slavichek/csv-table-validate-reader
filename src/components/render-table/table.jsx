import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./style.module.scss";

const TableCell = ({ data: { value, err } }) => (
    <div className={cx(styles.cell, { [styles.cellError]: err })}>{value}</div>
);

const Table = ({ data }) => {
    // console.log(data);
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

export default Table;

TableCell.propTypes = {
    data: PropTypes.object.isRequired,
};

Table.propTypes = {
    data: PropTypes.array,
};

Table.defaultProps = {
    data: null,
};
