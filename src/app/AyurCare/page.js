    'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBalanceScaleRight,faSeedling,faUserMd,faClipboardList,faComments,faPills,faSpa, faBrain, faChevronLeft, faChevronRight, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
// import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { Sparkles } from "lucide-react";

export const AyurCaredata = {
  title: 'AayurCare - Holistic Ayurvedic Wellness in India',
  description: 'Begin your Ayurvedic wellness journey with AayurCare. Get personalized dosha analysis, expert consultations, and natural healing plans from certified doctors in India.',
  keywords: 'Ayurveda, wellness, India, dosha quiz, Ayurvedic doctor, holistic healing, natural wellness, Panchakarma, herbal medicine, AayurCare',
  author: 'AayurCare',
};

export default function AayurCare() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('Wellness Quiz');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const doshaInfo = {
    vata: {
      title: 'You are predominantly Vata',
      description: 'Vata types are energetic, creative, and light. Governed by air and ether, you are always on the go. When out of balance, you may experience anxiety, insomnia, and dry skin.',
      suggestions: [
        '<strong>Stay Warm:</strong> Favor warm foods and drinks. Avoid cold, frozen, or raw foods.',
        '<strong>Maintain Routine:</strong> A regular daily routine for sleeping and eating helps ground Vata energy.',
      ],
    },
    pitta: {
      title: 'You are predominantly Pitta',
      description: 'Pitta types are intelligent, ambitious, and sharp. Governed by fire and water, you have a strong intellect and appetite. When out of balance, you can be irritable, and suffer from inflammation or acidity.',
      suggestions: [
        '<strong>Stay Cool:</strong> Avoid excessive heat, spicy foods, and over-exposure to the sun.',
        '<strong>Practice Moderation:</strong> Channel your competitive nature into healthy activities and avoid overworking.',
      ],
    },
    kapha: {
      title: 'You are predominantly Kapha',
      description: 'Kapha types are calm, loving, and steady. Governed by earth and water, you are naturally strong and have a caring nature. When out of balance, you may experience sluggishness, weight gain, and congestion.',
      suggestions: [
        '<strong>Stay Active:</strong> Regular, stimulating exercise is essential to keep your energy flowing.',
        '<strong>Eat Light & Spicy:</strong> Favor light, dry, and warm foods. Pungent and bitter tastes are beneficial.',
      ],
    },
  };

  const testimonials = [
    {
      img: 'https://i.pravatar.cc/100?img=1',
      name: 'Priya Sharma',
      rating: 5,
      text: 'AayurCare transformed my approach to health. The dosha quiz was incredibly accurate, and the consultation helped me understand my body like never before.',
    },
    {
      img: 'https://i.pravatar.cc/100?img=2',
      name: 'Rohan Mehta',
      rating: 4,
      text: 'The personalized plan was easy to follow and made a huge difference in my energy levels. Highly recommend their holistic approach!',
    },
    {
      img: 'https://i.pravatar.cc/100?img=3',
      name: 'Anjali Singh',
      rating: 5,
      text: 'The doctors are so knowledgeable and caring. I finally feel in control of my well-being. Thank you, AayurCare!',
    },
  ];

  const openModal = (title) => {
    setQuizTitle(title);
    setIsModalOpen(true);
    setShowResults(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    for (let [, value] of formData.entries()) {
      scores[value]++;
    }

    let dominantDosha = 'vata';
    if (scores.pitta > scores.vata && scores.pitta >= scores.kapha) {
      dominantDosha = 'pitta';
    } else if (scores.kapha > scores.vata && scores.kapha > scores.pitta) {
      dominantDosha = 'kapha';
    }

    setResults(doshaInfo[dominantDosha]);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    document.getElementById('dosha-quiz-form')?.reset();
  };

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main className="text-brand-dark">
      {/* Hero Section */}
      <section id="home" className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner/Care-Camp.webp"
        alt="AayurCare Banner"
        fill
        className="absolute inset-0 object-cover z-0"
        priority
      />

      {/* Black Overlay */}
      

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-10 h-10 text-green-600" />
          <span className="text-4xl font-bold text-white">AayurCare</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Begin Your Ayurvedic Wellness Journey
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
          Rediscover harmony and vitality with timeless wisdom, tailored for modern life. Your path to natural healing starts here.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#dosha-quiz"
            className="inline-block bg-[#C42323] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Take a Wellness Quiz
          </a>
          <a
            href="#final-cta"
            className="inline-block bg-[#2C8C91] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>


      {/* Why AayurCare Section */}
      <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-secondary text-[#C42323] mb-16 font-poppins">
          Why Choose <span className="text-[#2C8C91]"> AayurCare?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: faSeedling,
              bg: "bg-teal-100",
              color: "text-brand-teal",
              title: "Holistic Wellness Approach",
              desc: "We treat the root cause, not just the symptoms, by creating harmony between your mind, body, and spirit.",
            },
            {
              icon: faUserMd,
              bg: "bg-red-100",
              color: "text-brand-primary",
              title: "Certified Ayurvedic Doctors",
              desc: "Our team of experienced and certified Vaidyas provides authentic and trustworthy guidance.",
            },
            {
              icon: faClipboardList,
              bg: "bg-blue-100",
              color: "text-brand-secondary",
              title: "Personalized Healing Plans",
              desc: "Receive custom-tailored diet, lifestyle, and herbal plans designed specifically for your unique constitution.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
            >
              <div className={`flex items-center justify-center h-20 w-20 mx-auto mb-6 rounded-full ${item.bg}`}>
                <FontAwesomeIcon icon={item.icon} className={`text-3xl ${item.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-brand-secondary mb-3 font-poppins">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
         <h2 className="text-5xl font-bold text-center text-[#C42323] mb-12">
  Our <span className="text-[#2C8C91]">Services</span>
</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-[#C42323] text-brand-primary mb-4" />
              <h3 className="text-xl font-semibold text-brand-secondary mb-3">Ayurvedic Coaching</h3>
              <p className="text-gray-600 mb-4">Ongoing support to integrate Ayurvedic principles into your daily life for lasting change.</p>
              <a href="#final-cta" className="font-semibold text-brand-primary text-[#C42323]">Know More &rarr;</a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <FontAwesomeIcon icon={faPills} className="text-4xl  text-[#2C8C91] mb-4" />
              <h3 className="text-xl font-semibold text-brand-secondary mb-3">Herbal Medicines</h3>
              <p className="text-gray-600 mb-4">Potent, pure, and authentic herbal formulations to support your healing journey.</p>
              <a href="#final-cta" className="font-semibold text-brand-primary text-[#C42323]">Know More &rarr;</a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <FontAwesomeIcon icon={faSpa} className="text-4xl text-[#C42323]  mb-4" />
              <h3 className="text-xl font-semibold text-brand-secondary mb-3">Panchakarma at Home</h3>
              <p className="text-gray-600 mb-4">Deep detoxification and rejuvenation in the comfort of your own home.</p>
              <a href="#final-cta" className="font-semibold text-brand-primary text-[#C42323]">Know More &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coaches Section */}
      <section id="experts" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-[#C42323] mb-12">Meet Our <span className="text-[#2C8C91]">Experts</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <img src="https://i.pravatar.cc/150?img=5" alt="Dr. Anika Sharma" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" loading="lazy" />
              <h3 className="text-xl font-bold text-brand-secondary">Dr. Anika Sharma</h3>
              <p className="text-brand-teal font-medium">BAMS, MD (Ayurveda)</p>
              <p className="text-gray-600 my-3">Specialization: Women   s Health, Stress Management</p>
              <a href="#final-cta" className="inline-block bg-brand-secondary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition">Book Now</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <img src="https://i.pravatar.cc/150?img=8" alt="Dr. Vikram Singh" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" loading="lazy" />
              <h3 className="text-xl font-bold text-brand-secondary">Dr. Vikram Singh</h3>
              <p className="text-brand-teal font-medium">BAMS</p>
              <p className="text-gray-600 my-3">Specialization: Panchakarma, Digestive Health</p>
              <a href="#final-cta" className="inline-block bg-brand-secondary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition">Book Now</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <img src="https://i.pravatar.cc/150?img=7" alt="Dr. Meera Desai" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" loading="lazy" />
              <h3 className="text-xl font-bold text-brand-secondary">Dr. Meera Desai</h3>
              <p className="text-brand-teal font-medium">MD (Ayurveda)</p>
              <p className="text-gray-600 my-3">Specialization: Skin Disorders, Lifestyle Coaching</p>
              <a href="#final-cta" className="inline-block bg-brand-secondary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition">Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Quizzes Section */}
      <section id="dosha-quiz" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-brand-secondary mb-4">Explore Our Wellness Quizzes</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">These short quizzes are designed to give you a glimpse into your unique Ayurvedic profile and current state of balance.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-5xl text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-brand-secondary mb-3">Your Core Constitution (Prakriti)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Discover your fundamental mind-body type to unlock personalized health insights.</p>
              <button className="mt-auto bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" onClick={() => openModal('Core Constitution (Prakriti) Quiz')}>
                Start Quiz
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <FontAwesomeIcon icon={faBalanceScaleRight} className="text-5xl text-brand-teal mb-4" />
              <h3 className="text-xl font-bold text-brand-secondary mb-3">Your Current Imbalance (Vikriti)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Assess your current symptoms to understand which doshas are presently out of balance.</p>
              <button className="mt-auto bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" onClick={() => openModal('Current Imbalance (Vikriti) Quiz')}>
                Start Quiz
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <FontAwesomeIcon icon={faBrain} className="text-5xl text-brand-secondary mb-4" />
              <h3 className="text-xl font-bold text-brand-secondary mb-3">Mental Wellness (Manas)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Evaluate your mental and emotional state to cultivate more peace and clarity.</p>
              <button className="mt-auto bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" onClick={() => openModal('Mental Wellness (Manas) Quiz')}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-brand-secondary mb-12">What Our Clients Say</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`carousel-slide text-center p-4 ${index === currentSlide ? 'active fade-in' : 'hidden'}`}>
                  <img src={testimonial.img} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-brand-primary" loading="lazy" />
                  <div className="text-yellow-400 mb-2">
                    {/* {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={i < testimonial.rating ? faStar } />
                    ))} */}
                  </div>
                  <p className="text-lg text-gray-600 italic mb-4">{testimonial.text}</p>
                  <h4 className="font-semibold text-brand-secondary">{testimonial.name}</h4>
                </div>
              ))}
            </div>
            <button className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white" onClick={() => showSlide((currentSlide - 1 + testimonials.length) % testimonials.length)}>
              <FontAwesomeIcon icon={faChevronLeft} className="text-brand-secondary" />
            </button>
            <button className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white" onClick={() => showSlide((currentSlide + 1) % testimonials.length)}>
              <FontAwesomeIcon icon={faChevronRight} className="text-brand-secondary" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="bg-blue-300 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Guidance?</h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">Book a free discovery call with one of our experts to discuss your wellness goals and find the right path for you.</p>
          <a href="https://wa.me/910000000000" target="_blank" className="inline-block bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105">Book a Free Discovery Call</a>
        </div>
      </section>

      {/* Quiz Modal */}
      {isModalOpen && (
        <div className="quiz-modal fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col fade-in">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-brand-secondary">{quizTitle}</h3>
              <button className="text-gray-500 hover:text-gray-800 text-2xl" onClick={closeModal} aria-label="Close quiz">&times;</button>
            </div>
            <div className="p-8 overflow-y-auto">
              {!showResults ? (
                <form id="dosha-quiz-form" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">1. My physical frame is:</p>
                      <div className="space-y-1">
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q1" value="vata" className="mr-3" required /> Thin, light, and slender</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q1" value="pitta" className="mr-3" /> Medium and well-proportioned</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q1" value="kapha" className="mr-3" /> Large, heavy, and sturdy</label>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">2. My skin is typically:</p>
                      <div className="space-y-1">
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q2" value="vata" className="mr-3" required /> Dry, thin, and cool to touch</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q2" value="pitta" className="mr-3" /> Oily, sensitive, and warm</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q2" value="kapha" className="mr-3" /> Thick, smooth, and moist</label>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">3. My appetite and digestion are:</p>
                      <div className="space-y-1">
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q3" value="vata" className="mr-3" required /> Irregular, variable</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q3" value="pitta" className="mr-3" /> Strong, sharp, I get irritable when hungry</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q3" value="kapha" className="mr-3" /> Slow, steady, I can skip meals easily</label>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">4. Under stress, I tend to become:</p>
                      <div className="space-y-1">
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q4" value="vata" className="mr-3" required /> Anxious, worried, and overwhelmed</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q4" value="pitta" className="mr-3" /> Irritable, angry, and impatient</label>
                        <label className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"><input type="radio" name="q4" value="kapha" className="mr-3" /> Withdrawn, lethargic, and complacent</label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <button type="submit" className="bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition">View My Result</button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-100 p-8 rounded-lg" dangerouslySetInnerHTML={{ __html: `
                    <h3 class="text-2xl font-bold text-brand-primary mb-3">${results.title}</h3>
                    <p class="text-gray-700 mb-6">${results.description}</p>
                    <div class="text-left space-y-3">
                      <h4 class="font-semibold text-lg text-brand-secondary">Lifestyle Suggestions:</h4>
                      <p class="text-gray-600">${results.suggestions[0]}</p>
                      <p class="text-gray-600">${results.suggestions[1]}</p>
                    </div>
                  `}} />
                  <div className="mt-6 flex justify-center space-x-4">
                    <button className="bg-brand-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition" onClick={handleRestart}>Restart Quiz</button>
                    <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition" onClick={closeModal}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}