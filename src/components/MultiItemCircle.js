export const MultiItemCircle = ({ items, size = 150 }) => {
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {items.map((item, index) => {
        const angle = (item.value / totalValue) * 360;
        const endAngle = startAngle + angle;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
        const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
        const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
        const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

        const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        startAngle = endAngle;

        return <path key={index} d={pathData} fill={item.color} />;
      })}
      <circle cx="50" cy="50" r="35" fill="white" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fontWeight="bold"
      >
        {totalValue}%
      </text>
    </svg>
  );
};
