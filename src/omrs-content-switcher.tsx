import React from "react";
import { ContentSwitcher } from "@carbon/react";
import "./omrs-content-switcher.scss";

type Props = {
  children: React.ReactNode;
  errored: boolean;
};

export default function OmrsContentSwitcher({
  children,
  errored = false,
  ...rest
}: Props) {
  return (
    <ContentSwitcher className={errored && "errored"} {...rest}>
      {children}
    </ContentSwitcher>
  );
}
