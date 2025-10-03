import React from 'react';
import starIcon from '@/assets/star-icon.svg';
import savedIcon from '@/assets/saved-icon.svg';
import contactedIcon from '@/assets/contacted-icon.svg';
import interviewedIcon from '@/assets/interviewed-icon.svg';

interface JobStatsProps {
  found: number;
  saved: number;
  contacted: number;
  interviewed: number;
}

export const JobStats: React.FC<JobStatsProps> = ({
  found,
  saved,
  contacted,
  interviewed
}) => {
  return (
    <div className="flex w-full flex-col mt-[30px] pl-2 pr-[21px] max-md:pr-5">
      <div className="flex gap-[40px_45px]">
        <img
          src={starIcon}
          alt="Found icon"
          className="aspect-[1.12] object-contain w-[19px] shrink-0"
        />
        <img
          src={savedIcon}
          alt="Saved icon"
          className="aspect-[0.94] object-contain w-4 shrink-0"
        />
      </div>
      <div className="flex items-stretch gap-[40px_43px] text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center mt-[7px]">
        <div>{found}</div>
        <div>{saved}</div>
      </div>
      <div className="flex items-stretch gap-[30px] text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap mt-[9px]">
        <div>Found</div>
        <div>Saved</div>
      </div>
    </div>
  );
};

interface JobStatsExtendedProps extends JobStatsProps {
  layout?: 'compact' | 'extended';
}

export const JobStatsExtended: React.FC<JobStatsExtendedProps> = ({
  found,
  saved,
  contacted,
  interviewed,
  layout = 'extended'
}) => {
  if (layout === 'compact') {
    return <JobStats found={found} saved={saved} contacted={contacted} interviewed={interviewed} />;
  }

  return (
    <div className="flex items-stretch gap-5 justify-between max-md:mr-[9px]">
      <div className="flex items-stretch gap-3.5">
        <div className="flex flex-col items-stretch">
          <JobStats found={found} saved={saved} contacted={contacted} interviewed={interviewed} />
        </div>
        <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap mt-[53px] max-md:mt-10">
          <img
            src={contactedIcon}
            alt="Contacted icon"
            className="aspect-[1] object-contain w-[15px]"
          />
          <div className="text-base text-center mt-2">
            {contacted}
          </div>
          <div className="text-xs self-stretch mt-[9px]">
            Contacted
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap mt-[53px] max-md:mt-10">
        <img
          src={interviewedIcon}
          alt="Interviewed icon"
          className="aspect-[1.07] object-contain w-4"
        />
        <div className="text-base text-center mt-2">
          {interviewed}
        </div>
        <div className="text-xs self-stretch mt-[9px]">
          Interviewed
        </div>
      </div>
    </div>
  );
};
