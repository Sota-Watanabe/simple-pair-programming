import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chaos";
import React, { useContext } from "react";
import AceEditor from "react-ace";

import { ConnectionContext } from "./App";
let editorInstance = null;
export const Editor = React.memo(
  (props) => {
    const [value, setValue] = useContext(ConnectionContext);
    const text = props.text;
    const onChange = () => {
      if (value.canWrite === true) {
        const editText = editorInstance.getValue();
        const { dataConnection } = props;
        const data = { canWrite: value.canWrite, editText };
        dataConnection.send(data);
      }
    };
    /* editorInstance作成後 */
    const onLoad = (newEditorInstance) => {
      editorInstance = newEditorInstance;
    };

    return (
      <div style={{ textAlign: "center" }}>
        <h2>Share Code</h2>
        <AceEditor
          editorProps={{ $blockScrolling: "true" }}
          fontSize="16px"
          height="500px"
          highlightActiveLine={false}
          mode="c_cpp"
          style={{ margin: "auto", maxWidth: "1024px" }}
          name="UNIQUE_ID_OF_DIV"
          onChange={onChange}
          onLoad={onLoad}
          showPrintMargin={false}
          tabSize={4}
          theme="chaos"
          value={text}
          width="80%"
          wrapEnabed={false}
        />
      </div>
    );
  }
);
