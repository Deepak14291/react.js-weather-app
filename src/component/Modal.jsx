import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
    const dispatch = useDispatch();
    return (<div className="justify-center  ">
        <div className="p-10 bg-gray-900/20 justify-center text-center w-60 mx-auto my-auto backdrop-blur-sm">
            <p className="text-white "> Please enter a valid city name</p>
            <button onClick={() => dispatch(closeModal())} className="mt-6 p-2 bg-gray-300 px-8 hover:bg-gray-900/70 hover:text-zinc-300">Close</button>
        </div>
    </div>)
}
export default Modal;