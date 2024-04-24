// import React, { useState, useEffect } from 'react';
// import Fuse from 'fuse.js';

// const FuzzySearch = ({ data }) => {
//     const [search, setSearch] = useState('');
//     const [results, setResults] = useState([]);

//     useEffect(() => {
//         if (search === '') {
//             setResults([]);
//             return;
//         }

//         const fuse = new Fuse(data, {
//             keys: ['name'], // Replace 'name' with the keys you want to search in your data
//             includeScore: true,
//         });

//         setResults(fuse.search(search));
//     }, [search, data]);

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search..."
//             />
//             {results.map((result, index) => (
//                 <div key={index}>{result.item.name}</div> // Replace 'name' with the key you want to display in your results
//             ))}
//         </div>
//     );
// };

// export default FuzzySearch;
