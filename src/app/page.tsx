'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getItem } from '@/lib/indexedDb';

export default function Home() {
  const dateOfBirth = new Date('1998-06-15');
  const now = new Date();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksPassed = Math.floor((now.getTime() - dateOfBirth.getTime()) / msPerWeek);

  const [writtenWeeks, setWrittenWeeks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchWrittenWeeks = async () => {
      const saved = await getItem('writtenWeeks');
      if (Array.isArray(saved)) {
        setWrittenWeeks(new Set(saved));
      }
    };
    fetchWrittenWeeks();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Top title */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Memento Mori</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
          Each square represents one week of your life. The four groups below represent
          approximately 20 years each, for a total of 80 years. You can click any square to open a
          page where you can write what happened during that week. The notes are saved directly in
          your browser.
        </p>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mt-5">
          Given your age, the squares are going to be colored green. Marking weeks of life that have
          passed. The orange squares represent weeks that you have reported on.
        </p>
      </header>

      {/* Main calendar */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-6 justify-center">
          {Array.from({ length: 4 }).map((_, groupIndex) => {
            const startYear = groupIndex * 20;
            const endYear = startYear + 20;

            return (
              <div key={groupIndex} className="flex flex-col items-center gap-2">
                {/* Label */}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {startYear}–{endYear}
                </span>

                {/* Grid of squares */}
                <div
                  className="grid gap-[2px] border rounded-md p-2"
                  style={{
                    gridTemplateRows: 'repeat(52, 11px)',
                    gridTemplateColumns: 'repeat(20, 11px)',
                  }}
                >
                  {Array.from({ length: 1040 }).map((_, i) => {
                    const globalIndex = groupIndex * 1040 + i;
                    const isPast = globalIndex < weeksPassed;
                    const isWritten = writtenWeeks.has(globalIndex);

                    const squareClass = isWritten
                      ? 'bg-orange-400 dark:bg-orange-500'
                      : isPast
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-gray-300 dark:bg-gray-700';

                    return (
                      <Link key={i} href={`/week/${globalIndex}`}>
                        <div
                          className={`w-[10px] h-[10px] rounded-[1px] cursor-pointer ${squareClass}`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Optional footer for spacing or credits */}
      <footer className="text-sm text-gray-500 dark:text-gray-600 text-center">
        Your life, one week at a time.
      </footer>
    </div>
  );
}
