import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { NavigationContainer, LogoContainer, NavLinks, NavLink, SignOutButton, } from './navBar.styles';
const NavBar = () => {
    const { authenticated, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        localStorage.setItem('authenticated', 'false');
        signOut();
    };
    return (React.createElement(NavigationContainer, { className: 'pl-3 fixed' },
        React.createElement(LogoContainer, { to: '/' }, "Home"),
        React.createElement(NavLinks, null,
            React.createElement(NavLink, { className: "invisible sm:visible", to: '/create-account' }, "Create Account"),
            React.createElement("a", { href: "linux.zemersonapp.online" }, "Linux"),
            React.createElement(NavLink, { to: '/board' }, "Boards"),
            authenticated ? (React.createElement(React.Fragment, null,
                React.createElement(NavLink, { to: '/profile' }, "Profile"),
                React.createElement(SignOutButton, { onClick: handleSignOut }, "Sign Out"))) : (React.createElement(NavLink, { to: '/auth' }, "Sign In")))));
};
export default NavBar;
// import { Fragment, useContext } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import SignInComponent from '../sign-in/signIn'
// import { useAuth, AuthContextProps } from '../../auth/authContext';
// // import CartIcon from '../../components/cart-icon/cart-icon.component';
// // import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
// //import { UserContext } from '../contexts/authstate';
// import React from 'react';
// // import { CartContext } from '../../contexts/cart.context';
// // import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// // import { signOutUser } from '../../utils/firebase/firebase.utils';
// import {
//   NavigationContainer,
//   LogoContainer,
//   NavLinks,
//   NavLink,
// } from './navBar.styles';
// const Navigation = () => {
//   //const { currentUser } = useContext(UserContext);
//   //const { isCartOpen } = useContext(CartContext);
//   const { authenticated, signIn, signOut, user } = useAuth() as AuthContextProps
//   const handleSignOut = () => {
//     // Perform the sign-out logic here
//     // For example, clear the JWT from the cookie and set the authenticated state to false
//     // You can implement this based on your authentication setup
//     // For demonstration purposes, I'm simply setting authenticated to false
//     signOut(); // Assuming you have a signOut function in your authContext
//   };
//   return (
//     <Fragment>
//       <NavigationContainer>
//         <Link to='/'>
//           home
//         </Link>
//         <NavLinks>
//           <NavLink to='/create'>Create</NavLink>
//           <NavLink to='/list'>VIEW</NavLink>
//           { user ? <NavLink to='/profile'>{user?.name}</NavLink> : "poo poo"}
//          {}
//          {authenticated ? (
//             <NavLink to={'/'}>
//               <button onClick={handleSignOut}>Sign out</button>
//             </NavLink>
//           ) : (
//             <NavLink to="/auth">SIGN IN</NavLink> // Redirect to the sign-in page if not authenticated
//           )}
//         </NavLinks>
//       </NavigationContainer>
//       <Outlet />
//     </Fragment>
//   );
// };
// export default Navigation;
