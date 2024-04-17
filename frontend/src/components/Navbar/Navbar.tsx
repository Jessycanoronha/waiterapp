import { SetStateAction, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { SidebarData } from "../Sidebar/SidebarData";
import { IconContext } from "react-icons";
import WA from '../../assets/images/WA.svg';
import { FaHome } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";


function Navbar() {
  const [activeItem, setActiveItem] = useState("/");

  const setActive = (path: SetStateAction<string>) => {

    setActiveItem(path);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <nav className={"nav-menu active"}>
          <ul className="nav-menu-items" >
            <li className="navbar-toggle">
              <Link to="/" className="menu-bars">
                <img src={WA} alt="Ícone de fechar" />
              </Link>
            </li>
            {SidebarData.map((item: any, index: number) => {
              return (
                <li key={index} className={`${item.cName} ${item.path === activeItem ? "teste" : ""}`} onClick={() => setActive(item.path)}>
                  <Link to={item.path}>

                    {item.title === "Home" && (
                      <FaHome />
                    )}
                    {item.title === "Histórico" && (
                      <GiNotebook />
                    )}
                    {item.title === "Cardápio" && (
                      <LuMenuSquare />
                    )}
                    {item.title === "Produtos" && (
                      <TiShoppingCart />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
