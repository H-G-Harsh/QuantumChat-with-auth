import { Outlet } from "react-router-dom";
// import { SignedIn, UserButton } from "@clerk/clerk-react"; // Remove Clerk

export default function RootLayout() {
  return (
    <>
      {/* Remove Clerk UserButton and SignedIn */}
      <Outlet />
    </>
  );
}
