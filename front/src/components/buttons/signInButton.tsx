import { handleSignIn } from "@/lib/actions";
import { Button } from "../ui/button";

export default function SignInButton() {
	return (
		<>
			<form
				action={handleSignIn}
				className="flex justify-center"
			>
				<Button type="submit">Connexion</Button>
			</form>
		</>
	);
}
