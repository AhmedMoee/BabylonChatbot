import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../App.css'


export const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    
    return (
        <div className="feedback">
            {[...Array(5)].map((star,index) => {
                const currentRating = index + 1;
                return(
                    <label key={index}>
                        <input 
                            type="radio" 
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar 
                            className='star'
                            size={30}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
            {rating === 1 && <h4>We will continue to improve Micro-Bot</h4>}
            {rating === 2 && <h4>We will continue to improve Micro-Bot</h4>}
            {rating === 3 && <h4>Thank you for your rating!</h4>}
            {rating === 4 && <h4>Thank you for your rating!</h4>}
            {rating === 5 && <h4>Thank you for your rating!</h4>}
            {rating && <h4><br/>Your Rating Is {rating}</h4>}
        </div>
    )
} 