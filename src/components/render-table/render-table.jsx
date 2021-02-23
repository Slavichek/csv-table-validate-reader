import React from "react";
import { getTransformedTableData } from "../../utils/transform-data";
import CSVReader from "../csv-reader/csv-reader";
import setFileData from "../../redux/file-data/table-actions";
import Table from "./table";
import { connect } from "react-redux";
import styles from "./style.module.scss";

class RenderTable extends React.Component {
    handleForce = (csvData) => {
        // store.dispatch(setFileData(getTransformedTableData(csvData)));
        this.props.setFileDatas(getTransformedTableData(csvData));
    };

    render() {
        console.log(this.props);
        return (
            <div className={styles.container}>
                <div className={styles.input__wrapper}>
                    <CSVReader
                        cssClass={styles.input}
                        onFileLoaded={this.handleForce}
                        cssInputClass={styles.input__btn}
                        cssLabelClass="custom-csv-ssssss"
                    />
                </div>
                {<Table data={this.props.datas} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        datas: state.tableReducer.tableData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setFileDatas: (datas) => dispatch(setFileData(datas)),
    };
};
///////////////////   or
// const mapDispatchToProps = {
//     setFileData,
// };
export default connect(mapStateToProps, mapDispatchToProps)(RenderTable);
