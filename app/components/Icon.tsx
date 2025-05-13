import { forwardRef } from "react";
import { SvgIcon, type SvgIconProps } from "@mui/material";

export type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface Props extends Omit<SvgIconProps, "component" | "children"> {
  component: SvgComponent;
  size?: number | string;
  active?: boolean;
  activeColor?: string;
}

const Icon = forwardRef<SVGSVGElement, Props>(
  (
    { component, size = "1em", active, activeColor, color, sx, ...rest },
    ref
  ) => (
    <SvgIcon
      ref={ref}
      component={component as any}
      inheritViewBox
      sx={{
        fontSize: size,
        color: active ? activeColor ?? "primary.main" : color ?? "inherit",
        ...sx,
      }}
      {...rest}
    />
  )
);
export default Icon;
