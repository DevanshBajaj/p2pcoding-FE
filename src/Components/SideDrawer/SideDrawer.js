import React from 'react';
import styles from './main.module.css';
import classNames from "classnames";
import { Select, Input, Row, Col, Popover } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const SideDrawer = props => {
    const {
        input,
        output,
        videoChat,
        lang,
        handleLang,
        handleRun,
        handleInput,
        handleVideoChat,
        runCodeDisabled
    } = props;
    const textAreaSize = { minRows: 3, maxRows: 6 };
    const inviteContent = (
        <div>
            <h3>Invite a peer!</h3>
            <p>Start pair programming with your peer by sharing this editor.</p>
            <h3>Invite via link:</h3>
            <input value={window.location.href} readOnly={true} />
        </div>
    )
    return (
        <div className={classNames(styles.sideDrawer)}>
            <div className={classNames("row", styles.topRow)}>
                <div className="col-sm-12">
                    <button
                        className={videoChat ? "btn_danger" : "btn_primary"}
                        onClick={handleVideoChat}
                    >
                        {videoChat ? "End Call" : "Video Call"}
                    </button>
                </div>
                <div className="col-sm-12">
                    <Popover
                        content={inviteContent}
                        trigger="click"
                        placement="bottomRight"
                    >
                        <button className="btn_primary">Invite</button>
                    </Popover>

                </div>
            </div>
                <select defaultValue='cpp' onChange={handleLang} value={lang} className={styles.lang}>
                    <option value='cpp'>Cpp</option>
                    <option value='java'>Java</option>
                    <option value='python'>Python 2.x</option>
                </select>

            <label className={styles.input}>Input:</label>
            <TextArea value={input} onChange={handleInput} rows={5} autoSize={textAreaSize} />
            <label className={styles.output}>Output:</label>
            <TextArea value={output} style={{ marginBottom: '20px' }} autoSize={textAreaSize} readOnly={true} />
            <button
                className={`btn_success ${runCodeDisabled && 'disabled'}`}
                onClick={handleRun}
                disabled={runCodeDisabled}
            >
                {runCodeDisabled ? "Running..." : "Run Code"}
            </button>
        </div>
    );
}

export default SideDrawer;