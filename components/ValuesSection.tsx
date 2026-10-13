import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export function ValuesSection() {
  // Sync the 3 value images to public directory
  try {
    const brainDir =
      'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\d6957bc8-ff05-458e-aa67-4dfc9cea036f';
    const userUploadedDir = path.join(brainDir, '.user_uploaded');
    const destDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const valueMappings = [
      {
        src: path.join(userUploadedDir, 'media_1791880903553.jpg'),
        dest: path.join(destDir, 'value-integrity.jpg'),
      },
      {
        src: path.join(userUploadedDir, 'media_1791880910341.jpg'),
        dest: path.join(destDir, 'value-confidentiality.jpg'),
      },
      {
        src: path.join(userUploadedDir, 'media_1791880919030.jpg'),
        dest: path.join(destDir, 'value-timely.jpg'),
      },
    ];

    for (const item of valueMappings) {
      if (fs.existsSync(item.src) && !fs.existsSync(item.dest)) {
        fs.copyFileSync(item.src, item.dest);
      }
    }
  } catch {
    // Graceful fallback
  }

  const values = [
    {
      number: '01',
      title: 'Integrity',
      description:
        "Every opinion, certificate and return is issued on merit and in line with ICAI's Code of Ethics.",
      imageUrl: '/images/value-integrity.jpg',
    },
    {
      number: '02',
      title: 'Confidentiality',
      description:
        'Client records, ROI and GSTIN details are protected with the highest level of data security.',
      imageUrl: '/images/value-confidentiality.jpg',
    },
    {
      number: '03',
      title: 'Timely',
      description:
        'Filings are prepared ahead of statutory deadlines so you avoid late fees and penalties.',
      imageUrl: '/images/value-timely.jpg',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-18 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Gold line + Serif Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 sm:w-14 h-[3px] bg-[#F59E0B] mx-auto mb-3 sm:mb-3.5 rounded-full" />
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#071A3D] font-serif tracking-tight leading-tight">
            Integrity · Confidentiality · Timely
          </h2>
        </div>

        {/* 3 Value Cards with Photos, Wave Scoops, Numbers & Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {values.map((val) => (
            <div
              key={val.number}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(7,26,61,0.05)] hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Image Container with subtle wave scoop at bottom */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <Image
                  src={val.imageUrl}
                  alt={val.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gentle Wave Arc scooped into the bottom of the photo */}
                <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
                  <svg
                    viewBox="0 0 500 24"
                    preserveAspectRatio="none"
                    className="relative block w-full h-4 sm:h-5 text-white fill-current"
                  >
                    <path d="M0,24 Q250,2 500,24 L500,24 L0,24 Z" />
                  </svg>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-5 sm:px-6 pt-3 pb-6 sm:pb-7 flex flex-col flex-1">
                {/* Number + Gold Line + Title */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-200/90 tracking-tight font-sans select-none">
                    {val.number}
                  </span>
                  <span className="w-[1.5px] h-6 sm:h-7 bg-[#F59E0B] flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#071A3D] tracking-tight">
                    {val.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
