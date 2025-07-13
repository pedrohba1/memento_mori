import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const age = 29; // Replace with user input or state later
  const weeksPassed = age * 52;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-6 justify-center">
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="grid gap-[2px]"
              style={{
                gridTemplateRows: "repeat(52, 11px)", // 52 rows for 52 weeks per year
                gridTemplateColumns: "repeat(20, 11px)", // 20 years per group
              }}
            >
{Array.from({ length: 1040 }).map((_, i) => {
  const globalIndex = groupIndex * 1040 + i;
  const isPast = globalIndex < weeksPassed;
  return (
    <Link key={i} href={`/week/${globalIndex}`}>
      <div
                  className={`w-[10px] h-[10px] rounded-[1px] cursor-pointer ${
                    isPast
                      ? "bg-green-500 dark:bg-green-400"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              </Link>
            );
          })}

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
