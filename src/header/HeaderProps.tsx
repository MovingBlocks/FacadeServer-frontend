export interface HeaderProps {
  serverAddr: string;
  authenticated: boolean;
  showLogin: () => void;
  toggleMenu: () => void;
}
