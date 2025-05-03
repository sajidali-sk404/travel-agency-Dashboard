
// @ts-nocheck
import {  SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router"
import NavItems from "./NavItems";
const MobileSidebar = () => {
  let sidebar : SidebarComponent ;
  const ToggelSidebar = () => {
    sidebar.toggle()
  }
  return (
    <div className="mobile-sidebar wrapper ">
      <header>
        <Link to='/' >
        <img src="assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Tourvisto</h1>
        </Link>
        {/* @ts-ignore */}
        <button onClick={ToggelSidebar}>
          <img src="assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent 
        width={270} 
        //  {/* @ts-ignore */}
      ref={ (Sidebar) => sidebar = Sidebar  }
      created={() => {sidebar.hide()}}
      closeOnDocumentClick={true}
      showBackdrop={true}
      type="over">
        <NavItems handleClick={ToggelSidebar} />
      </SidebarComponent>
    </div>
  )
}

export default MobileSidebar
