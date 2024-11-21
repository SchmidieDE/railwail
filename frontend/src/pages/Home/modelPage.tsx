import { AccordionSummary, AccordionDetails, Accordion, Card } from '@mui/material';
import { IconButton, TextField } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import BrushIcon from '@mui/icons-material/Brush';
import { useState } from 'react';




function ModelPage() {          	




return (
  <div>
    <h1>Model Page</h1>



    <div className="flex flex-col m-10">   {/* äußere div */}
       
        
        <div className="flex flex-col gap-2 mb-10"> {/* input div */}
        <h1 className="flex flex-row gap-2 text-lg font-bold "> <TextFieldsIcon />Prompt <span className="text-red-500">*</span><span className="text-sm font-normal opacity-50">String</span></h1>
        <input className="border-2 border-black rounded-xl p-1 w-80 h-[48px] px-3 placeholder:opacity-50 placeholder:text-black" type="text" placeholder="A beautiful image of a cat" />
        </div>




        <div className="flex flex-col gap-2 mb-10"> {/* Size div */}
        <h1 className="flex flex-row gap-2 text-lg font-bold "><AspectRatioIcon/>Size <span className="text-sm font-normal opacity-50">String</span></h1>
        <Accordion className="w-80 border-2 border-black"
         sx={{ 
            borderRadius: '12px !important',
            '&:before': {
              display: 'none',
            }
          }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="opacity-50 text-black">1024x1024</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <div className="cursor-pointer hover:bg-gray-100 p-2">1024x1024</div>
          <div className="cursor-pointer hover:bg-gray-100 p-2">512x512</div>
          <div className="cursor-pointer hover:bg-gray-100 p-2">256x256</div>
        </div>
      </AccordionDetails>
    </Accordion>        
        </div>





        <div className="flex flex-col gap-2 mb-10"> {/* style div */}
        <h1 className="flex flex-row gap-2 text-lg font-bold "> <BrushIcon />Style<span className="text-sm font-normal opacity-50">String</span></h1>
        <Accordion className="w-80 border-2 border-black"
        sx={{ 
            borderRadius: '12px !important',
            '&:before': {
              display: 'none',
            }
          }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="opacity-50 text-black">Realistic</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <div className="cursor-pointer hover:bg-gray-100 p-2">Realistic</div>
          <div className="cursor-pointer hover:bg-gray-100 p-2">Anime</div>
          <div className="cursor-pointer hover:bg-gray-100 p-2">Painted</div>
        </div>
      </AccordionDetails>
    </Accordion>        
        </div>
        

        </div>


        


  </div>



)

}

export default ModelPage;