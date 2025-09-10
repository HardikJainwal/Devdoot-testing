import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CreditCardIcon, 
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#345268] to-[#2C8C91] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheckIcon className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold">Refund & Cancellation Policy</h1>
          </div>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
            At DeviceX, we prioritize providing exceptional services to our users. In the unlikely event that you are 
            dissatisfied or need to request a refund or cancellation, this policy outlines the terms and procedures to ensure 
            clarity and transparency.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Refund Policy Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <CreditCardIcon className="w-8 h-8 text-[#C42323]" />
            <h2 className="text-3xl font-bold text-[#2B2B2A]">Refund Policy</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              You may cancel your subscription at any time. To cancel your subscription, 
              go to your account settings and follow the cancellation instructions. Upon cancellation, you will retain access to your account until the end of your current billing cycle. 
              No further charges will be made after cancellation.
            </p>
          </div>
        </div>

        {/* Conditions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <ExclamationTriangleIcon className="w-8 h-8 text-[#C42323]" />
            <h2 className="text-3xl font-bold text-[#2B2B2A]">Conditions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-[#C42323]">
              <ClockIcon className="w-6 h-6 text-[#C42323] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#2B2B2A] mb-2">Time Restrictions</h3>
                <p className="text-gray-700 leading-relaxed">
                  Refunds are only applicable for new subscriptions within the first 30 days. 
                  Renewals are not eligible for refunds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg border-l-4 border-[#2C8C91]">
              <CreditCardIcon className="w-6 h-6 text-[#2C8C91] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#2B2B2A] mb-2">Cancellation Process</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you cancel your subscription after the 30-day period, you will still receive a refund for the remaining days in your 
                  billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#345268] to-[#2C8C91] rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <EnvelopeIcon className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold">Contact Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-blue-100 leading-relaxed mb-6">
                If you have any questions or need assistance with refunds or cancellations, 
                please contact our support team at:
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-200" />
                <a 
                  href="mailto:support@example.com" 
                  className="text-white hover:text-blue-200 transition-colors duration-200 underline decoration-2 underline-offset-2"
                >
                  support@example.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-blue-200" />
                <span className="text-white">1-800-SUPPORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">
            This policy is effective as of the current date and may be updated from time to time. 
            Please check this page periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
}