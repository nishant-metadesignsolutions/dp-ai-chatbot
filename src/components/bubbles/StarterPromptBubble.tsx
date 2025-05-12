type Props = {
  prompt: string;
  onPromptClick?: () => void;
  starterPromptFontSize?: number;
};
export const StarterPromptBubble = (props: Props) => (
  <>
    <div
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      class="flex justify-center items-center animate-fade-in host-container hover:brightness-90 active:brightness-75"
      onClick={() => props.onPromptClick?.()}
    >
      <span
        class="px-3 py-2 font-dubai font-bold ml-1 whitespace-pre-wrap max-w-full chatbot-host-bubble"
        data-testid="host-bubble"
        style={{
          width: 'max-content',
          'font-size': "13px",
          "line-height": "15px",
          // 'font-size': props.starterPromptFontSize ? `${props.starterPromptFontSize}px` : '15px', // Convert to string with unit
          'border-radius': '11px',
          cursor: 'pointer',
          "background": "#3eb7a1",
          color: "white",
          gap: "12px",
          "box-shadow": "0px 6px 8.4px 2px rgba(11, 209, 90, 0.2)"
        }}
      >
        {props.prompt}
      </span>
    </div>
  </>
);
