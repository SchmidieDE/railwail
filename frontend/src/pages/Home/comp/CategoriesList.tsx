import { useState } from 'react'; 
import { Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
    <Box
      sx={{
        
        fontWeight: 'bold',
        fontSize: {
          xs: '6px',
          sm: '14px',
          md: '16px'
        },
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: {
          xs: '4px',
          sm: '10px',
          md: '10px'
        },
        cursor: 'pointer',
        padding: {
          xs: '8px 12px',
          sm: '8px 16px',
          md: '8px 16px'
        },
        height: {
          xs: '28px',
          sm: '40px',
          md: '48px'
        },
        minWidth: {
          xs: '70px',
          sm: '100px',
          md: '120px'
        },
        borderRadius: '20px',
        border: '3px solid',
        borderColor: isSelected ? 'rgb(157, 0, 255)' : '#e0e0e0',
        backgroundColor: 'white',
        color: isSelected ? 'rgb(157, 0, 255)' : 'inherit',
        boxShadow: isSelected ? '0 2px 8px rgba(157, 0, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease',
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
    </Box>
  </div>
  
}

export default CategoriesList
  