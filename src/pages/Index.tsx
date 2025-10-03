import React, { useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { UserAvatar } from '@/components/UserAvatar';
import { FilterButtons } from '@/components/FilterButtons';
import { JobCard } from '@/components/JobCard';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPositions, setShowMyPositions] = useState(false);

  const jobData = {
    title: "Chief Operations Officer",
    userName: "Mateusz Budka",
    userAvatar: "https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/2e82bae492ad895bcdcd23b28b0179b2f1c092fe?placeholderIfAbsent=true",
    stats: {
      found: 55,
      saved: 55,
      contacted: 55,
      interviewed: 55
    },
    actionsNeeded: 4
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleToggleMyPositions = (enabled: boolean) => {
    setShowMyPositions(enabled);
    console.log('Show my positions:', enabled);
  };

  const handleShowArchived = () => {
    console.log('Show archived jobs');
  };

  const handleJobMenuClick = () => {
    console.log('Job menu clicked');
  };

  const handleJobActionClick = () => {
    console.log('Job action clicked');
  };

  return (
    <main className="flex flex-col relative min-h-[1780px] w-full items-stretch pt-5 pb-[139px] px-[27px] rounded-[11px] max-md:max-w-full max-md:pb-[100px] max-md:px-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/f3f0c4b87a4b2eb2916329b323625bed615637f8?placeholderIfAbsent=true"
        alt="Background"
        className="absolute h-full w-full object-cover inset-0"
      />
      
      <header className="relative flex items-stretch gap-5 font-normal flex-wrap justify-between max-md:max-w-full">
        <div className="flex flex-col max-md:max-w-full">
          <UserAvatar />
          <div className="mt-[102px] max-md:mt-10">
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
        
        <aside className="text-xl text-white whitespace-nowrap">
          <UserAvatar initials="TW" />
          <UserAvatar 
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/0e4e5e817c1ce893e4f9856622b3fa33d901b14b?placeholderIfAbsent=true"
            className="mt-3.5"
          />
          <UserAvatar 
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/ac21d5d326e64ec187c4bdfb8af6915b4c5b15a3?placeholderIfAbsent=true"
            className="mt-3.5"
          />
          <UserAvatar 
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/7a41856218781592a99958f369beb3d7580057ba?placeholderIfAbsent=true"
            className="mt-[15px]"
          />
        </aside>
      </header>

      <section className="relative bg-white shadow-[4px_4px_20px_rgba(0,0,0,0.25)] self-center flex w-full max-w-[1047px] flex-col items-stretch mt-[43px] -mb-7 pt-[25px] pb-[45px] rounded-[20px] max-md:max-w-full max-md:mt-10 max-md:mb-2.5">
        <div className="flex w-full flex-col items-stretch px-[30px] max-md:max-w-full max-md:px-5">
          <div className="flex w-full flex-col items-stretch max-md:max-w-full">
            <h1 className="text-[rgba(21,52,61,1)] text-[45px] font-normal tracking-[-1.8px] max-md:text-[40px]">
              Jobs
            </h1>
            
            <nav className="mt-[27px]">
              <FilterButtons 
                onSearch={handleSearch}
                onToggleMyPositions={handleToggleMyPositions}
                onShowArchived={handleShowArchived}
              />
            </nav>

            <div className="flex w-full items-stretch gap-5 text-[10px] text-[rgba(40,42,48,1)] font-normal whitespace-nowrap justify-between mt-[47px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10">
              <img
                src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/1db17103497e17df9468448b30d03d6872cabf71?placeholderIfAbsent=true"
                alt="Job status"
                className="aspect-[1] object-contain w-9 shrink-0 rounded-lg"
              />
              <div className="flex items-stretch gap-1.5">
                <div className="bg-[rgba(21,52,61,1)] flex w-2.5 shrink-0 h-2.5 rounded-[50%]" />
                <div>Published</div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/1db17103497e17df9468448b30d03d6872cabf71?placeholderIfAbsent=true"
                alt="Job status"
                className="aspect-[1] object-contain w-9 shrink-0 rounded-lg"
              />
              <div className="flex items-stretch gap-1.5">
                <div className="bg-[rgba(21,52,61,1)] flex w-2.5 shrink-0 h-2.5 rounded-[50%]" />
                <div>Published</div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/1db17103497e17df9468448b30d03d6872cabf71?placeholderIfAbsent=true"
                alt="Job status"
                className="aspect-[1] object-contain w-9 shrink-0 rounded-lg"
              />
              <div className="flex items-stretch gap-1.5">
                <div className="bg-[rgba(21,52,61,1)] flex w-2.5 shrink-0 h-2.5 rounded-[50%]" />
                <div>Published</div>
              </div>
            </div>

            <div className="mt-[30px] max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[69%] max-md:w-full max-md:ml-0">
                  <div className="w-full max-md:max-w-full max-md:mt-10">
                    <div className="flex w-[601px] max-w-full items-stretch gap-[40px_99px] text-[22px] text-[rgba(21,52,61,1)] font-medium leading-none flex-wrap">
                      <h2 className="grow shrink w-[200px]">
                        Chief Operations Officer
                      </h2>
                      <h2 className="grow shrink w-[200px]">
                        Chief Operations Officer
                      </h2>
                    </div>
                    
                    <div className="mt-6 max-md:max-w-full">
                      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        <div className="w-6/12 max-md:w-full max-md:ml-0">
                          <div className="w-full max-md:mt-10">
                            <JobCard 
                              {...jobData}
                              onMenuClick={handleJobMenuClick}
                              onActionClick={handleJobActionClick}
                            />
                          </div>
                        </div>
                        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                          <div className="w-full max-md:mt-10">
                            <JobCard 
                              {...jobData}
                              onMenuClick={handleJobMenuClick}
                              onActionClick={handleJobActionClick}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-[31%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex w-full flex-col items-stretch max-md:mt-10">
                    <h2 className="text-[rgba(21,52,61,1)] text-[22px] font-medium leading-none">
                      Chief Operations Officer
                    </h2>
                    <div className="mt-6">
                      <JobCard 
                        {...jobData}
                        onMenuClick={handleJobMenuClick}
                        onActionClick={handleJobActionClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[77px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[33%] max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-10">
                    <JobCard 
                      {...jobData}
                      layout="compact"
                      onMenuClick={handleJobMenuClick}
                      onActionClick={handleJobActionClick}
                    />
                  </div>
                </div>
                <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-10">
                    <JobCard 
                      {...jobData}
                      layout="compact"
                      onMenuClick={handleJobMenuClick}
                      onActionClick={handleJobActionClick}
                    />
                  </div>
                </div>
                <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-10">
                    <JobCard 
                      {...jobData}
                      layout="compact"
                      onMenuClick={handleJobMenuClick}
                      onActionClick={handleJobActionClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full items-stretch gap-[40px_83px] flex-wrap mt-[30px] max-md:max-w-full max-md:mr-[9px]">
              <div className="flex gap-[30px] flex-1">
                <div className="self-stretch">
                  <div className="flex gap-5 justify-between max-md:ml-2 max-md:mr-1">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                      alt="Found icon"
                      className="aspect-[1.12] object-contain w-[19px] shrink-0"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                      alt="Saved icon"
                      className="aspect-[0.94] object-contain w-4 shrink-0"
                    />
                  </div>
                  <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px] max-md:ml-2 max-md:mr-[3px]">
                    <div>55</div>
                    <div>55</div>
                  </div>
                  <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                    <div>Found</div>
                    <div>Saved</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                    alt="Contacted icon"
                    className="aspect-[1] object-contain w-[15px]"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Contacted</div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                    alt="Interviewed icon"
                    className="aspect-[1.07] object-contain w-4"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
                </div>
              </div>
              
              <div className="flex gap-[30px] flex-1">
                <div className="self-stretch">
                  <div className="flex gap-5 justify-between max-md:ml-2 max-md:mr-1">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                      alt="Found icon"
                      className="aspect-[1.12] object-contain w-[19px] shrink-0"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                      alt="Saved icon"
                      className="aspect-[0.94] object-contain w-4 shrink-0"
                    />
                  </div>
                  <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px] max-md:ml-2 max-md:mr-[3px]">
                    <div>55</div>
                    <div>55</div>
                  </div>
                  <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                    <div>Found</div>
                    <div>Saved</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                    alt="Contacted icon"
                    className="aspect-[1] object-contain w-[15px]"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Contacted</div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                    alt="Interviewed icon"
                    className="aspect-[1.07] object-contain w-4"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
                </div>
              </div>
              
              <div className="flex gap-[30px] flex-1">
                <div className="self-stretch">
                  <div className="flex gap-5 justify-between max-md:ml-2 max-md:mr-1">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                      alt="Found icon"
                      className="aspect-[1.12] object-contain w-[19px] shrink-0"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                      alt="Saved icon"
                      className="aspect-[0.94] object-contain w-4 shrink-0"
                    />
                  </div>
                  <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px] max-md:ml-2 max-md:mr-[3px]">
                    <div>55</div>
                    <div>55</div>
                  </div>
                  <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                    <div>Found</div>
                    <div>Saved</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                    alt="Contacted icon"
                    className="aspect-[1] object-contain w-[15px]"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Contacted</div>
                </div>
                <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                    alt="Interviewed icon"
                    className="aspect-[1.07] object-contain w-4"
                  />
                  <div className="text-base text-center mt-2">55</div>
                  <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex w-[275px] max-w-full items-stretch gap-[9px] text-[rgba(95,95,101,1)] mt-[27px]">
            <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
              <div>...</div>
            </button>
            <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
              <div>4 actions needed</div>
            </button>
          </div>
          
          <div className="self-center z-10 flex mt-[-35px] w-[275px] max-w-full items-stretch gap-[9px] text-[rgba(95,95,101,1)]">
            <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
              <div>...</div>
            </button>
            <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
              <div>4 actions needed</div>
            </button>
          </div>
          
          <div className="z-10 flex mt-[-35px] w-[275px] max-w-full items-stretch gap-[9px] text-[rgba(95,95,101,1)]">
            <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
              <div>...</div>
            </button>
            <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
              <div>4 actions needed</div>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col text-[rgba(40,42,48,1)] font-normal mt-[79px] px-[30px] max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="flex w-[273px] max-w-full flex-col items-stretch">
            <JobCard 
              {...jobData}
              layout="compact"
              onMenuClick={handleJobMenuClick}
              onActionClick={handleJobActionClick}
            />
          </div>
          
          <div className="self-center z-10 flex mt-[-132px] w-[273px] max-w-full flex-col items-stretch">
            <JobCard 
              {...jobData}
              layout="compact"
              onMenuClick={handleJobMenuClick}
              onActionClick={handleJobActionClick}
            />
          </div>
          
          <div className="z-10 flex mt-[-132px] w-[273px] max-w-full flex-col items-stretch">
            <JobCard 
              {...jobData}
              layout="compact"
              onMenuClick={handleJobMenuClick}
              onActionClick={handleJobActionClick}
            />
          </div>
        </div>
        
        <div className="self-center w-full max-w-[977px] mt-[30px] max-md:max-w-full">
          <div className="flex w-full items-stretch gap-[40px_83px] flex-wrap max-md:max-w-full max-md:mr-[9px]">
            <div className="flex items-stretch gap-[29px] flex-1">
              <div>
                <div className="w-full pl-2 pr-4">
                  <div className="flex gap-5 justify-between max-md:mr-0.5">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                      alt="Found icon"
                      className="aspect-[1.12] object-contain w-[19px] shrink-0"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                      alt="Saved icon"
                      className="aspect-[0.94] object-contain w-4 shrink-0"
                    />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                      alt="Contacted icon"
                      className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto"
                    />
                  </div>
                  <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px]">
                    <div>55</div>
                    <div>55</div>
                    <div>55</div>
                  </div>
                </div>
                <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                  <div>Found</div>
                  <div>Saved</div>
                  <div>Contacted</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                  alt="Interviewed icon"
                  className="aspect-[1.07] object-contain w-4"
                />
                <div className="text-base text-center mt-2">55</div>
                <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
              </div>
            </div>
            
            <div className="flex gap-[30px] flex-1">
              <div className="self-stretch">
                <div className="flex gap-5 justify-between max-md:ml-2 max-md:mr-1">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                    alt="Found icon"
                    className="aspect-[1.12] object-contain w-[19px] shrink-0"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                    alt="Saved icon"
                    className="aspect-[0.94] object-contain w-4 shrink-0"
                  />
                </div>
                <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px] max-md:ml-2 max-md:mr-[3px]">
                  <div>55</div>
                  <div>55</div>
                </div>
                <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                  <div>Found</div>
                  <div>Saved</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                  alt="Contacted icon"
                  className="aspect-[1] object-contain w-[15px]"
                />
                <div className="text-base text-center mt-2">55</div>
                <div className="text-xs self-stretch mt-[9px]">Contacted</div>
              </div>
              <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                  alt="Interviewed icon"
                  className="aspect-[1.07] object-contain w-4"
                />
                <div className="text-base text-center mt-2">55</div>
                <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
              </div>
            </div>
            
            <div className="flex gap-[30px] flex-1">
              <div className="self-stretch">
                <div className="flex gap-5 justify-between max-md:ml-2 max-md:mr-1">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/b80c5b38c6dafe0d40a4c41c440913dd4a87fd65?placeholderIfAbsent=true"
                    alt="Found icon"
                    className="aspect-[1.12] object-contain w-[19px] shrink-0"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/51f4cf7d6850af6ee8b991dd65877a6e16f58141?placeholderIfAbsent=true"
                    alt="Saved icon"
                    className="aspect-[0.94] object-contain w-4 shrink-0"
                  />
                </div>
                <div className="flex items-stretch gap-5 text-base text-[rgba(21,52,61,1)] font-normal whitespace-nowrap text-center justify-between mt-[7px] max-md:ml-2 max-md:mr-[3px]">
                  <div>55</div>
                  <div>55</div>
                </div>
                <div className="flex items-stretch gap-5 text-xs text-[rgba(21,52,61,1)] font-normal whitespace-nowrap justify-between mt-[9px]">
                  <div>Found</div>
                  <div>Saved</div>
                </div>
              </div>
              <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/8ebca7eb3107449bec51ce1d06064d125a476eab?placeholderIfAbsent=true"
                  alt="Contacted icon"
                  className="aspect-[1] object-contain w-[15px]"
                />
                <div className="text-base text-center mt-2">55</div>
                <div className="text-xs self-stretch mt-[9px]">Contacted</div>
              </div>
              <div className="flex flex-col items-center text-[rgba(21,52,61,1)] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/26b0429be67522c79554ca3123408ec80449c27e?placeholderIfAbsent=true"
                  alt="Interviewed icon"
                  className="aspect-[1.07] object-contain w-4"
                />
                <div className="text-base text-center mt-2">55</div>
                <div className="text-xs self-stretch mt-[9px]">Interviewed</div>
              </div>
            </div>
          </div>
          
          <div className="flex w-full items-stretch gap-[40px_74px] text-[rgba(95,95,101,1)] flex-wrap mt-[27px] max-md:max-w-full">
            <div className="flex items-stretch gap-[9px] flex-1">
              <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
                <div>...</div>
              </button>
              <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
                <div>4 actions needed</div>
              </button>
            </div>
            <div className="flex items-stretch gap-[9px] flex-1">
              <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
                <div>...</div>
              </button>
              <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
                <div>4 actions needed</div>
              </button>
            </div>
            <div className="flex items-stretch gap-[9px] flex-1">
              <button className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors">
                <div>...</div>
              </button>
              <button className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5">
                <div>4 actions needed</div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
