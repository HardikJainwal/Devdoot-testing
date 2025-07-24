import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ethan Carter",
      image: "/api/placeholder/150/150",
      role: "CEO & Founder"
    },
    {
      name: "Sophie Bennett",
      image: "/api/placeholder/150/150", 
      role: "CTO"
    },
    {
      name: "Liam Harper",
      image: "/api/placeholder/150/150",
      role: "Lead Developer"
    }
  ];

  return (
    <div className={`${poppins.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
      {/* Header with Logo */}
      <div className="pt-16 pb-8">
        <div className="flex justify-center">
          <div className="w-200 h-24 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
            <Image
              src="/images/Logo.png" 
              alt="Devdoot Logo"
              width={400}
              height={200}
              className="object-contain" 
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* About Devdoot Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Devdoot</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            At Devdoot, we believe that timely access to healthcare can save lives and transform communities. Founded with 
            a mission to revolutionize emergency medical assistance, Devdoot is your trusted partner for on-demand medical 
            services.
          </p>

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At TaskMaster, we are committed to empowering you to reach your full potential. We believe that with the right 
              tools, anyone can master their tasks and achieve their goals.
            </p>
          </div>

          {/* Why Choose Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Devdoot?</h2>
            <p className="text-gray-700 leading-relaxed">
              We value simplicity, innovation, and user satisfaction. We are constantly iterating and improving TaskMaster based 
              on user feedback.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-700 leading-relaxed">
              We value simplicity, innovation, and user satisfaction. We are constantly iterating and improving TaskMaster based 
              on user feedback.
            </p>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet the Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
