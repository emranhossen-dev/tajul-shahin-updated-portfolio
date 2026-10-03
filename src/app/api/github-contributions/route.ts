import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'emranhossen-dev';
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch GitHub contributions' }, { status: res.status });
    }

    const html = await res.text();
    
    // Parse contribution days robustly
    const cellRegex = /<td\s+[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    let match;
    const daysMap: Record<string, { date: string; level: number; count: number }> = {};
    
    while ((match = cellRegex.exec(html)) !== null) {
      const elementStr = match[0];
      const dateMatch = elementStr.match(/data-date="([^"]+)"/);
      const levelMatch = elementStr.match(/data-level="([^"]+)"/);
      const idMatch = elementStr.match(/id="([^"]+)"/);
      
      if (dateMatch && levelMatch && idMatch) {
        const id = idMatch[1];
        daysMap[id] = {
          date: dateMatch[1],
          level: parseInt(levelMatch[1], 10),
          count: 0
        };
      }
    }

    // Parse tooltips to get actual contribution counts
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
    let tooltipMatch;
    
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const id = tooltipMatch[1];
      const text = tooltipMatch[2].trim();
      if (daysMap[id]) {
        const countMatch = text.match(/^(\d+|No)\s+contribution/);
        if (countMatch) {
          const countStr = countMatch[1];
          daysMap[id].count = countStr === 'No' ? 0 : parseInt(countStr, 10);
        }
      }
    }

    // Fallback if tooltips didn't bind correctly: set count equal to level if count is 0 but level > 0
    const contributions = Object.values(daysMap).map(day => {
      if (day.level > 0 && day.count === 0) {
        day.count = day.level;
      }
      return day;
    });

    // Sort by date ascending
    contributions.sort((a, b) => a.date.localeCompare(b.date));

    // Calculate total contributions
    const total = contributions.reduce((sum, day) => sum + day.count, 0);

    return NextResponse.json({ total, contributions });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
