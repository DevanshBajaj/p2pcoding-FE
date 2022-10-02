import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const problems = [
    { title: "two sum", solution: "some solution", isWorking: true },
    { title: "array destructuring", solution: "some solution", isWorking: false }
]

const getTransformedTitle = (title) => {
    return title.replace(/ /g, "-")
}

const Practice = () => {
    const [problems, setProblems] = useState();

    useEffect(() => {
        AxiosInstance.get("/problems").then(response => {
            setProblems(response.data.data);
        }).catch(err => console.log(err))
    }, []);

    if (!problems) {
        return <h3 className="text-center">Loading...</h3>
    }

    return (
        <div className="container pt-5">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Solution</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        problems.map(problem => (
                            <tr key={problem.id}>
                                <td>
                                    <Link to={`/practice/${getTransformedTitle(problem.title)}`} target="_blank" rel="noopener noreferrer">{problem.title}</Link>
                                </td>
                                <td>
                                    <Link to={`/practice/${getTransformedTitle(problem.title)}/solution`} target="_blank" rel="noopener noreferrer">
                                        <svg id="Capa_1" enableBackground="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><g>
                                            <path d="m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z" />
                                            <path d="m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                            <path d="m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                            <path d="m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                                            <path d="m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z" /></g>
                                        </svg>
                                    </Link>
                                </td>
                                <td>{problem.isWorking ? "Solved" : "Unsolved"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Practice