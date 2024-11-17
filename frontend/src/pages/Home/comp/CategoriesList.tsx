interface CategoryModel {
    title: string;
    icons: React.ReactNode;
}

const CategoriesList = ({ title, icons}: { title: string, icons: React.ReactNode}) => {
  const handleClick = (title: string) => {
    console.log(title);
  };
  
  return <div>
    <div 
      style={{

        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '10px', 
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '3px solid black',
        backgroundColor: 'white',
        transition: 'all 0.3s ease',
        height: '40px',
        width: '200px'
      }} 
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgb(157, 0, 255)';
        e.currentTarget.style.color = 'rgb(157, 0, 255)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(157, 0, 255, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#e0e0e0';
        e.currentTarget.style.color = 'inherit';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => handleClick(title)}
    >
      {title} {icons}
    </div>
  </div>
}

export default CategoriesList
  