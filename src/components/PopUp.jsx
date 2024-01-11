import '../App.css'

export const PopUp = (props) => {
	return props.trigger ? (
        <div className="fixed inset-0 bg-transparent">
            <div 
                className="absolute inset-0" 
                onClick={props.onClose}
            />
            <div 
                className="fixed top-20 sm:left-4% md:left-6% lg:left-8% p-5 md:p-10 lg:p-16 bg-white rounded-3xl shadow-lg"
                style={{ width: '80%', maxWidth: '30rem' , left: '8%'}}
            >
                {props.children}
            </div>
        </div>
    ) : null;
}
