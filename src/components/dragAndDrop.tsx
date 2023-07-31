'use client';

import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';

export const DragAndDrop = () => {

  return (
      <>
        <Label htmlFor={'video'}>
          <div className={'pb-2'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                 className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
            </svg>
          </div>
          <p className="h-mb-2 text-xl dark:text-primary-content"><span
              className="font-semibold">Click to upload</span> or drag and drop
          </p>
        </Label>
        <Input onDrop={(e) => console.log(e)} id={'video'}/>
      </>
  );
};

