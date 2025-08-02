import type { Metadata } from "next";
import LoginPage from "./login/page";

export const metadata: Metadata = {
   title: "Alpas Studio",
   description: "Alpas Studio adalah sebuah studio yang menyediakan berbagai layanan digital.",
};

const DashboardPage = () => {   
   return (
      <LoginPage/>
   );
}

export default DashboardPage;