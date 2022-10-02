import React, {useState, useEffect} from "react";
import MonacoEditor from "react-monaco-editor";
import { useParams } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const options = {
    selectOnLineNumbers: true, // Select line by clicking on line number
    minimap: {
        enabled: false, // Minimap gives an overview of code(present on right side in vscode)
    },
    readOnly: true,
};

const Solution = () => {
    const [problem, setProblem] = useState();

    const { title } = useParams();

    useEffect(() => {
        AxiosInstance.get(`/problems/${title}`).then(response => {
            setProblem(response.data.data)   ;
        }).catch(err => console.log(err))
    }, []);

    const editorDidMount = (editor, monaco) => {
        editor.focus();
    }
    
    if (!problem) {
        return <h3 className="text-center">Loading...</h3>
    }

    return (
        <div className="container pt-4">
            <h1>{problem.title} {problem.solution.language}</h1>
            <MonacoEditor
                width="100%"
                height="90vh"
                automaticLayout={true}
                language={problem.solution.language}
                theme="vs-dark"
                value={problem.solution.code}
                options={options}
                editorDidMount={editorDidMount}
            />
        </div>
    );
};

export default Solution;