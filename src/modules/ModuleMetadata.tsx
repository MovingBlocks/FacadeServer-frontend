export interface ModuleMetadata {
  id: string;
  version: string;
  displayName: LocalizedString;
  description: LocalizedString;
}

interface LocalizedString {
  en: string;
}
