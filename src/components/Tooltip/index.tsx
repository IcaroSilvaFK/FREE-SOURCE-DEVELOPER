import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

type TooltipProps = {
  children: ReactNode;
  content: string;
};

export function Tooltip(props: TooltipProps) {
  const { children, content } = props;

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.container__tooltip}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.tooltip__arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
