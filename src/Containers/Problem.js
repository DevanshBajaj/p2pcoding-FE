import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { v4 } from 'uuid';
import { useParams, Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const options = {
    selectOnLineNumbers: true, // Select line by clicking on line number
    minimap: {
        enabled: false, // Minimap gives an overview of code(present on right side in vscode)
    },
    readOnly: false,
};

const Problem = () => {
    const [problem, setProblem] = useState();
    const [code, setCode] = useState("//Add code here")
    const [language, setLanguage] = useState("java")
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("");
    const [isCustomInput, setIsCustomInput] = useState(false);
    const [isCodeWorking, setIsCodeWorking] = useState(false);

    const { title } = useParams();

    useEffect(() => {
        AxiosInstance.get(`/problems/${title}`).then(response => {
            setProblem(response.data.data);
        }).catch(err => console.log(err))
    }, []);

    const editorDidMount = (editor, monaco) => {
        editor.focus();
    }
    const editorOnChange = (newValue, e) => {
        setCode(newValue)
    }

    const handleRunCode = () => {
        const id = v4();
        const body = { code, problemId: problem.id, language }
        if (isCustomInput) {
            body.input = input;
        }
        AxiosInstance.post("/solutions/run", body).then((response) => {
            const { stderr, stdout, isWorking } = response.data.data;
            setIsCodeWorking(isWorking);
            setOutput(stdout || stderr);

        }).catch(err => console.log(err));
    }

    const getTransformedTitle = (title) => {
        return title.replace(/ /g, "-")
    }

    if (!problem) {
        return <h3 className="text-center">Loading...</h3>
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 pt-4">
                    <h1>{problem.title}</h1>
                    <p>{problem.description}</p>
                    <h3>Sample Input:</h3>
                    <pre>{problem.testCase}</pre>
                    <h3>Sample Output:</h3>
                    <pre>{problem.testCaseOutput}</pre>
                    <div>
                        <Link to={`/practice/${getTransformedTitle(problem.title)}/solution`} target="_blank" rel="noopener noreferrer">
                            Solution
                            <svg id="Capa_1" enableBackground="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><g>
                                <path d="m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z" />
                                <path d="m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                <path d="m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                <path d="m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                <path d="m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z" /></g>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="col-sm-6">
                    <MonacoEditor
                        width="100%"
                        height="79vh"
                        automaticLayout={true}
                        language={language}
                        theme="vs-dark"
                        value={code}
                        options={options}
                        editorDidMount={editorDidMount}
                        onChange={editorOnChange}
                    />
                    <div className="row pt-2">
                        <div className="col-sm-12">
                            <select defaultValue='java' onChange={e => setLanguage(e.target.value)} value={language}>
                                <option value='cpp'>Cpp</option>
                                <option value='java'>Java</option>
                                <option value='python'>Python 2.x</option>
                            </select>
                        </div>
                        <div className="col-sm-12">
                            <input type="checkbox" id="custom-input" value={isCustomInput} onChange={e => setIsCustomInput(!isCustomInput)}></input>
                            <label for="custom-input" className="pl-2">Custom Input</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <textarea rows={4} placeholder="Input" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
                        </div>
                        <div className="col-sm-4">
                            <textarea rows={4} placeholder="Output" value={output} disabled={true}></textarea>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary mt-3" onClick={handleRunCode}>Run Code</button>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary mt-3" onClick={handleRunCode}>Run Tests</button>
                        </div>
                    </div>
                    {!isCustomInput && isCodeWorking && <p className="text-success">Hooray! all test cases passed</p>}
                    {!isCustomInput && !isCodeWorking && <p className="text-danger">Some test cases failed</p>}
                </div>
            </div>
        </div>
    )
}

export default Problem;