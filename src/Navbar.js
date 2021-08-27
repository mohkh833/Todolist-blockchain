import React  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Navbar = ({accounts}) => {
    return(
    <nav className="navbar navbar-dark bg-primary shadow mb-5">
    <p className="navbar-brand my-auto"> ToDoList Dapp</p>
    <ul className="navbar-nav">
    <li className="nav-item text-white">{accounts}</li>
    </ul>
</nav>
)
}
export default Navbar