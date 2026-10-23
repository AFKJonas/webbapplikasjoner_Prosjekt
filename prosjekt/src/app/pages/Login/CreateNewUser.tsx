import { SendNewUser } from "@/lib/users";
import { NewUserComponent } from "../../components/Login/NewUserComponent";
export default function CreateNewUser() {
    return (
        <main className="new-user-registration">
            <NewUserComponent onSubmit={SendNewUser} />
        </main>
    );
}