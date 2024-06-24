import PropTypes from 'prop-types';

const RadioBox = ({prices, onFilters, checkedPrice}) => {
  
  const renderRadioBox = (
    prices?.map(price => (
      <div key={price._id}>
        <input 
          checked={checkedPrice === price.array}
          onChange={(e)=> onFilters(e.target.value)}
          type="radio"
          id={price._id}
          value={price._id}
        />
        {" "}
        <label htmlFor={price._id}>{price.name}</label>
      </div>
    ))
  )
  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {renderRadioBox}
    </div>
  )
}

RadioBox.propTypes = {
  prices: PropTypes.array.isRequired,
  checkedPrice: PropTypes.array.isRequired,
  onFilters: PropTypes.func.isRequired
};

export default RadioBox