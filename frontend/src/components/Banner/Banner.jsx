import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

function Banner() {

    //Banner Details
    const [bannerData, setBannerData] = useState({
        id: '',
        description: '',
        timer: 0,
        link: '',
        isVisible: true
    });

    const [timeLeft, setTimeLeft] = useState(0); // State for timeleft
    const [isVisible, setIsVisible] = useState(true); // State for visibility
    const navigate = useNavigate(); // Navigate to Internal Dashboard
    
    useEffect(() => {
        // Fetch banner data 
        axios.get('http://localhost:8000/api/banner/getBanner')
            .then(res => {
                const data = res.data[0];
                setBannerData(data); // Update Banner Details according to data received from API
                setTimeLeft(data.timer); // Update timeLeft when data is fetched
                setIsVisible(data.isVisible); //Update Visibilty of banner
            })
            .catch(err => console.error('Error fetching Banner', err));
    }, []);

    useEffect(() => {
        // Countdown logic
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
        else {
            setIsVisible(false);
        }
    }, [timeLeft]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div onClick={() => setIsVisible(!isVisible)} 
                className={classNames(
                    "flex w-20 h-10 m-10 rounded-full cursor-pointer duration-500",
                    { "bg-gray-600": !isVisible, "bg-indigo-300": isVisible }
                )}
            >
                <span
                    className={classNames(
                        "h-10 w-10 bg-white rounded-full transition-all duration-500 shadow-lg",
                        { "ml-10": isVisible }
                    )} />
            </div>
            <div
                className={classNames(
                    "w-[400px] max-w-full rounded-md border bg-indigo-300 flex flex-col transition-opacity duration-500",
                    { "opacity-100": isVisible, "opacity-0": !isVisible, "pointer-events-none": !isVisible }
                )}>
                <div className="relative h-[200px]">
                    <img
                        src={
                            "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                        }
                        alt="Banner Image" className="h-full w-full rounded-t-md object-cover" />
                    <div
                        className={classNames(
                            "absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded",
                            {
                                "bg-black bg-opacity-75": timeLeft > 0, // Black background when timeLeft is greater than 0
                                "bg-red-600": timeLeft <= 0, // Red background when timeLeft is less than or equal to 0
                            }
                        )}
                    >
                        {timeLeft > 0 ? `${timeLeft} sec` : "Banner Expired"}
                    </div>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-blue-950">Banner</h1>
                        <p className="mt-3 text-sm text-white break-words overflow-hidden">{bannerData.description}</p>
                    </div>
                    <button type="button"
                        className="w-full mt-4 rounded-md bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={() => navigate("/editBanner")}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
