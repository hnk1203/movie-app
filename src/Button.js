import  PropTypes  from "prop-types";

function Button({text}) {
    return <button style={{
        backgroundColor:"toamto",
        color:"white", 
    }}>{text}</button>;
}

Button.propTypes = {
    text : PropTypes.string.isRequired,
};

export default Button;