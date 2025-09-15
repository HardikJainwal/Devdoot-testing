import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create((set)=>({
    paymentSuccess: null,
    setPaymentSuccess: (data) => set({paymentSuccess: data}),
    booking: null,
    setBooking: (data) => set({booking: data}),
    createOrder: null,
    setCreateOrder: (data) => set({createOrder: data}),
}))
