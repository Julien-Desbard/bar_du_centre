import { Button } from "../ui/button";
import {handleSignOut} from "@/lib/actions";

export default function SignOffButton() {
	return (
		<div>
			<form
				action={handleSignOut}
			>
				<Button type="submit">Se déconnecter</Button>
			</form>
		</div>
	);
}
