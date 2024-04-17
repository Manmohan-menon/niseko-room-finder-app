function FilterInput({ onSearch }) {
    return (
       <input
         type="text"
         placeholder="Search rooms..."
         onChange={(e) => onSearch(e.target.value)}
         className="filter-class"
       />
    );
   }

export default FilterInput;