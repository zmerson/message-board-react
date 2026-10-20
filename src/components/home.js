import React from 'react';
import { buttonTW } from '../styles/styles';
import { NavLink } from 'react-router-dom';
const Home = () => {
    return (React.createElement("div", { className: 'm-2 p-2' },
        React.createElement("div", { className: "ml-10 text-5xl font-bold text-secondray" }, "Message Board App"),
        React.createElement("div", { className: "mt-10 text-3xl font-bold" }, "Use the nav bar to navigate the site"),
        React.createElement("div", { className: "leading-4 mt-10 text-3xl font-bold" },
            React.createElement(NavLink, { to: 'board', className: `${buttonTW} block w-fit` }, "Boards"),
            React.createElement("p", null, "to view the list of Boards")),
        React.createElement("div", { className: "mt-10 text-3xl font-bold" }, "Click on a Board to view the Posts"),
        React.createElement("div", { className: 'leading-4 mt-10 text-3xl font-bold' },
            React.createElement(NavLink, { to: '/create-account', className: `${buttonTW} block w-fit` }, "Create an account "),
            React.createElement("p", { className: 'leading-8' }, "to make a new Post or Comment")),
        React.createElement("footer", null,
            React.createElement("div", { className: 'text-center text-2xl' },
                React.createElement("a", { href: 'https://react.dev' }, "React"),
                " - ",
                React.createElement("a", { href: 'https://expressjs.com' }, "Express"),
                " - ",
                React.createElement("a", { href: 'https://www.prisma.io' }, "Prisma")),
            React.createElement("div", { className: 'text-center text-2xl' }, "\uD83D\uDE80Serving files via Ubuntu Virtual Private Server\uD83D\uDE80"),
            React.createElement("div", { className: 'text-center text-2xl' },
                "\uD83D\uDDA5\uFE0FVPS provided by ",
                React.createElement("a", { href: "https://vultr.com" }, "Vultr")),
            React.createElement("div", { className: 'text-center text-2xl' },
                "\u2601\uFE0FCloud DB Hosted by ",
                React.createElement("a", { href: "https://supabase.com/" }, "Supabase")),
            React.createElement("div", { className: 'text-center text-2xl' }, "\uD83D\uDE87Domain Registed with Godaddy"),
            React.createElement("div", { className: 'text-center text-2xl' }, "\uD83D\uDD12DNS & Security via Cloudflare"),
            React.createElement("div", { className: 'text-center text-2xl' }, "This App is currently under development."),
            React.createElement("div", { className: 'text-center text-2xl' }, "Some features are incomplete. Many will change."))));
};
export default Home;
