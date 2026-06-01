import { useState } from "react";

export function DashboardChart() {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val1: number; val2: number; label: string } | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Custom Y coordinates mapped to viewBox height (Y axis from 100 to 1000)
  // viewBox height is 300 (from y=20 to y=280)
  // Formula: viewY = 280 - ((val - 100) / 900) * 260
  const purpleData = [120, 240, 260, 310, 410, 420, 510, 600, 620, 710, 770, 800];
  const greenData = [85, 130, 150, 180, 210, 220, 250, 290, 310, 330, 340, 350];

  const getCoordinates = (data: number[]) => {
    return data.map((val, index) => {
      const x = 50 + (index * (720 / 11));
      const y = 270 - ((val - 100) / 900) * 230;
      return { x, y, val };
    });
  };

  const pCoords = getCoordinates(purpleData);
  const gCoords = getCoordinates(greenData);

  // Helper to generate cubic bezier SVG path
  const bezierPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const pPath = bezierPath(pCoords);
  const gPath = bezierPath(gCoords);

  // Closed paths for area fill
  const pAreaPath = `${pPath} L ${pCoords[pCoords.length - 1].x} 270 L ${pCoords[0].x} 270 Z`;
  const gAreaPath = `${gPath} L ${gCoords[gCoords.length - 1].x} 270 L ${gCoords[0].x} 270 Z`;

  return (
    <div className="relative w-full h-[320px] font-sans">
      <svg viewBox="0 0 800 320" className="w-full h-full overflow-visible">
        <defs>
          {/* Gradients */}
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((val) => {
          const y = 270 - ((val - 100) / 900) * 230;
          return (
            <g key={val} className="opacity-15 dark:opacity-10">
              <line x1="50" y1={y} x2="770" y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <text x="15" y={y + 4} className="text-[10px] font-semibold fill-muted-foreground" textAnchor="middle">
                {val}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {months.map((m, index) => {
          const x = 50 + (index * (720 / 11));
          return (
            <text
              key={m}
              x={x}
              y="295"
              className="text-[11px] font-semibold fill-muted-foreground/80 dark:fill-muted-foreground/60"
              textAnchor="middle"
            >
              {m}
            </text>
          );
        })}

        {/* Area Fills */}
        <path d={pAreaPath} fill="url(#purpleGrad)" />
        <path d={gAreaPath} fill="url(#greenGrad)" />

        {/* Lines */}
        <path d={pPath} fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 2" />
        <path d={gPath} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 2" />

        {/* Interaction Lines & Circles */}
        {pCoords.map((pt, idx) => {
          const gPt = gCoords[idx];
          const isHovered = hoveredPoint?.label === months[idx];

          return (
            <g key={idx}>
              {/* Invisible interactive column */}
              <rect
                x={pt.x - 30}
                y="10"
                width="60"
                height="270"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredPoint({
                    x: pt.x,
                    y: (pt.y + gPt.y) / 2,
                    val1: pt.val,
                    val2: gPt.val,
                    label: months[idx],
                  });
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              />

              {/* Hover highlight line */}
              {isHovered && (
                <line x1={pt.x} y1="20" x2={pt.x} y2="270" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
              )}

              {/* Circles on paths */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 3.5}
                fill={isHovered ? "#8B5CF6" : "#ffffff"}
                stroke="#8B5CF6"
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-150 pointer-events-none"
              />
              <circle
                cx={gPt.x}
                cy={gPt.y}
                r={isHovered ? 6 : 3.5}
                fill={isHovered ? "#10B981" : "#ffffff"}
                stroke="#10B981"
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-150 pointer-events-none"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hoveredPoint && (
        <div
          className="absolute z-20 bg-card/95 border border-border text-foreground px-3 py-2 rounded-xl shadow-xl text-xs flex flex-col gap-1 backdrop-blur-md pointer-events-none transition-all duration-75"
          style={{
            left: `${(hoveredPoint.x / 800) * 100}%`,
            top: `${(hoveredPoint.y / 320) * 100 - 15}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="font-bold text-center border-b border-border pb-1 mb-1">{hoveredPoint.label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            <span className="font-medium">Nouveaux Clients :</span>
            <span className="font-bold text-violet-600 dark:text-violet-400">{hoveredPoint.val1}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-medium">Anciens Clients :</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{hoveredPoint.val2}</span>
          </div>
        </div>
      )}
    </div>
  );
}
