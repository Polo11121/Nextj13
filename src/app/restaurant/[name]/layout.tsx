import { ReactNode } from "react";
import { Header } from "@/restaurantPage/components";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    name: string;
  };
}) => {
  const { name } = params;

  return (
    <main>
      <Header name={name} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default Layout;
