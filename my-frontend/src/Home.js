import React from "react";
import { useEffect, useState, useMemo } from "react";
import './App.css';


const Home = () => {

    const deliverables = useMemo(() => ["URLs", "HTML_dumps", "Webpage Screenshots", "Structured Output File"], []);
    const [currentDeli, setCurrentDeli] = useState(deliverables[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDeli((prevDeli) => {
                const currentIndex = deliverables.indexOf(prevDeli);
                const nextIndex = (currentIndex + 1) % deliverables.length;
                return deliverables[nextIndex];
            });
        }, 2000);   //change every 2 seconds

        return () => clearInterval(interval);  //cleanup on unmount
    }, [deliverables]);
    

    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [scrapingStatus, setScrapingStatus] = useState(""); 

    const [showUrlList, setShowUrlList] = useState(false); //to show added urls section only after clicking add button

    const handleAddUrl = () => {
        if (url.trim()) {
            setUrls((prevUrls) => {
                const newUrls = [...prevUrls, url];
                setUrl("");
                setShowUrlList(true); // Show the URL list when a URL is added
                return newUrls;
            });
        }
    };

    const handleRemoveUrl = (indexToRemove) => {
        const filteredUrls = urls.filter((_, index) => index !== indexToRemove);
        setUrls(filteredUrls);
        if (filteredUrls.length === 0) {
            setShowUrlList(false); // Hide the URL list if there are no URLs
        }
    };


    const handleSearch = async () => {
        if (urls.length > 0) {
            // Set initial status as "Scraping has started..."
            setScrapingStatus("Scraping has started...");
    
            // After 5 seconds, change the status to "Scraping in progress..."
            const progressTimeout1 = setTimeout(() => {
                setScrapingStatus("Scraping in progress...");
            }, 5000); 
    
            // After 5 seconds, change the status to "Scraping in progress..."
            const progressTimeout2 = setTimeout(() => {
                setScrapingStatus("Scraping in progress..... Please wait.");
            }, 10000);

            try {
                // Send the request to the backend
                const response = await fetch("http://127.0.0.1:5000/api/extract_data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ urls }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    // Clear the progress timeout if scraping completes before 5 seconds
                    clearTimeout(progressTimeout2);
                    // Once scraping is complete, update the status
                    setScrapingStatus(`${data.output}`);
                } else {
                    const data = await response.json();
                    // Clear the progress timeout if scraping completes before 5 seconds
                    clearTimeout(progressTimeout2);
                    // If there was an error, display the error message
                    setScrapingStatus(`Failed to save URLs. Error: ${data.error}`);
                }
            } catch (error) {
                console.error("Error:", error);
                // Clear the progress timeout if an error occurs before 5 seconds
                clearTimeout(progressTimeout2);
                // If an error occurs while sending the request, display an error message
                setScrapingStatus("An error occurred while saving URLs.");
            }
        } else {
            // If no URLs are provided, notify the user
            setScrapingStatus("Please add at least one URL.");
        }
    };
    
    

    return (
        <div className="container">
         
            <div className="homeDescription">
                <h1>Your Go-To Web Scraping Tool!!</h1>
                <p>Want to extract web content seamlessly?</p>
                <p>Look no further!</p>
                {/*
                <p>
                    Harness the power of web scraping to collect data efficiently. <br></br>
                    Whether you're gathering information for research,<br></br> 
                    monitoring trends or compilinng useful resources,<br></br> 
                    our tool simplifies the process for you.
                </p>
                */}
                <div className="extractDeli">
                    <h1>Extract {currentDeli}</h1>
                </div>

            </div>


            <div className="scrappingContent">
                <input
                    type="text"
                    placeholder="Input Keyword Here"
                    value={url}
                    style={{fontSize:"20px"
                        
                    }}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button className="addButton" onClick={handleAddUrl}>Add</button>

                {showUrlList && ( // Conditionally render the URL list
                    <div className="urlList">
                        <h2 style={{
                            fontSize: "30px",
                            color: "Black",
                            marginTop: "10px",
                            marginBottom: "25px"
                        }}>Keyword Listings</h2>
                        <ul>
                            {urls.map((url, index) => (
                                <li key={index}>
                                    {url}
                                    <button
                                        className="removeButton"
                                        onClick={() => handleRemoveUrl(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="buttonContainer">
                                
                
                    <button className="searchButton" onClick={handleSearch}>Start Scrape</button>
                    
                </div>
                <p>{scrapingStatus}</p>
            </div>
        </div>
    );
};

export default Home;
