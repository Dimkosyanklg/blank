import type { ComponentPropsWithoutRef } from "react";
import {
  StyledSegmentedTab,
  StyledSegmentedTabList,
} from "./SegmentedTabs.styles";

type SegmentedTabListProps = ComponentPropsWithoutRef<typeof StyledSegmentedTabList>;
type SegmentedTabProps = ComponentPropsWithoutRef<typeof StyledSegmentedTab>;

export const SegmentedTabList = (props: SegmentedTabListProps) => (
  <StyledSegmentedTabList {...props} />
);

export const SegmentedTab = (props: SegmentedTabProps) => (
  <StyledSegmentedTab {...props} />
);
