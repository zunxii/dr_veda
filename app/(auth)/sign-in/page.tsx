'use client'
import AuthForm from "@/components/auth/AuthForm";

const page: React.FC = () => {
  
 const handleSignIn = (data: any) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
<AuthForm type="sign-in" onSubmit={handleSignIn} />
  );
};

export default page;