import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInButton from "./buttons/signInButton";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-center">
						Accès à l&apos;espace admin
					</CardTitle>
				</CardHeader>
				<CardContent>
					<SignInButton />
				</CardContent>
			</Card>
		</div>
	);
}
