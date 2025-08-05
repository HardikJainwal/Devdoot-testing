// components/CertificationCarousel.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const certifications = [
  {
    src: "/images/iso.png",
    alt: "ISO Certification"
  },
  {
    src: "/images/msme.png",
    alt: "Ministry Certification"
  },
  {
    src: "/images/makeinIndia.png",
    alt: "Make in India Certification"

  },
  {
    src:"/images/startupIndia.png",
    alt: "Startup India Certification"
  },
  {
    src: "/images/govt-red.jpeg",
    alt: "Approved Certification"
  },
  {
    src: "/images/GOV-APPROVED-STAMP.png",
    alt: "Government Approved"
  }

];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2500,
  centerMode: true,        // Add this
  centerPadding: '0px',    // Add this to remove extra padding
  focusOnSelect: true,     // Optional: makes center slide clickable
  responsive: [
    {
      breakpoint: 1024, 
      settings: { 
        slidesToShow: 2,
        centerMode: true,    // Keep center mode on mobile
        centerPadding: '0px'
      }
    },
    {
      breakpoint: 768, 
      settings: { 
        slidesToShow: 1,
        centerMode: true,    // Keep center mode on mobile
        centerPadding: '20px' // Add some padding on mobile
      }
    }
  ]
};

export default function CertificationCarousel() {
  return (
    <div className="max-w-6xl mx-auto"> {/* Add this wrapper */}
      <Slider {...settings}>
        {certifications.map((cert, idx) => (
          <div key={idx} className="flex justify-center items-center p-4">
            <img src={cert.src} alt={cert.alt} className="w-36 h-36 object-contain" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
