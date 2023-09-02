import { FC } from 'react';
import { gwagon } from '../../assets';
import { FavoriteBorder } from '@mui/icons-material';

export const Item: FC = () => {
  return (
    <div className='flex flex-col shadow-sm border-slate-200 rounded-sm border max-h-[260px] max-w-[220px] relative'>
        <div className='rounded-full absolute right-2 top-2 bg-white p-2'>

        <FavoriteBorder fontSize='small'/>
        </div>
        <div className='m-2'>
            
      <img src={gwagon} alt="" />
        </div>
      <div className='h-1/3 border-l-4 border-orange-300 p-3'>
        <h4 className='font-semibold'>$ 47,84,000</h4>
        <p>Description</p>
      </div>
    </div>
  );
};