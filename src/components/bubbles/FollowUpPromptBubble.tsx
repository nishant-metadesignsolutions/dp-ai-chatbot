type Props = {
  prompt: string;
  onPromptClick?: () => void;
  starterPromptFontSize?: number;
};
export const FollowUpPromptBubble = (props: Props) => (
  <>
    <div
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      class="flex justify-center items-center animate-fade-in gap-1 host-container hover:brightness-90 active:brightness-75"
      onClick={() => props.onPromptClick?.()}
    >
      <span
        class="font-dubai font-bold px-3 py-2 whitespace-pre-wrap max-w-full chatbot-host-bubble border mb-5"
        data-testid="host-bubble"
        style={{
          width: 'max-content',
          'font-size': "13px",
          "line-height": "15px",
          // 'font-size': props.starterPromptFontSize ? `${props.starterPromptFontSize}px` : '15px', // Convert to string with unit
          'border-radius': '11px',
          cursor: 'pointer',
          "background": "linear-gradient(315.42deg, #008755 0%, #26d07c 99.29%)",
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
