/**
 * Mastery ring component using Chart.js doughnut chart.
 */
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip);

/**
 * Get color based on mastery percentage.
 */
function getMasteryColor(percentage) {
  if (percentage === 100) return '#F59E0B'; // Amber (perfect)
  if (percentage >= 66) return '#10B981'; // Emerald
  if (percentage >= 33) return '#4F46E5'; // Indigo
  return '#94A3B8'; // Slate
}

/**
 * Single mastery ring component.
 * @param {Object} props - Component props
 * @param {string} props.topic - Topic name
 * @param {number} props.percentage - Mastery percentage (0-100)
 * @param {number} props.size - Ring size in pixels
 */
function MasteryRing({ topic, percentage = 0, size = 80 }) {
  const color = getMasteryColor(percentage);

  const data = useMemo(() => ({
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, 'rgba(255, 255, 255, 0.05)'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  }), [percentage, color]);

  const options = useMemo(() => ({
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      tooltip: { enabled: false },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
      easing: 'easeOutQuart',
    },
  }), []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <Doughnut data={data} options={options} width={size} height={size} />

        {/* Center percentage */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-white">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Topic label */}
      <span
        className="text-xs text-text-secondary text-center max-w-[80px] truncate"
        title={topic}
      >
        {topic}
      </span>
    </div>
  );
}

/**
 * Mastery rings grid component.
 * @param {Object} props - Component props
 * @param {Array} props.masteryList - Array of mastery records
 */
function MasteryRings({ masteryList = [] }) {
  if (masteryList.length === 0) {
    return (
      <div className="text-center py-6 text-text-secondary text-sm">
        <p>Study a topic and take its quiz</p>
        <p className="mt-1">to track your mastery!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {masteryList.slice(0, 6).map((record) => (
        <MasteryRing
          key={record.topic}
          topic={record.topic}
          percentage={record.percentage}
        />
      ))}
    </div>
  );
}

export { MasteryRing, MasteryRings };
export default MasteryRing;
