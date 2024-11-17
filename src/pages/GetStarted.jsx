import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-4">
        <Button
          className="h-auto py-4 px-10"
          variant="outline"
          onClick={() => navigate("/signup")}
        >
          <div className="flex flex-col items-center">Sign Up</div>
        </Button>
        <Button
          className="h-auto py-4"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          <div className="flex flex-col items-center">Login</div>
        </Button>
      </div>
    </div>
  );
}
