import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { handleSignOut } from "@/lib/actions";

export default function SignOffButton() {
	return (
		<div>
			<Button
				onClick={() => {
					signOut({ callbackUrl: "/", redirect: true });
					handleSignOut();
				}}
			>
				Se déconnecter
			</Button>
		</div>
	);
}
