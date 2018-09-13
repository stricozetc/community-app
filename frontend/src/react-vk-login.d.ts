declare module 'react-vk-login' {
  import * as React from "react";

  interface ReactVkLoginProps {
    appId: string;
    callback(userInfo: ReactVkLoginInfo): void;
    autoLoad?: boolean;
    cssClass?: string;
    fields?: string;
    icon?: string | React.ReactNode;
    language?: string;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    reAuthenticate?: boolean;
    redirectUri?: string;
    scope?: string;
    size?: "small" | "medium" | "metro";
    textButton?: string;
    version?: string;
    xfbml?: boolean;
  }

  export interface ReactVkLoginInfo {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
  }

  interface ReactVkLoginState {
    isSdkLoaded?: boolean;
    isProcessing?: boolean;
  }

  declare class ReactVkLogin extends React.Component<
    ReactVkLoginProps,
    ReactVkLoginState
    > { }

  export default ReactVkLogin;
}
