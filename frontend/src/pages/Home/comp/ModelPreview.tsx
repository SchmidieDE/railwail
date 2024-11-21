import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModelPreview = ({ title, description, runs, imageUrl }: { 
  title: string;
  description: string;
  runs: number;
  imageUrl: string;
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ 
      width: {xs: 125, sm: 300, md: 400}, 
      height: {xs: 260, sm: 200, md: 250},
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        padding: 0,
        gap: '16px',
      }}>
        {/* Linke Seite - Bild */}
        <Box sx={{
          width:{
            xs: '125px',
            sm: '150px',
            md: '200px'
          },
          height: {
            xs: '130px',
            sm: '200px',
            md: '250px'
          },
          overflow: 'hidden',
          flexShrink: 0,
          borderRadius: 0
        }}>
          <img 
            src={imageUrl}
            alt={title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              pointerEvents: 'none',
             
             
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Box>

        {/* Rechte Seite - Content */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: {
              xs: 1,
              sm: 1.5,
              md: 2
          }
        }}>
          {/* Title und Description */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ 
              fontSize:{ 
                xs:'0.8rem',
                sm:'0.9rem',
                md:'1.1rem'
              }, 
              fontWeight: 'bold', 
              mb: 0.5
            }}>
              {title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '0.875rem'
                },
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {description}
            </Typography>
          </Box>
          
          {/* Footer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 'auto',  // Dies drückt den Footer nach unten
            pt: 1        // Etwas Abstand nach oben
          }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                fontSize: {
                  xs: '0.6rem',
                  sm: '0.75rem',
                  md: '0.875rem'
                }
              }}
            >
              {runs} runs
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => navigate(`/model/${title}`)}
              sx={{ 
                bgcolor: '#9333EA',
                '&:hover': { bgcolor: '#7E22CE' },
                textTransform: 'none',
                borderRadius: 1,
                fontSize: {
                  xs: '0.6rem',
                  sm: '0.6rem',
                  md: '0.875rem'
                },
                py: {
                  xs: 0.5,
                  sm: 0.5,
                  md: 1
                },
                px: {
                  xs: 1,
                  sm: 1,
                  md: 2
                },
                minWidth: {
                  xs: '60px',
                  sm: '60px',
                  md: '80px'
                }
              }}
            >
              Open →
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ModelPreview;