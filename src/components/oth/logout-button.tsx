import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

function Logout() {
    const doLogin = async () => {
        await logout()
    }
    return (
        <form action={doLogin} method="POST">
        <Button type="submit">
            Log out
        </Button></form>
    );
}

export default Logout;