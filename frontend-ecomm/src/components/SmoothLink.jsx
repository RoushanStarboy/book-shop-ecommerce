// import React from "react";
// import { Link } from 'react-router-dom';

// function SmoothLink({to, children, ...rest}) {
//     const handleClick = (event) => {
//         event.preventDefault();
//         document.body.classList.add('transitioning');

//         setTimeout(()=> {
//             window.location.href = to;
//         },600);
//     };

//     return (
//         <Link to={to} onClick={handleClick} {...rest}>
//         {children}
//         </Link>
//     );
// }

// export default SmoothLink;

// Will use it 