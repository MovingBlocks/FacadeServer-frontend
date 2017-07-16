export interface Module {
  id: string;
  version: string;
  displayName: LocalizedString;
  description: LocalizedString;
}

interface LocalizedString {
  en: string;
}
