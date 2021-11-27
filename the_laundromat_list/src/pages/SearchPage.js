import SearchForm from '../components/SearchForm';
import Navbar from "../components/Navbar";
// import '../css/search.css'

const SearchPage = ()=>{
    const category = window.location.pathname.split("/")[1];
    const zipCode = window.location.pathname.split("/")[2];
    return(
        <div>
            <Navbar />
            <SearchForm category={category} zipCode={zipCode}/>  
        </div>
    )
};

export default SearchPage;