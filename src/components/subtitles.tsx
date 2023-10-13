import React, { useState } from 'react';
import { Box, Paragraph } from '@/components/ui';

const Subtitles = () => {
  const [subtitle] = useState('ではここに連絡先と名前を書いてください。');

  return (
    <Box asChild className={' absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
      <Paragraph
        className={'text-center text-[#fff] bg-[#000]/60 p-4 text-4xl rounded-md antialiased font-normal cursor-default'}>{subtitle}</Paragraph>
    </Box>
  );
};

export default Subtitles;