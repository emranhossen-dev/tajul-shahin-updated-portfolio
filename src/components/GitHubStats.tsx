'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { GithubIcon } from './BrandIcons';

const GITHUB_USERNAME = 'emranhossen-dev';

// Electric Indigo & Cyan Glassmorphism contribution colors
const COLORS = {
  empty: 'rgba(255, 255, 255, 0.07)',
  level1: '#312e81',
  level2: '#4338ca',
  level3: '#6366f1',
  level4: '#38bdf8',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

interface DayData {
  date: string;
  count: number;
  level: number;
}

interface WeekData {
  days: DayData[];
}

interface ApiContribution {
  date: string;
  count: number;
  level: number;
}

function getColorForLevel(level: number): string {
  switch (level) {
    case 1: return COLORS.level1;
    case 2: return COLORS.level2;
    case 3: return COLORS.level3;
    case 4: return COLORS.level4;
    default: return COLORS.empty;
  }
}

function parseContributions(contributions: ApiContribution[]): { weeks: WeekData[]; total: number } {
  if (!contributions || contributions.length === 0) return { weeks: [], total: 0 };

  let total = 0;
  const weeks: WeekData[] = [];
  let currentWeek: DayData[] = [];

  const firstDate = new Date(contributions[0].date + 'T00:00:00');
  const firstDayOfWeek = firstDate.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ date: '', count: 0, level: 0 });
  }

  for (const day of contributions) {
    total += day.count;
    currentWeek.push({
      date: day.date,
      count: day.count,
      level: day.level,
    });

    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', count: 0, level: 0 });
    }
    weeks.push({ days: currentWeek });
  }

  return { weeks, total };
}

function getMonthLabels(weeks: WeekData[]): { month: string; col: number }[] {
  const labels: { month: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, colIndex) => {
    const firstDay = week.days.find(d => d.date !== '');
    if (firstDay) {
      const month = new Date(firstDay.date + 'T00:00:00').getMonth();
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], col: colIndex });
        lastMonth = month;
      }
    }
  });

  return labels;
}

export default function GitHubStats() {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/github-contributions');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      const contributions: ApiContribution[] = data.contributions || [];
      const { weeks: parsedWeeks, total } = parseContributions(contributions);

      setWeeks(parsedWeeks);
      setTotalContributions(total);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchContributions, 0);
    return () => clearTimeout(timer);
  }, [fetchContributions]);

  const monthLabels = weeks.length > 0 ? getMonthLabels(weeks) : [];

  const CELL_SIZE = 11;
  const CELL_GAP = 3;
  const LABEL_WIDTH = 34;
  const HEADER_HEIGHT = 20;
  const totalCols = weeks.length;
  const svgWidth = LABEL_WIDTH + totalCols * (CELL_SIZE + CELL_GAP);
  const svgHeight = HEADER_HEIGHT + 7 * (CELL_SIZE + CELL_GAP);

  return (
    <section id="github" className="py-14 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full glass-pill text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Open Source
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            My real-time contribution history — shipping code consistently.
          </p>
        </div>

        {/* GitHub Profile Link */}
        <div className="flex justify-center mb-8">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass-card transition-all duration-300 group"
          >
            <GithubIcon className="w-6 h-6 text-slate-200 group-hover:text-indigo-400 transition-colors" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">@{GITHUB_USERNAME}</p>
              <p className="text-[11px] text-slate-400">View Full Profile →</p>
            </div>
          </a>
        </div>

        {/* Contribution Graph — Full Width Glassmorphic Style */}
        <div className="w-full p-6 sm:p-8 rounded-2xl glass-card">

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              {loading ? 'Fetching contributions...' : error ? 'Could not load contributions' : `${totalContributions.toLocaleString()} contributions in the last year`}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Less</span>
              {[COLORS.empty, COLORS.level1, COLORS.level2, COLORS.level3, COLORS.level4].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm border border-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* SVG Graph — uses viewBox for full-width scaling */}
          {!loading && !error && weeks.length > 0 && (
            <div ref={containerRef} className="w-full relative" onMouseLeave={() => setTooltip(null)}>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto"
                preserveAspectRatio="xMinYMin meet"
              >
                {/* Month labels */}
                {monthLabels.map((label, i) => (
                  <text
                    key={i}
                    x={LABEL_WIDTH + label.col * (CELL_SIZE + CELL_GAP)}
                    y={12}
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    {label.month}
                  </text>
                ))}

                {/* Day labels */}
                {DAYS.map((day, i) => (
                  day && (
                    <text
                      key={i}
                      x={0}
                      y={HEADER_HEIGHT + i * (CELL_SIZE + CELL_GAP) + CELL_SIZE - 1}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {day}
                    </text>
                  )
                ))}

                {/* Contribution squares */}
                {weeks.map((week, colIndex) =>
                  week.days.map((day, rowIndex) => {
                    if (!day.date) return null;
                    const x = LABEL_WIDTH + colIndex * (CELL_SIZE + CELL_GAP);
                    const y = HEADER_HEIGHT + rowIndex * (CELL_SIZE + CELL_GAP);
                    return (
                      <rect
                        key={`${colIndex}-${rowIndex}`}
                        x={x}
                        y={y}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2.5}
                        ry={2.5}
                        fill={getColorForLevel(day.level)}
                        className="cursor-pointer transition-all duration-200 hover:opacity-80"
                        style={{ outline: 'none' }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = containerRef.current?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              text: day.count === 0
                                ? `No contributions on ${new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                : `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top - 8,
                            });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })
                )}
              </svg>

              {/* Glass Tooltip */}
              {tooltip && (
                <div
                  className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-xl glass-panel border border-white/25 text-[11px] text-white font-semibold whitespace-nowrap shadow-2xl backdrop-blur-xl"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  {tooltip.text}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white/30" />
                </div>
              )}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="w-full h-[120px] rounded-xl glass-pill animate-pulse flex items-center justify-center">
              <span className="text-xs text-slate-300 font-semibold">Fetching real-time activity from GitHub...</span>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="w-full h-[120px] rounded-xl glass-pill flex items-center justify-center">
              <span className="text-xs text-slate-300">Unable to load contribution data. <button onClick={fetchContributions} className="text-indigo-400 hover:underline cursor-pointer">Retry</button></span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
