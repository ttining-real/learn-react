export interface NavItem {
  id: string;
  path?: string;
  index?: boolean;
  text?: string | JSX.Element;
  lazy?: () => Promise<unknown>;
}
