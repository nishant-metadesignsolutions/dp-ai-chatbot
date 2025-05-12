import { UserInfo } from '../features/full/components/Full';
import Logo from '../components/Logo';
import { createSignal } from 'solid-js';
import "../assets/index.css";

interface InfoFormProps {
  onSubmit: (info: UserInfo) => void;
}

export const InfoForm: any = ({ onSubmit }: InfoFormProps) => {
  const [formData, setFormData] = createSignal<UserInfo>({ fullName: '', phoneNumber: '', email: '' });

  const [errors, setErrors] = createSignal<Partial<UserInfo>>({});

  const viewportMeta = document.querySelector('meta[name="viewport"]');

  // Apply new styles and meta content
  document.body.style.margin = '0';
  document.documentElement.style.padding = '0';

  if (viewportMeta) {
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const currentErrors = errors();
    if (currentErrors[name as keyof UserInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<UserInfo> = {};
    const data = formData(); // get current form data

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!data.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(data.phoneNumber.replace(/[^0-9]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData());
    }
  };

  return (
    <div class="flex flex-col min-h-screen scrollbar-hide">
      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>
      {/* Header with logo */}

      <div class="w-full bg-white py-2 px-4  border-b border-b-[#e9fdf0]">
        <div class='mx-auto max-w-[429px] flex items-center gap-1'>
        <Logo size={40} />
        <div>
          <h1 class="font-dubai font-bold text-[#033722] text-[12px]">Dubai Police - Lamya</h1>
          <p class="font-dubai font-bold text-[#033722] text-[10px]">Powered by GPT</p>
        </div>
        </div>
        
      </div>

      {/* Form content */}
      <div class="bg-[#e4efed] p-6 flex-1 flex flex-col relative pb-[130px] w-full">
        {/* Avatar */}
        <div class='mx-auto max-w-[333px] pt-2'>

        
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
            <img
              src="https://metadesignsolutions.com/wp-content/uploads/2025/05/lamya-chatbot.gif"
              alt="Virtual Assistant Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Information text */}
        <div class='mb-4 pb-3'>
        <p class="font-dubai text-center text-[#033722] text-[16px] leading-[21px] px-4">
          Providing your details ensures a seamless experience and allows us to assist you effectively. I am here to assist you 24/7. Please fill out
          the form below before starting the chat.
        </p>
        </div>
        

        {/* Form */}
        <form onSubmit={handleSubmit} class="space-y-4 flex-1">
          <div class='mb-4'>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData().fullName}
              onChange={handleChange}
              class={`w-full p-3 text-[14px]
                font-dubai rounded-[5px] border border-white bg-white ${errors().fullName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors().fullName && <p class="font-dubai text-[13px] leading-[16px] text-red-500 text-sm mt-1">{errors().fullName}</p>}
          </div>

          <div class='mb-4'>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData().phoneNumber}
              onChange={handleChange}
              class={`w-full p-3 text-[14px] font-dubai rounded-[5px] border border-white bg-white ${errors().phoneNumber ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors().phoneNumber && <p class="font-dubai text-[13px] leading-[16px] text-red-500 text-sm mt-1">{errors().phoneNumber}</p>}
          </div>

          <div class='mb-4'>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData().email}
              onChange={handleChange}
              class={`w-full p-3 text-[14px] font-dubai rounded-[5px] border border-white bg-white ${errors().email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors().email && <p class="font-dubai text-red-500 text-[13px] leading-[16px] text-sm mt-1">{errors().email}</p>}
          </div>

          <div class="pt-6 p-6 absolute bottom-6 left-0 flex justify-center items-center w-[100%]">
          <div class='mx-auto max-w-[333px] w-full'>
          <button
              type="submit"
              class="bg-button text-white font-dubai font-bold py-4 px-12  rounded-[10px] text-[16px] transition-colors duration-300 shadow-[0px 6px 8.4px 2px rgba(11, 209, 90, 0.2)] w-full"
          >
              Start Chat
            </button>
            </div>
            
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
