import { useState } from 'react'; 
import { Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface CategoryModel {
    title: string;
    icons: React.ReactNode;
}

interface CategoriesListProps {
    title: string | React.ReactNode;
    icons: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
    className?: string;
}

export default function CategoriesList({ title, icons, onClick, isSelected, className }: CategoriesListProps) {
    return (
        <button
            onClick={onClick}
            className={`transition-all duration-200 rounded-full border-2
                ${isSelected 
                    ? 'bg-white text-purple-500 border-purple-500' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                } 
                ${className}`}
        >
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
                    borderRadius: '9999px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: isSelected ? 'rgb(157, 0, 255)' : 'inherit',
                    boxShadow: isSelected ? '0 2px 8px rgba(157, 0, 255, 0.2)' : 'none',
                    transition: 'all 0.3s ease',
                }} 
            >
                {title} {icons}
            </Box>
        </button>
    );
}
  