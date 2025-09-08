'use client';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faFileWaveform, faUserDoctor, faRobot, faCloudArrowUp, faCamera, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { Sparkles, ChevronLeft, ChevronRight, Star, Award, Calendar, MapPin, Users, Brain, Scale, Stethoscope, Leaf, MessageCircle, Pill, Droplet, User, X, CheckCircle } from 'lucide-react';
import ExpertCard from '../components/ExpertCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchCoaches , fetchCoachesBySpecialization } from '@/lib/api/coaches';


export default function DermaCare(){
    const aiScanRef = useRef(null);
    const expertsRef = useRef(null);
    const scrollToSection = (section) =>{
        section.current?.scrollIntoView({behavior: 'smooth'});
    }
    const imageInput = useRef(null);
    const inputBtn = () =>{
        imageInput.current?.click();
    }
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
                    <input type="file" id="skinImageInput" className="hidden" accept="image/*" ref={imageInput}/>
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
                                <select id="skinType" className="w-full p-3 border border-gray-300 bg-white rounded-md text-dark">
                                    <option>Oily</option><option>Dry</option><option>Combination</option><option>Normal</option><option>Sensitive</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="mainConcern" className="block text-sm font-medium mb-1">What is your main concern?</label>
                                <select id="mainConcern" className="w-full p-3 border border-gray-300 bg-white rounded-md text-dark">
                                    <option>Acne</option><option>Aging</option><option>Pigmentation</option><option>Dullness</option><option>Redness</option>
                                </select>
                            </div>
                            <button id="submitPlanRequest" className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
                                <span>Generate Plan</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div id="generatedPlanContainer" className="grid grid-cols-2 gap-4">
                            {/* Generated plan will appear here */}
                        </div>
                        <p id="planError" className="text-yellow-300 text-sm mt-4 text-center hidden"></p>
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
                    <div className="doctor-card bg-white rounded-xl shadow-lg p-6 text-center group transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative inline-block">
                            <img src="https://placehold.co/150x150/2C8C91/FFFFFF?text=Dr.R" alt="Dr. Riya" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                            <span className="absolute bottom-4 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <span className="w-2 h-2 bg-white rounded-full live-dot"></span>
                                LIVE
                            </span>
                        </div>
                        <h4 className="font-bold text-xl text-dark">Dr. Riya Sharma</h4>
                        <p className="text-primary font-semibold text-sm">Dermatologist</p>
                        <p className="text-gray-500 text-sm my-4">Specializes in acne and anti-aging treatments with 12+ years of experience.</p>
                        <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg group-hover:bg-accent cursor-pointer transition-colors duration-300">Book Video Consult</button>
                    </div>
                    {/* Doctor Card 2 */}
                    <div className="doctor-card bg-white rounded-xl shadow-lg p-6 text-center group transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative inline-block">
                            <img src="https://placehold.co/150x150/2C8C91/FFFFFF?text=Dr.A" alt="Dr. Arjun" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                            <span className="absolute bottom-4 right-2 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                                AWAY
                            </span>
                        </div>
                        <h4 className="font-bold text-xl text-dark">Dr. Arjun Verma</h4>
                        <p className="text-primary font-semibold text-sm">Cosmetologist</p>
                        <p className="text-gray-500 text-sm my-4">Expert in cosmetic procedures and advanced skincare routines.</p>
                        <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg cursor-pointer group-hover:bg-accent transition-colors duration-300">Book Video Consult</button>
                    </div>
                    {/* Doctor Card 3 */}
                    <div className="doctor-card bg-white rounded-xl shadow-lg p-6 text-center group transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative inline-block">
                            <img src="https://placehold.co/150x150/2C8C91/FFFFFF?text=Dr.S" alt="Dr. Sneha" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
                            <span className="absolute bottom-4 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                AVAILABLE
                            </span>
                        </div>
                        <h4 className="font-bold text-xl text-dark">Dr. Sneha Patel</h4>
                        <p className="text-primary font-semibold text-sm">Trichologist</p>
                        <p className="text-gray-500 text-sm my-4">Focused on hair and scalp health, including hair loss solutions.</p>
                        <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg cursor-pointer group-hover:bg-accent transition-colors duration-300">Book Video Consult</button>
                    </div>
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

        </div>
    );


}
