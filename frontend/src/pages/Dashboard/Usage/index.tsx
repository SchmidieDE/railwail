import { H1 } from '@/components/custom/textFields';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // SOMEHOW WE NEED TO ADD THIS TO REMOVE THE FUC KING ERRO
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/custom/loadingSpinner';
import api from '@/lib/api';
import { useToast } from '../../../hooks/use-toast';

const COLORS = ['#5AC0FE', '#BD34FE'];

const Usage = () => {
  
  const {toast} = useToast()

  const [data, setData] = useState([{ name: 'Total used Tokens', value: null },
                                    { name: 'Available Tokens', value: null }])

  const dataConverted = {
    labels: data.map(item => item.name),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: COLORS,
    }]
  };

  useEffect(() => {
    
    (async () => {
      const req = await api.get('/user/')
      if (!req.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user data."
        })
      }
      const data = await req.json()
      const {tokens, tokensused} = data
      setData([{ name: 'Total used Tokens', value: tokensused },
              { name: 'Available Tokens', value: tokens }])
    })()
  }, [])

  return (
    <div className="flex flex-col gap-4 px-5 select-none w-full">
      <H1>Usage</H1>
      <div className="relative w-full h-64">
        {
          // AFTER DATA IS LOADED
          (data[0].value !== null && data[1].value !== null) ? (
            <Doughnut data={dataConverted} />
          ) : (
            <LoadingSpinner />
          )
        }
      </div>
    </div>
  );
};

export default Usage;