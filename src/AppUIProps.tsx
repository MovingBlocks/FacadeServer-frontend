export interface AppUIProps {
  // data
  activeTabIndex: number;
  tabViews: JSX.Element[];
  tabNames: string[];
  serverAddr: string;
  isAuthenticated: boolean;
  // callbacks
  login: () => void;
  setActiveTab: (tabIndex: number) => void;
}
