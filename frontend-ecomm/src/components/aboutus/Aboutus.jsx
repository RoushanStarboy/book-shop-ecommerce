import React, { useState, useEffect } from "react";

function Aboutus() {
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
        // function to fetch and read the text file
        const fetchTextFile = async () => {
            try {
                const response = await fetch('');
                const text = await response.text(); 
                setFileContent(text);
            } catch (error) {
                console.log("The Error: " + error.message);
            }
        }
        fetchTextFile();
    }, []);

    return (
        <>
            <h1>About Us</h1>
            {console.log(fileContent)}
            <pre>{fileContent}</pre>
        </>
    );
}

export default Aboutus;
