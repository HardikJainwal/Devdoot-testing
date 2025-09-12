// components/RazorpayCheckout.js
'use client';
import { loadRazorpay } from '@lib/loadRazorpay';
import { createOrderAPI } from '@service/payment';


export default function RazorpayCheckoutButton({ amount, name, id, currency }) {
    const handlePayment = async () => {
        const res = await loadRazorpay();
        if (!res) {
            alert('Failed to load Razorpay SDK');
            return;
        }
        // 2. Open Razorpay Checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // add this to .env
            amount: order.amount,
            currency,
            name,
            description: 'Transaction',
            order_id: id,
            handler: function (response) {
                // Success Callback
                alert('Payment Successful!');
                console.log(response);
                // Optionally verify on backend
            },
            prefill: {
                name: 'John Doe',
                email: 'john@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="px-4 py-2 bg-black text-white rounded"
        >
            Pay ₹500
        </button>
    );
}

