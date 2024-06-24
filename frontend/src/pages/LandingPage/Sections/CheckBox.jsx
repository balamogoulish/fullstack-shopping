import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const CheckBox = ({continents, checkedContinents, onFilters}) => {
  
  const renderCheckboxLists = (continents && continents.map((continent)=>(
    <div key={continent._id}>
      <input
        type='checkbox'
        onChange={()=> handleToggle(continent._id)}
        checked={checkedContinents.indexOf(continent._id) === -1 ? false : true}
      />{" "}
      <label>{continent.name}</label>
    </div>
  )))

  //현재 선택한 인덱스가 선택된 항목인지 체크
  const handleToggle = (continentId) =>{
    //선택된 항목의 인덱스
    const currentIndex = checkedContinents.indexOf(continentId);
    
    const newChecked = [...checkedContinents];

    // 원래 선택되어 있던 항목이 아닌 경우
    // checkedContinents에 없으므로 인덱스는 -1
    // 새로 선택된 항목 => 선택된 항목에 추가함
    if(currentIndex === -1){ 
      newChecked.push(continentId);
    } else{
      //원래 선택되어 있던 항목 => 선택된 항목에서 삭제함
      newChecked.splice(currentIndex, 1); //현재 인덱스를 삭제
    }
    onFilters(newChecked)
  }
  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {renderCheckboxLists}
    </div>
  )
}

CheckBox.propTypes = {
  continents: PropTypes.array.isRequired,
  checkedContinents: PropTypes.array.isRequired,
  onFilters: PropTypes.func.isRequired
};

export default CheckBox