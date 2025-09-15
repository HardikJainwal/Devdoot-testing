import { Star, Award } from 'lucide-react';

const ExpertCard = ({ expert, isCenter, onClick }) => {
  return (
    <div className={`p-4 rounded-xl shadow-md bg-white text-center transition-all duration-300 ${isCenter ? 'border-2 border-[#C42323]' : ''}`}
    onClick={onClick}>
      <img src={expert.image} alt={expert.name} className="w-24 h-24 mx-auto rounded-full mb-3" />
      <h3 className="text-lg font-semibold">{expert.name}</h3>
      <p className="text-gray-600">{expert.specialization}</p>
      <p className="text-gray-500 text-sm">{expert.qualification}</p>
      <p className="text-gray-500 text-sm">{expert.experience}</p>
      <p className="text-gray-500 text-sm">{expert.location}</p>
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < Math.round(expert.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-gray-600 text-sm">({expert.reviews})</span>
      </div>
      <p className="text-gray-600 mt-2">{expert.description}</p>
      {expert.achievements.length > 0 && (
        <div className="mt-2">
          {expert.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-center text-sm text-gray-500">
              <Award className="w-4 h-4 mr-1" />
              {achievement}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertCard;