declare module "*.svg?react" {
  import * as React from "react";
  const Cmp: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Cmp;
}
