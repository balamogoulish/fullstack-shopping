import PropTypes from 'prop-types';

const SearchInput = ({searchTerm, onSearch}) => {
  return (
    <input 
      className='p-2 border border-gray-300 rounded-lg'
      type='text'
      placeholder='검색하세요'
      onChange={onSearch}
      value={searchTerm}
    />
  )
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};


export default SearchInput