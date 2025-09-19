import { NavLink, Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav w-100 justify-content-end">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => ` nav-link ${isActive ? "border border-white" : ""}`} to="/">Home</NavLink>
                            {/* <NavLink className="nav-link" to="/">Home</NavLink> */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => ` nav-link ${isActive ? "border border-white" : ""}`} to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}