
import CarteAdmin from "./carteAdmin";
import MenuAdmin from "./menuAdmin";

export default function PageAdmin () {
    return (
        <div className="flex flex-col">
        <MenuAdmin/>
        <CarteAdmin/>
        </div>
    )
}