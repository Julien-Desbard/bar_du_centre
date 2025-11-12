
import CarteAdmin from "./carteAdmin";
import MenuAdmin from "./menuAdmin";

export default function PageAdmin () {
    return (
        <div className="flex flex-col">
        <CarteAdmin/>
        <MenuAdmin/>
        </div>
    )
}