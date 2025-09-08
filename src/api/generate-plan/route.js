// app/api/generate-plan/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ 
        error: 'API key not configured',
        plan: [
          {
            title: "Configuration Error",
            description: "Please set up your Gemini API key in environment variables."
          }
        ],
        coachRecommendation: "System Administrator"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { mood, goal } = await request.json();
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a wellness coach. Generate wellness plans in valid JSON format only."
    });
    
    const prompt = `Generate a personalized wellness plan for someone who feels ${mood} and wants to ${goal}. 

Return ONLY valid JSON in this exact format (no extra text, no markdown):
{
  "plan": [
    {"title": "Step 1 title", "description": "Step 1 description"},
    {"title": "Step 2 title", "description": "Step 2 description"},
    {"title": "Step 3 title", "description": "Step 3 description"}
  ],
  "coachRecommendation": "Dr. Sarah Johnson (Nutritionist & Wellness Coach)"
}

Choose the coach based on the goal:
- Stress/Mental Health: "Dr. Emily Chen (Mental Health & Mindfulness)"
- Fitness/Energy: "Mike Thompson (Fitness & Personal Training)"  
- Nutrition/Balance: "Dr. Sarah Johnson (Nutritionist & Wellness Coach)"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up the response
    if (text.includes('```json')) {
      text = text.replace(/```json\n?/, '').replace(/```$/, '');
    }
    if (text.includes('```')) {
      text = text.replace(/```\n?/, '').replace(/```$/, '');
    }
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', text);
      
      // Fallback response
      parsedResponse = {
        plan: [
          {
            title: "Mindful Breathing",
            description: "Practice 5-minute deep breathing exercises twice daily."
          },
          {
            title: "Regular Movement", 
            description: "Incorporate 20-30 minutes of light exercise daily."
          },
          {
            title: "Healthy Routine",
            description: "Establish consistent sleep and meal schedules."
          }
        ],
        coachRecommendation: getCoachRecommendation(goal)
      };
    }

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Return fallback response
    return new Response(JSON.stringify({
      plan: [
        {
          title: "Stay Hydrated",
          description: "Drink 8 glasses of water throughout the day."
        },
        {
          title: "Take Breaks",
          description: "Take 5-minute breaks every hour to stretch and breathe."
        },
        {
          title: "Get Quality Sleep",
          description: "Aim for 7-8 hours of quality sleep each night."
        }
      ],
      coachRecommendation: "Dr. Sarah Johnson (Nutritionist & Wellness Coach)"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function getCoachRecommendation(goal) {
  const goalLower = goal.toLowerCase();
  if (goalLower.includes('stress') || goalLower.includes('anxious') || goalLower.includes('sleep')) {
    return "Dr. Emily Chen (Mental Health & Mindfulness)";
  } else if (goalLower.includes('energy') || goalLower.includes('fitness')) {
    return "Mike Thompson (Fitness & Personal Training)";
  } else {
    return "Dr. Sarah Johnson (Nutritionist & Wellness Coach)";
  }
}