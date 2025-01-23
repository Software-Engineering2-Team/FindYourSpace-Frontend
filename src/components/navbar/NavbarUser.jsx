import React, {useState, useEffect} from "react";
import NavbarBase from "./NavbarBase";
import LoginStore from "../../api/LoginStore";

const NavbarUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => LoginStore.getState().userData !== null
    );

    useEffect(() => {
        const unsubscribe = LoginStore.subscribe((state) =>
            setIsLoggedIn(state.userData !== null)
        );
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await LoginStore.getState().logout();
        setIsLoggedIn(false);
    };

    const loggedInLinks = [
        {label: "Find spaces", href: "/spaces"},
        {label: "Booking History", href: "/booking-history"},
        {label: "Rent out my space", href: "/add"},
        {label: "My Spaces", href: "/myspaces"},
        {label: "Profile", href: "/profile"},
        {label: "Contact Us", href: "/contact-us"},
    ];

    const loggedOutLinks = [
        {label: "Find spaces", href: "/spaces"},
        {label: "Contact Us", href: "/contact-us"},
        {label: "Login", href: "/"},
    ];

    return (
        <NavbarBase
            title="Find your space"
            links={isLoggedIn ? loggedInLinks : loggedOutLinks}
            onLogout={isLoggedIn ? handleLogout : null}
        />
    );
};

export default NavbarUser;
