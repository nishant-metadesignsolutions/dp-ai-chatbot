import { BotProps } from '@/components/Bot';
import { BubbleParams } from '@/features/bubble/types';
export interface UserInfo {
    fullName: string;
    phoneNumber: string;
    email: string;
}
export type FullProps = BotProps & BubbleParams;
export declare const Full: (props: FullProps, { element }: {
    element: HTMLElement;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=Full.d.ts.map