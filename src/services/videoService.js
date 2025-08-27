// // services/videoService.js

// // Mock service for development
// export const mockVideoService = {
//   async initializeSession(sessionData) {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     return {
//       roomId: sessionData.roomId || `room_${Date.now()}`,
//       token: sessionData.token || `mock_token_${Math.random()}`,
//       status: 'active',
//       participantId: `participant_${Date.now()}`
//     };
//   },

//   async joinSession(roomId, token) {
//     console.log('Joining session:', { roomId, token });
//     return { success: true, roomId, token };
//   },

//   async leaveSession(roomId) {
//     console.log('Leaving session:', roomId);
//     return { success: true };
//   },

//   async getSessionStatus(roomId) {
//     return {
//       roomId,
//       status: 'active',
//       participants: 2,
//       duration: Math.floor(Math.random() * 3600)
//     };
//   }
// };

// // Real service (to be implemented when APIs are ready)
// export const realVideoService = {
//   async initializeSession(sessionData) {
//     const response = await fetch('/api/video/initialize', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(sessionData)
//     });
//     return response.json();
//   },

//   async joinSession(roomId, token) {
//     const response = await fetch('/api/video/join', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ roomId, token })
//     });
//     return response.json();
//   },

//   async leaveSession(roomId) {
//     const response = await fetch(`/api/video/leave/${roomId}`, {
//       method: 'POST'
//     });
//     return response.json();
//   },

//   async getSessionStatus(roomId) {
//     const response = await fetch(`/api/video/status/${roomId}`);
//     return response.json();
//   }
// };

// // Factory function to get the appropriate service
// export const getVideoService = () => {
//   const useMockData = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_BASE_URL;
//   return useMockData ? mockVideoService : realVideoService;
// };