import { Container } from "@mui/material";
import { FC } from "react";
import Navigation from "../Navigation/Navigation";

export type MainLayoutProps = {
  children: JSX.Element;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <section className="MainLayout">
      <Navigation />
      <main>
        <Container>{children}</Container>
      </main>
    </section>
  );
};

export default MainLayout;
