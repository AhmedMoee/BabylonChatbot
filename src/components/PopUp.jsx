import Popup from 'reactjs-popup';
import '../App.css';

export const PopUp = (props) => {
    return (props.trigger) ? ( 
        <div className="flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black fixed top-10">
            <div className="popup-inner">
                { props.children }
            </div>
        </div>
    ) : "";
}
