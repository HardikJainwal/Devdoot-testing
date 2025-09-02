// app/api/yoga-plan/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ 
        error: 'API key not configured',
        sequence: [
          {
            pose: "Mountain Pose",
            duration: "1 minute",
            description: "Please configure your API key to get personalized recommendations."
          }
        ],
        instructorRecommendation: "System Administrator",
        benefits: ["Configuration needed"]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { experience, goal, timeAvailable } = await request.json();
    console.log('Received yoga plan request:', { experience, goal, timeAvailable });
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are an expert yoga instructor. Create personalized yoga sequences in valid JSON format only."
    });
    
    const prompt = `Create a personalized yoga sequence for:
- Experience Level: ${experience}
- Primary Goal: ${goal}
- Available Time: ${timeAvailable}

Return ONLY valid JSON in this exact format:
{
  "sequence": [
    {
      "pose": "Pose name",
      "duration": "X minutes",
      "description": "Brief instruction for the pose"
    }
  ],
  "benefits": ["benefit 1", "benefit 2", "benefit 3"],
  "instructorRecommendation": "Instructor name and specialization"
}

Create 4-6 poses appropriate for the time available. Choose instructor from:
- Maya Patel (Hatha & Restorative Yoga) - for relaxation, beginners
- James Wilson (Vinyasa & Power Yoga) - for strength, intermediate/advanced
- Priya Sharma (Yin Yoga & Mindfulness) - for stress relief, flexibility
- Alex Chen (Ashtanga & Alignment) - for balance, alignment focus

Make the sequence logical with warm-up, main poses, and cool-down.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up response
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', text);
      
      // Fallback response based on parameters
      parsedResponse = createFallbackYogaPlan(experience, goal, timeAvailable);
    }

    console.log('Sending yoga plan response:', parsedResponse);
    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Yoga Plan API Error:', error);
    
    return new Response(JSON.stringify({
      sequence: [
        {
          pose: "Mountain Pose",
          duration: "1 minute",
          description: "Stand tall with feet together, arms at sides. Focus on your breath."
        },
        {
          pose: "Child's Pose", 
          duration: "2 minutes",
          description: "Kneel and rest forehead on floor. Perfect for relaxation."
        }
      ],
      benefits: ["Improved posture", "Reduced stress", "Better focus"],
      instructorRecommendation: "Maya Patel (Hatha & Restorative Yoga)"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function createFallbackYogaPlan(experience, goal, timeAvailable) {
  const sequences = {
    beginner: [
      { pose: "Mountain Pose", duration: "1 minute", description: "Stand tall, focus on breathing and posture." },
      { pose: "Cat-Cow Stretch", duration: "2 minutes", description: "Gentle spinal movement on hands and knees." },
      { pose: "Downward Dog", duration: "2 minutes", description: "Stretch shoulders and hamstrings." },
      { pose: "Child's Pose", duration: "2 minutes", description: "Rest and restore energy." }
    ],
    intermediate: [
      { pose: "Sun Salutation A", duration: "3 minutes", description: "Flow through classic sequence." },
      { pose: "Warrior I", duration: "2 minutes", description: "Build strength in legs and core." },
      { pose: "Tree Pose", duration: "2 minutes", description: "Practice balance and focus." },
      { pose: "Seated Forward Fold", duration: "3 minutes", description: "Deep stretch for back and hamstrings." }
    ],
    advanced: [
      { pose: "Advanced Sun Salutation", duration: "4 minutes", description: "Flow with advanced variations." },
      { pose: "Crow Pose", duration: "2 minutes", description: "Arm balance for strength and focus." },
      { pose: "King Pigeon", duration: "3 minutes", description: "Deep backbend and hip opener." },
      { pose: "Headstand", duration: "3 minutes", description: "Inversion for circulation and core strength." }
    ]
  };

  const instructors = {
    flexibility: "Priya Sharma (Yin Yoga & Mindfulness)",
    strength: "James Wilson (Vinyasa & Power Yoga)", 
    relaxation: "Maya Patel (Hatha & Restorative Yoga)",
    balance: "Alex Chen (Ashtanga & Alignment)",
    "stress relief": "Priya Sharma (Yin Yoga & Mindfulness)"
  };

  const benefits = {
    flexibility: ["Improved flexibility", "Better range of motion", "Reduced muscle tension"],
    strength: ["Increased muscle tone", "Better core stability", "Enhanced endurance"],
    relaxation: ["Reduced stress", "Better sleep quality", "Mental calmness"],
    balance: ["Improved stability", "Better coordination", "Enhanced focus"],
    "stress relief": ["Reduced anxiety", "Mental clarity", "Emotional balance"]
  };

  return {
    sequence: sequences[experience.toLowerCase()] || sequences.beginner,
    benefits: benefits[goal.toLowerCase()] || benefits.relaxation,
    instructorRecommendation: instructors[goal.toLowerCase()] || instructors.relaxation
  };
}