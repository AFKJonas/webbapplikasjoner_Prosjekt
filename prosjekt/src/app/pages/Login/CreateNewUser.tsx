import { createNewUser } from "@/lib/action";
import { NewUserComponent } from "../../components/Login/NewUserComponent";
export default function CreateNewUser() {
    return (
        <main className="new-user-registration">
            <NewUserComponent onSubmit={createNewUser} />
        </main>
    );
}