


interface CategoryModel {
    title: string;
    icons: React.ReactNode;
}


const CategoriesList = ({ title, icons}: { title: string, icons: React.ReactNode}) => {
  const handleClick = (title: string) => {
    console.log(title);
  };
  
  
  
  
  
    return <div>
        CategoriesList 
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}} onClick={() => {
            handleClick(title)
        }}>{title} {icons}</div> 
        </div>
  }
  
  export default CategoriesList
  