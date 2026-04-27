import NavBar from "../Nav/NavBar" 
import KidsProductsPage from "../Products/KidsProdcuts"
import MenProductsPage from "../Products/MenProducts"
import WomenProducts from "../Products/WomensProducts"
import Sliders from "../Sliders/Sliders"



const New = () => { 
  return (
    <div>
        <NavBar/>
        <Sliders/>
        <MenProductsPage/>
        <WomenProducts/>
        <KidsProductsPage/>
    </div>
  )
}

export default New