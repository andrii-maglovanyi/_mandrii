import { Button } from "../Button/Button";
import { Tooltip } from "../Tooltip/Tooltip";

interface ExpandProps {
  collapsedMessage?: string;
  "data-testid"?: string;
  expanded?: boolean;
  expandedMessage?: string;
  onExpand: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Expand = ({
  collapsedMessage = "Show details",
  expanded,
  expandedMessage = "Hide details",
  onExpand,
}: ExpandProps) => {
  const handleExpand = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    onExpand(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  };

  return expanded ? (
    <Tooltip mouseEnterDelay={1} placement="left" text={expandedMessage}>
      <Button
        data-testid="collapse-icon"
        icon="fullscreen-off-line"
        onClick={handleExpand}
        size="condensed"
      />
    </Tooltip>
  ) : (
    <Tooltip mouseEnterDelay={1} placement="left" text={collapsedMessage}>
      <Button
        data-testid="expand-icon"
        icon="fullscreen-line"
        onClick={handleExpand}
        size="condensed"
      />
    </Tooltip>
  );
};
