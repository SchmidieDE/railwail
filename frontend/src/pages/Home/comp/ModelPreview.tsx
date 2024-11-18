import { Card, CardContent, Typography, Button } from '@mui/material';




const ModelPreview = ({ title, description, runs, imageUrl }: { 
  title: string;
  description: string;
  runs: number;
  imageUrl: string;
}) => {
  return (
    <Card sx={{ 
      width: 400,
      height: 250,
      display: 'flex',
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        
        width: '100%',
        padding: 0,
        gap: '16px',
        
      
      }}>
        {/* Linke Seite - Bild */}
        <div style={{
          width: '200px',
          height: '250px',
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
        </div>

        {/* Rechte Seite - Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              fontSize: '0.875rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {description}
            </Typography>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <Typography variant="body2" color="text.secondary" paddingLeft='16px'>
              {runs} runs
            </Typography>
            <Button 
             
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                bgcolor: '#9333EA',
                '&:hover': { bgcolor: '#7E22CE' },
                textTransform: 'none',
                borderRadius: 1
              }}
            >
              Open →
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelPreview;