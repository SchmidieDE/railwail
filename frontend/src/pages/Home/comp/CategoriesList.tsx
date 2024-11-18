import { useState } from 'react'; 

interface CategoryModel {
    title: string;
    icons: React.ReactNode;
}

const CategoriesList = ({ title, icons}: { title: string, icons: React.ReactNode}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (title: string) => {
    setIsSelected(!isSelected);
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
        border: '3px solid',
        borderColor: isSelected ? 'rgb(157, 0, 255)' : '#e0e0e0',
        backgroundColor: 'white',
        color: isSelected ? 'rgb(157, 0, 255)' : 'inherit',
        boxShadow: isSelected ? '0 2px 8px rgba(157, 0, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease',
        height: '40px',
        width: '200px'
      }} 
      onMouseOver={(e) => {
        if (!isSelected) {
          e.currentTarget.style.color = 'rgb(157, 0, 255)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(157, 0, 255, 0.2)';
        }
      }}
      onMouseOut={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#e0e0e0';
          e.currentTarget.style.color = 'inherit';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      onClick={() => handleClick(title)}
    >
      {title} {icons}
    </div>
  </div>
}

export default CategoriesList
  