import { useState, useEffect } from "react"
import CardItem from "./Sections/CardItem"
import CheckBox from "./Sections/CheckBox"
import RadioBox from "./Sections/RadioBox"
import SearchInput from "./Sections/SearchInput"
import axiosInstance from "../../utils/axios"
import { continents, prices } from "../../utils/filterData"


const LandingPage = () => {
  const limit = 4; //가져올 카드 수
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); // 이미지를 불러올 시작점
  const [hasMore, setHasMore] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  });

  useEffect(() => { //컴포넌트가 어마운트 될 때 한 번만 수행하도록 함
    fetchProducts(skip, limit, loadMore);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchProducts = async(skip, limit, loadMore, filters={}, searchTerm='') =>{
    const params = {
      skip,
      limit,
      filters,
      searchTerm
    }
    try{
      const response = await axiosInstance.get('/products', {params})

      if(loadMore) { // 더 보기 클릭 시 현재 상품 state에 가져온 state 추가
        setProducts([...products, ...response.data.products]) 
      } else{
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
      setLoadMore(false);
      
    } catch(err){
      console.error(err);
    }
  }

  const handleLoadMore = () =>{
    fetchProducts(skip+limit, limit, true, filters, searchTerm);  
    setLoadMore(true);
    setSkip(skip+limit);
  }

  const handleFilters = (newFilteredData, category) =>{
    const newFilters = {...filters}; //filters 복사
    newFilters[category] = newFilteredData; 

    if(category == 'price'){
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  }

  const handlePrice = (value) =>{
    let array=[];
    for(let key in prices){
      if(prices[key]._id === parseInt(value, 10)){
        array = prices[key].array;
      }
    }
    return array;
  }

  const handleSearchTerm = (event) => {
    setSkip(0);
    setSearchTerm(event.target.value);
    fetchProducts(0, limit, loadMore, filters, event.target.value);
  }

  const showFilteredResults = (filters) => {
    fetchProducts(0, limit, loadMore, filters, searchTerm);
    setSkip(0)
  }
  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">여행 상품 사이트</h2>
      </div>

      {/**Filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox continents={continents} checkedContinents = {filters.continents}
            onFilters = {filters=>handleFilters(filters, "continents")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox prices={prices} checkedPrice={filters.price}
            onFilters={filters=>handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/**Search */}
      <div className="flex justify-end mx-auto mb-3">
        <SearchInput 
          setSearchTerm = {setSearchTerm}
          searchTerm = {searchTerm}
          onSearch = {handleSearchTerm}
        />
      </div>

      {/**Card 큰 창에서 4개, 작은 창에서 3개*/}
      <div className="grid gird-cols-2 sm:grid-cols-4 gap-4">
        {products.map(product=>
          <CardItem product={product} key={product._id}/>
        )}
        
      </div>

      {/**LoadMore hasMore이 true일 때만 rendering*/}
      {hasMore &&
        <div className="flex justify-center mt-5">
          <button className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            onClick={handleLoadMore}
          >
            더 보기
          </button>
        </div>
      }
      
    </section>
  )
}

export default LandingPage