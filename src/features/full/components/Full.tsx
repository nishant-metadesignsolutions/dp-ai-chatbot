import styles from '../../../assets/index.css';
import { Bot, BotProps } from '@/components/Bot';
import { BubbleParams } from '@/features/bubble/types';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { WelcomeScreen } from '../../WelcomeScreen';
import { InfoForm } from '../../InfoForm';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

// Define the possible states of our chatbot interface
type ChatbotState = 'welcome' | 'form' | 'chat';

// User information type
export interface UserInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export type FullProps = BotProps & BubbleParams;

const fetchUserDetails = () => {
  const userData = localStorage.getItem('db-police-user')
    ? JSON.parse(localStorage.getItem('db-police-user') as string)
    : {
        fullName: '',
        phoneNumber: '',
        email: '',
      };
  return userData;
};

export const Full = (props: FullProps, { element }: { element: HTMLElement }) => {
  const [chatbotState, setChatbotState] = createSignal<ChatbotState>('welcome');
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false);
  const userData = fetchUserDetails();
  // State to store user information
  const [userInfo, setUserInfo] = createSignal<UserInfo>(userData);

  // Handle moving from welcome to form
  const handleStartChat = () => {
    const userData = fetchUserDetails();
    if (userData && userData?.fullName) {
      setChatbotState('chat');
      launchBot();
    } else {
      setChatbotState('form');
    }
  };

  // Handle form submission
  const handleFormSubmit = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem('db-police-user', JSON.stringify(info));
    setChatbotState('chat');
    launchBot();
  };

  const handleClose = () => {
    setChatbotState('welcome');
  };

  const launchBot = () => {
    // const userData = fetchUserDetails();
    // if (userData && userData?.fullName) {
      // setChatbotState('welcome');
    // }

    if (chatbotState() == 'chat') {
      setIsBotDisplayed(true);
      document.body.style.margin = '0'; // Ensure no margin
      document.documentElement.style.padding = '0'; // Ensure no padding

      // Set viewport meta tag dynamically
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
      }
    }
  };

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot();
  });

  onMount(() => {
    botLauncherObserver.observe(element);
  });

  onCleanup(() => {
    handleClose();
    botLauncherObserver.disconnect();
    document.body.style.margin = ''; // Reset margin
    document.documentElement.style.padding = ''; // Reset padding

    // Reset viewport meta tag if needed
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  });

  return (
    <>
      <Show when={props.theme?.customCSS}>
        <style>{props.theme?.customCSS}</style>
      </Show>
      <style>{styles}</style>
      {chatbotState() === 'welcome' && <WelcomeScreen onStartChat={handleStartChat} />}

      {chatbotState() === 'form' && <InfoForm onSubmit={handleFormSubmit} />}

      {chatbotState() === 'chat' && (
        <Show when={isBotDisplayed()}>
          <div
            style={{
              // 'background-color': props.theme?.chatWindow?.backgroundColor || '#ffffff',
              'background': 'url("https://dubaimedium.s3.us-east-1.amazonaws.com/whatsapp.png") repeat center center fixed',
              "background-size": "cover",
              height: props.theme?.chatWindow?.height ? `${props.theme?.chatWindow?.height.toString()}px` : '100dvh',
              width: props.theme?.chatWindow?.width ? `${props.theme?.chatWindow?.width.toString()}px` : '100%',
              margin: '0px',
              overflow: 'hidden', // Ensure no extra scrolling due to content overflow
            }}
            class="font-dubai text-[14px] leading-[24px] text-[#505050]"
          >
            <Bot
              badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
              bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
              bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
              showTitle={props.theme?.chatWindow?.showTitle}
              showAgentMessages={props.theme?.chatWindow?.showAgentMessages}
              title="DP AI Bot"
              // title={props.theme?.chatWindow?.title}
              titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
              // titleTextColor={props.theme?.chatWindow?.titleTextColor}
              titleTextColor="#FFFFFF"
              // titleBackgroundColor={props.theme?.chatWindow?.titleBackgroundColor}
              titleBackgroundColor="#00401D"
              welcomeMessage="Hi There! I am the Cyber PreCrime Bot. How can I help you today? (Beta Test Mode for DP team)"
              errorMessage={props.theme?.chatWindow?.errorMessage}
              poweredByTextColor="#FFFFFF"
              textInput={props.theme?.chatWindow?.textInput}
              botMessage={props.theme?.chatWindow?.botMessage}
              userMessage={props.theme?.chatWindow?.userMessage}
              feedback={props.theme?.chatWindow?.feedback}
              fontSize={props.theme?.chatWindow?.fontSize}
              footer={props.theme?.chatWindow?.footer}
              starterPrompts={props.theme?.chatWindow?.starterPrompts}
              chatflowid={props.chatflowid}
              chatflowConfig={props.chatflowConfig}
              apiHost={props.apiHost}
              onRequest={props.onRequest}
              isFullPage={true}
              observersConfig={props.observersConfig}
              starterPromptFontSize={props.theme?.chatWindow?.starterPromptFontSize}
              clearChatOnReload={props.theme?.chatWindow?.clearChatOnReload}
              disclaimer={props.theme?.disclaimer}
              dateTimeToggle={props.theme?.chatWindow?.dateTimeToggle}
              renderHTML={props.theme?.chatWindow?.renderHTML}
            />
          </div>
        </Show>
      )}
    </>
  );
};
