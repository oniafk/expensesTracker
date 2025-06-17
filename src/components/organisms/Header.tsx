import { ContentHeader } from "../atoms/ContentHeader";
import { DataUser } from "./DataUser";

// TypeScript interface
interface StateConfig {
  state: boolean;
  setState: () => void;
}

interface HeaderProps {
  stateConfig: StateConfig;
}

export function Header({ stateConfig }: HeaderProps) {
  return (
    <ContentHeader>
      <DataUser stateConfig={stateConfig} />
    </ContentHeader>
  );
}
