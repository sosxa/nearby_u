import React from "react";

interface InfoProps {
    mainMsg: string;
    info1?: string;
    info2?: string;
    info3?: string;
    info4?: string;
}
const Info = ({ mainMsg, info1, info2, info3, info4 }: InfoProps) => {
    return (
        <div className="bg-blue-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
            <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
                </path>
            </svg>
            <span className="text-blue-800">{mainMsg}</span>
            <ul>
                <li>{info1}</li>
                <li>{info2}</li>
                <li>{info3}</li>
                <li>{info4}</li>
            </ul>
        </div>
    )
}

export default Info;