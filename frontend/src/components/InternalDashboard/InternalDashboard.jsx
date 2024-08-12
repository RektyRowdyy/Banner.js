import { useEffect, useState } from "react";
import classNames from "classnames";
import AlertBanner from "../../utils/AlertBanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InternalDashboard() {

    const navigate = useNavigate(); //Navigate to Banner
    const [isVisible, setIsVisible] = useState(true); // State for visibility
    const [showAlert, setShowAlert] = useState(false); // State for showing alert
    const [alertMessage, setAlertMessage] = useState(""); // State for Alert message
    const [alertType, setAlertType] = useState(""); // State for alertType 'success' or 'error'

    //Banner Details
    const [bannerData, setBannerData] = useState({
        id: '',
        description: '',
        timer: 0,
        link: '',
        isVisible: true
    });

     useEffect(() => {
        axios.get('http://localhost:8000/api/banner/getBanner')
            .then(res => {
                const data = res.data[0];
                setBannerData(data); // Update Banner Details according to data received from API
                setIsVisible(data.isVisible); //Update Visibilty of Banner
            })
            .catch(err => console.error('Error fetching Banner', err));
    }, []);

    const handleSubmit = async (event) => {

        event.preventDefault();

        //Form values
        const description = event.target.description.value;
        const timer = event.target.timer.value;

        //Basic Validation for Description
        if (description.length < 100) {
            setAlertMessage("Description must be at least 100 characters.");
            setAlertType("error");
            setShowAlert(true);
            return;
        }

        //Basic Validation for Timer
        if (timer < 30) {
            setAlertMessage("Timer must be at least 30 seconds.");
            setAlertType("error");
            setShowAlert(true);
            return;
        }

        // If Validation passes
        try {
            bannerData.isVisible = isVisible;
            await axios.put('http://localhost:8000/api/banner/updateBanner', bannerData);
            setAlertMessage("Banner updated successfully!");
            setAlertType("success");
            setShowAlert(true);
            //Navigate to Banner in 3 Seconds
            setTimeout(() => {
                navigate('/');
            }, 3 * 1000)
            

        } catch (error) {
            setAlertMessage("Failed to update Banner.");
            setAlertType("error");
            setShowAlert(true);
            return;
        }
        
        
    };
    return (
        <>
            {/* AlertBanner Utility */}
            {showAlert && (
                <AlertBanner
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}

            {/* Banner Form */}
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                        <svg width="100" height="100" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                    fill="black"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">Edit Your Banner</h2>
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="description" className="text-base font-medium text-gray-900">Banner Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" value={bannerData.description}
                                            onChange={(e) => setBannerData({...bannerData, description: e.target.value})}
                                            className="flex h-28 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            placeholder="Add custom description..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="timer" className="text-base font-medium text-gray-900">Banner Timer</label>
                                    <div className="mt-2">
                                        <input placeholder="Add banner timer in seconds..." type="number"
                                            id="timer"name="timer" value={bannerData.timer}
                                            onChange={(e) => setBannerData({...bannerData, timer: parseInt(e.target.value)})}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <label htmlFor="isActive" className="text-base font-medium text-gray-900 mr-4">Banner On/Off</label>
                                        <div onClick={() => setIsVisible(!isVisible)}
                                            className={classNames("flex w-20 h-10 bg-gray-600 rounded-full cursor-pointer duration-500", { 'bg-indigo-300': isVisible })}>
                                            <span className={classNames("h-10 w-10 bg-white rounded-full transition-all duration-500 shadow-lg", { 'ml-10': isVisible })}></span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                                        Show Updated Banner
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default InternalDashboard;
