import Featured from "../../Components/featured/Featued";
import FeaturedProperties from "../../Components/FeaturedProperties/featuredProperties";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import MailList from "../../Components/mailList/MailList";

import PropertyList from "../../Components/propertyList/PropertyList";
import "./Home.css";

const Home = () => {
  return (  
    <div>
    
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">You can't just sit there and wait for people to give you that golden dream</h1>
        <PropertyList/>
        <h1 className="homeTitle">Not all classrooms have four walls</h1>
        <FeaturedProperties/>
        <MailList/>
        
        <Footer/>
      </div>
    </div>
  );
};

export default Home;