import Logo from '../components/Logo';
import "../assets/index.css";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export const WelcomeScreen: any = ({ onStartChat }: WelcomeScreenProps) => {

  const viewportMeta = document.querySelector('meta[name="viewport"]');

  // Apply new styles and meta content
  document.body.style.margin = '0';
  document.documentElement.style.padding = '0';

  if (viewportMeta) {
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
  }

  return (
    <div class="flex flex-col items-center min-h-screen scrollbar-hide bg-welcome">
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

      {/* Welcome message */}
      <div class="p-6 flex-1 w-full relative pb-[130px] flex flex-col items-center">
      <div class='mx-auto max-w-[429px]'>
        <div class="text-center mb-12 py-4 px-6">
          <h2 class="text-[12px] leading-[21px] font-dubai font-bold text-[#033722] mb-4">
            Hello! I am Lamya, the Dubai Police Virtual Assistant. You can ask your questions and receive articles using Artificial Intelligence
            assistant.
          </h2>
        </div>

        {/* Avatar container */}
        <div class="flex justify-center mb-12">
          <div class="relative mt-4">
            {/* Glowing effect */}
            <div class="absolute inset-0 rounded-full bg-green-300 blur-md animate-pulse"></div>

            {/* Avatar image */}
            <div class="relative rounded-full overflow-hidden border-4 border-white w-48 h-48 mx-auto">
              <img
                src="https://metadesignsolutions.com/wp-content/uploads/2025/05/lamya-chatbot.gif"
                alt="Virtual Assistant Avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Start chat button */}
        <div class="absolute bottom-6 p-6 left-0 flex justify-center w-[100%]">
        <div class='mx-auto max-w-[429px] w-full'>
          <button
            onClick={onStartChat}
            class="bg-button text-white font-dubai font-bold py-4 px-12 rounded-[10px] text-[14px] transition-colors duration-300 shadow-[0px 6px 8.4px 2px rgba(11, 209, 90, 0.2)] w-full"
          >
            Start Chat
          </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
