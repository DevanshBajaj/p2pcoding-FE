import React from "react";
import MonacoEditor from "react-monaco-editor";
import { Row, Col } from "antd";
import styles from "./main.module.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import VideoChat from "../../Containers/VideoChat";

const EditorComponent = (props) => {
  const {
    videoChat,
    lang,
    code,
    input,
    output,
    runCodeDisabled,
    videoSocket,
    readOnly,
    handleVideoChat,
    editorDidMount,
    editorOnChange,
    handleLang,
    handleRun,
    handleInput,
    handleVideoSocket,
  } = props;
  const options = {
    selectOnLineNumbers: true, // Select line by clicking on line number
    minimap: {
      enabled: false, // Minimap gives an overview of code(present on right side in vscode)
    },
    readOnly,
  };

  return (
    <div className="row no-gutters">
      <div className="col-sm-10">
        {videoChat && (
          <VideoChat
            videoChat={videoChat}
            videoSocket={videoSocket}
            handleVideoChat={handleVideoChat}
            handleVideoSocket={handleVideoSocket}
          />
        )}
        <div className={styles.editor}>
          <MonacoEditor
            // width="600"
            // height="400"
            automaticLayout={true}
            language={lang}
            theme="light"
            value={code}
            options={options}
            editorDidMount={editorDidMount}
            onChange={editorOnChange}
          />
        </div>
      </div>
      <div className="col-sm-2">
        <SideDrawer
          input={input}
          output={output}
          videoChat={videoChat}
          runCodeDisabled={runCodeDisabled}
          lang={lang}
          videoSocket={videoSocket}
          handleLang={handleLang}
          handleRun={handleRun}
          handleInput={handleInput}
          handleVideoChat={handleVideoChat}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
