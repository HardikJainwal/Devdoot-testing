'use client';
import { useState, useEffect, useRef } from 'react';
import { skinAiAPI, planGenAiAPI } from '@/services/aiCalls';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro,faTimes, faFileWaveform, faUserDoctor, faRobot, faCloudArrowUp, faCamera, faQuoteLeft, 
    faTint, faBookOpen,
    faSpa,
    faAppleAlt,
    faCoffee,
    faRunning,
    faBed,
    faHeart,
    faSmile, } from "@fortawesome/free-solid-svg-icons";


export default function DermaCare(){
    /* Ref here */
    const aiScanRef = useRef(null);
    const expertsRef = useRef(null);
    const imageInput = useRef(null);
    const modalRef = useRef(null);
    const modalTitleRef = useRef(null);
    const modalBodyRef = useRef(null);
    const modalCloseRef = useRef(null);

    const colors = {
        Hydration: 'blue', Learn: 'orange', Mindfulness: 'purple', Nutrition: 'green'
    };
    /* State here */
    const [show, setShow] = useState(false);
    const [skinType, setSkinType] = useState("Oily");
    const [mainConcern, setMainConcern] = useState("Acne");
    const [plan, setPlan] = useState([])
    const [planLoading,setPlanLoading] = useState(false);
    const [error,setError] = useState(false);
    const [doctors, setDoctors] = useState([]);

    /* Function here */
    const inputBtn = () =>{
        imageInput.current?.click();
    }
    const scrollToSection = (section) =>{
        section.current?.scrollIntoView({behavior: 'smooth'});
    }

    const handleFileChanges = (event) => {
        const selectedFile = event.target.files[0];
        console.log(event.target.files);
        console.log(selectedFile);
        setShow(true);
    }

    const generatePlanBtn = (event) => {
        const btn = event.target;
        btn.disabled = true;
        setPlanLoading(true);
        //btn.innerHTML = `<div class="w-5 h-5 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div><span>Generating...</span>`;
        console.log(mainConcern,skinType);
    }

    /*     Hook    */
    useEffect(()=>{
        const updateModal = (title, body)=>{
            modalTitleRef.current.textContent = title ;
            modalBodyRef.current.innerHTML = body;
        }
        const getTheData = async()=>{
            try{
                //const data = await skinAiAPI(selectedFile);
                const data = "Healthy skin care starts with gentle cleansing, proper hydration, and daily use of sunscreen. Avoid harsh chemicals, drink plenty of water, and maintain a balanced diet to keep your skin glowing and healthy."

                if (data){
                    let result = `<div class="prose prose-sm max-w-none">${data.replace(/\n/g, '<br>')}</div>` 
                    updateModal("✨ AI Skin Analysis Report", result);
                }
            }catch(error){
                console.error("AI Skin Analysis Error:", error);
                updateModal("Error", "Sorry, the analysis could not be completed. Please try again.");
            }
        }
        const planGenAiData = async()=> {
            try{
                setPlan([])
                const data =  await planGenAiAPI();
                setPlan(data);
            }catch(err){
                console.log(err)
                setError(true);
            }
        }
        if (show && modalTitleRef.current && modalBodyRef){
            let spinner = `
<div class="flex justify-center items-center p-8">
<div class="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin">
</div>
</div>`;

            updateModal("Analyzing Your Skin...", spinner)
            getTheData();
        }
        if (planLoading){
            planGenAiData(); 
            setPlanLoading(false);
        }

    },[show, planLoading])

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="bg-background p-4 md:p-8 space-y-16 md:space-y-24">
                {/*==========HERO SECTION =========== */}
                <section id="home" className="fade-in text-center">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-dark mb-4">Expert Dermatologist, <br className="hidden md:block" /> On Your Screen.</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Get instant AI-powered skin analysis and personalized care plans from certified specialists. Your journey to radiant skin starts now.</p>
                        <div className="flex justify-center gap-4">
                            <a onClick={()=> { scrollToSection(aiScanRef) }} className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition-transform transform hover:scale-105 cursor-pointer">Scan Your Skin</a>
                            <a onClick={()=>{ scrollToSection(expertsRef)}} className="bg-primary-light text-primary font-bold py-3 px-8 rounded-full bg-primary-light-hover transition-colors cursor-pointer">Book a Consultation</a>

                        </div>
                    </div>
                </section>

                {/* =================================================================
    HOW IT WORKS SECTION
    ================================================================== */}
                <section id="how-it-works" className="fade-in text-center" style={{animationDelay: "0.2s"}}>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">Simple Steps to Healthier Skin</h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-12">Our process is designed for your convenience and peace of mind.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-primary-light text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"> <FontAwesomeIcon icon={faCameraRetro} className="fa-solid text-2xl" /></div>
                            <h3 className="text-xl font-bold text-dark">1. Scan Your Skin</h3>
                            <p className="text-gray-600 mt-2">Upload a photo and let our AI provide an instant analysis of your skin concerns.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-primary-light text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">< FontAwesomeIcon icon={faFileWaveform} className="fa-solid text-2xl" /></div>
                            <h3 className="text-xl font-bold text-dark">2. Get Your Report</h3>
                            <p className="text-gray-600 mt-2">Receive a detailed report and a recommendation on whether to consult a doctor.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-primary-light text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FontAwesomeIcon icon={faUserDoctor} className="fa-solid text-2xl" /></div>
                            <h3 className="text-xl font-bold text-dark">3. Consult an Expert</h3>
                            <p className="text-gray-600 mt-2">Connect with a certified dermatologist for a personalized treatment plan.</p>
                        </div>
                    </div>
                </section>

                {/* =================================================================
    AI SCAN SECTION
    ================================================================== */}
                <section id="ai-scan" ref={aiScanRef} className="fade-in text-center bg-white p-8 md:p-12 rounded-2xl shadow-xl" style={{animationDelay: "0.4s"}}>
                    <FontAwesomeIcon icon={faRobot} className="fa-solid text-6xl text-primary mb-4"/>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">✨ AI-Powered Skin Analysis</h2>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">Get an instant report on acne, pigmentation, eczema, and more. Our AI will scan your photo and recommend if a doctor's consultation is needed.</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 max-w-lg mx-auto" onClick={inputBtn}>
                        <FontAwesomeIcon icon={faCloudArrowUp} className="fa-solid text-4xl text-gray-400 mb-4" />
                        <p className="text-gray-500" >Upload a clear, well-lit photo</p>
                        <input type="file" id="skinImageInput" className="hidden" accept="image/*" onChange={handleFileChanges} ref={imageInput}/>
                        <button id="scanSkinBtn" className="mt-4 w-full md:w-auto bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-transform transform cursor-pointer hover:scale-105">
                            <FontAwesomeIcon icon={faCamera} className="fa-solid mr-2" />Scan Your Skin Now
                        </button>
                    </div>
                </section>

                {/* =================================================================
    GENERATE PERSONAL PLAN SECTION
    ================================================================== */}
                <section id="generate-plan" className="fade-in bg-primary text-white p-8 md:p-12 rounded-2xl shadow-lg" style={{animationDelay: "0.6s"}}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Generate Your Personal Plan</h2>
                            <p className="opacity-90 mb-6">Answer two simple questions to get a daily plan tailored to your skin's unique needs, powered by AI.</p>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="skinType" className="block text-sm font-medium mb-1">What is your skin type?</label>
                                    <select id="skinType" className="w-full p-3 border border-gray-300 bg-white rounded-md text-dark" onChange={(event) => {setSkinType(event.target.value)}}>
                                        <option>Oily</option><option>Dry</option><option>Combination</option><option>Normal</option><option>Sensitive</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="mainConcern" className="block text-sm font-medium mb-1">What is your main concern?</label>
                                    <select id="mainConcern" className="w-full p-3 border border-gray-300 bg-white rounded-md text-dark" onChange={(event)=>{setMainConcern(event.target.value)}}>
                                        <option>Acne</option><option>Aging</option><option>Pigmentation</option><option>Dullness</option><option>Redness</option>
                                    </select>
                                </div>
                                <button id="submitPlanRequest" className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer gap-2 hover:bg-gray-100 transition-colors cursor-pointer" disabled={planLoading} onClick={generatePlanBtn}>
                                    { planLoading && (<div className="w-5 h-5 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>)}
                                    <span>{ planLoading ? "Generating ..." : "Generate Plan" }</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div id="generatedPlanContainer" className="grid grid-cols-2 gap-4">
                                { plan.map((item, index) => {
                                    const color = colors[item.category] || 'gray';

                                    return (
                                        <div
                                            key={index}
                                            className="bg-primary-light p-4 rounded-xl flex flex-col items-center text-center shadow-sm animate-fade-in">
                                            <div className={`bg-white text-${color}-500 w-12 h-12 flex items-center justify-center mb-2 rounded-full`} >
                                                <i className={item.icon}></i>
                                            </div>
                                            <h3 className="font-semibold text-sm text-dark">{item.title}</h3>
                                        </div>
                                    );
                                })
                                }
                            </div>
                            { error && <p id="planError" className="text-yellow-300 text-sm mt-4 text-center">Could not generate your plan. Please try again.</p>}
                        </div>
                    </div>
                </section>

                {/* =================================================================
    EXPERTS SECTION
    ================================================================== */}
                <section id="experts" ref={expertsRef} className="fade-in" style={{animationDelay: "0.8s"}}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">Meet Our Board-Certified Dermatologists</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">Hand-picked specialists dedicated to providing you with the highest quality of care.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Doctor Card 1 */}
                        { doctors.map((doctor, index)=>{
                            return (
                        <div key={index} className="doctor-card bg-white rounded-xl shadow-lg p-6 text-center group transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative inline-block">
                                <img src={doctor.image} alt="Dr. Riya" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                                <span className="absolute bottom-4 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                    <span className="w-2 h-2 bg-white rounded-full live-dot"></span>
                                    LIVE
                                </span>
                            </div>
                            <h4 className="font-bold text-xl text-dark">{doctor.name}</h4>
                            <p className="text-primary font-semibold text-sm">{doctor.specialization}</p>
                            <p className="text-gray-500 text-sm my-4">{doctor.describe}</p>
                            <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg group-hover:bg-accent cursor-pointer transition-colors duration-300">Book Video Consult</button>
                        </div>)
                        })}
                    </div>
                </section>

                {/* =================================================================
    TESTIMONIALS SECTION
    ================================================================== */}
                <section id="testimonials" className="fade-in max-w-4xl mx-auto text-center" style={{animationDelay: '1.0s'}}>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">Real Stories from Real Patients</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-primary text-3xl mb-4"><FontAwesomeIcon icon={faQuoteLeft} className="fa-solid" /></div>
                            <p className="text-gray-600 mb-6">"The AI scan was surprisingly accurate and gave me the confidence to finally book a consultation. Dr. Sharma was fantastic and my skin has never looked better!"</p>
                            <div className="flex items-center justify-center">
                                <img src="https://placehold.co/60x60/2B2B2A/FFFFFF?text=P" alt="Priya S." className="w-12 h-12 rounded-full mr-4"/>
                                <div>
                                    <h4 className="font-bold text-dark">Priya S.</h4>
                                    <p className="text-sm text-gray-500">Treated for Acne</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-primary text-3xl mb-4"><FontAwesomeIcon icon={faQuoteLeft} className="fa-solid" /></div>
                            <p className="text-gray-600 mb-6">"I was skeptical about virtual dermatology, but this platform made it so easy. The personalized plan is a great touch and keeps me on track every day."</p>
                            <div className="flex items-center justify-center">
                                <img src="https://placehold.co/60x60/2B2B2A/FFFFFF?text=R" alt="Rohan M." className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold text-dark">Rohan M.</h4>
                                    <p className="text-sm text-gray-500">Treated for Pigmentation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            { /* ============== MODALS =================== */}
            {show && 
                <div id="modal" ref={modalRef} className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                        <div id="modal-header" className="p-4 border-b flex justify-between items-center">
                            <h3 id="modal-title" ref={modalTitleRef} className="text-xl font-bold text-dark"></h3>
                            <button id="closeModalBtn" ref={modalCloseRef} className="text-gray-400 hover:text-gray-600" aria-label="Close modal" onClick={()=>{ setShow(false)}}>
                                <FontAwesomeIcon icon={faTimes} className="fa-solid text-2xl" />
                            </button>
                        </div>
                        <div id="modal-body" className="p-6 overflow-y-auto" ref={modalBodyRef}>
                        </div>
                    </div>
                </div>}

        </div>
    );


}
